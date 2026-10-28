
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search,
  Play,
  Plus,
  Check,
  ChevronRight,
  Film,
  User,
  X,
  LockKeyhole,
  Mail,
  ArrowRight
} from 'lucide-react';
import './styles.css';
import { supabase } from './supabase';

const SUPPORT_EMAIL = 'support@aiflixmovies.com';

const FALLBACK_FILMS = [
  {
    id: 'night-flag',
    title: 'The Night The Flag Changed',
    year: 2026,
    runtime: '22 min',
    genre: 'Historical Thriller',
    country: 'Pakistan',
    creator: 'Kainat Ali',
    description:
      'A historical thriller exploring a pivotal night through AI-assisted cinema.',
    poster:
      'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/posters/683501478_1786619703436515.jpg',
    videoUrl: 'https://www.youtube.com/embed/oh3EBozQ19M'
  }
];

function App() {
  const [films, setFilms] = useState(FALLBACK_FILMS);
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [activePage, setActivePage] = useState('home');

  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [loadingFilms, setLoadingFilms] = useState(true);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [hasFilmAccess, setHasFilmAccess] = useState(false);
const [checkingFilmAccess, setCheckingFilmAccess] = useState(false);

  // ACCESS REQUEST FORM
  const [accessName, setAccessName] = useState('');
  const [accessEmail, setAccessEmail] = useState('');
  const [accessFilm, setAccessFilm] = useState(
    'The Night The Flag Changed'
  );
  const [accessError, setAccessError] = useState('');

  // AUTHENTICATION
  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      const {
        data: { user: currentUser },
        error
      } = await supabase.auth.getUser();

      if (mounted && !error) setUser(currentUser);
    };

    getUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user || null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // LOAD FILMS
  useEffect(() => {
    let mounted = true;

    const loadMovies = async () => {
      try {
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .order('year', { ascending: false });

        if (error) {
          console.error('Could not load movies:', error.message);
          return;
        }

        if (!mounted) return;

        if (!data || data.length === 0) {
          setFilms(FALLBACK_FILMS);
          return;
        }

        const databaseFilms = data.map((movie) => {
  const existingFilm = FALLBACK_FILMS.find(
    (film) => film.title === movie.title
  );

  const videoUrl =
    movie.title?.trim() === 'The Night The Flag Changed'
      ? 'https://www.youtube.com/embed/oh3EBozQ19M'
      : movie.video_url || existingFilm?.videoUrl || '';

  return {
    id: movie.id,
    title: movie.title || 'Untitled Film',
    year: movie.year || 2026,
    runtime: movie.duration || '',
    genre: movie.genre || 'Original Cinema',
    country: existingFilm?.country || 'International',
    creator: movie.director || 'Kainat Ali',
    description:
      movie.description || 'An original film from AI Flix.',
    poster:
      movie.poster_url?.trim() || existingFilm?.poster || '',
    videoUrl
  };
});
    
        setFilms(databaseFilms);
      } catch (error) {
        console.error('Unexpected movie loading error:', error);
      } finally {
        if (mounted) setLoadingFilms(false);
      }
    };

    loadMovies();

    return () => {
      mounted = false;
    };
  }, []);

  // LOAD WATCHLIST
  useEffect(() => {
    let mounted = true;

    const loadWatchlist = async () => {
      if (!user) {
        setWatchlist([]);
        return;
      }

      setWatchlistLoading(true);

      try {
        const { data, error } = await supabase
          .from('watchlist')
          .select('movie_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Could not load My List:', error.message);
          return;
        }

        if (mounted) {
          setWatchlist(
            (data || []).map((item) => String(item.movie_id))
          );
        }
      } finally {
        if (mounted) setWatchlistLoading(false);
      }
    };

    loadWatchlist();

    return () => {
      mounted = false;
    };
  }, [user]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return films;

    return films.filter((film) =>
      [film.title, film.genre, film.country, film.creator].some(
        (value) => value && value.toLowerCase().includes(q)
      )
    );
  }, [query, films]);

  const heroFilm = films[0] || null;

  const clearAuthMessages = () => {
    setAuthError('');
    setAuthMessage('');
  };

  // REQUEST ACCESS: OPENS THE CUSTOMER'S EMAIL APP
  

const requestAccess = async (event) => {
  event.preventDefault();
  setAccessError('');

  if (!user) {
    setAccessError('Please sign in or create an account before requesting access.');
    setAuthMode('login');
    return;
  }

  if (!accessName.trim() || !accessEmail.trim()) {
    setAccessError('Please enter your name and email address.');
    return;
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    accessEmail.trim()
  );

  if (!validEmail) {
    setAccessError('Please enter a valid email address.');
    return;
  }

  const { data: existing, error: lookupError } = await supabase
    .from('access_requests')
    .select('id, status')
    .eq('user_id', user.id)
    .eq('film_slug', 'night-flag')
    .eq('status', 'pending')
    .limit(1);

  if (lookupError) {
    setAccessError('Could not check your existing request. Please try again.');
    return;
  }

  if (existing && existing.length > 0) {
    setAccessError('You already have a pending request for this film.');
    return;
  }

  const { data: request, error } = await supabase
    .from('access_requests')
    .insert({
      user_id: user.id,
      film_slug: 'night-flag',
      customer_name: accessName.trim(),
      customer_email: accessEmail.trim(),
      amount: 4.99,
      currency: 'USD'
    })
    .select('id')
    .single();

  if (error) {
    setAccessError('Your request could not be saved: ' + error.message);
    return;
  }

  const subject = `AI Flix payment request - ${request.id}`;
  const body = [
    'Hello AI Flix Support,',
    '',
    'A customer has requested access to a film.',
    '',
    `Request ID: ${request.id}`,
    `Customer: ${accessName.trim()}`,
    `Customer email: ${accessEmail.trim()}`,
    `Account user ID: ${user.id}`,
    `Film: ${accessFilm}`,
    'Price: $4.99 USD',
    'Status: Pending payment',
    '',
    'Please send the customer an individual Veem payment request.',
    '',
    'Thank you.'
  ].join('\n');

  const mailto =
    `mailto:${SUPPORT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
};

  // WATCHLIST
  const toggleWatchlist = async (id) => {
    if (!user) {
      clearAuthMessages();
      setAuthError('Please sign in to use My List.');
      setAuthMode('login');
      return;
    }

    const movieId = String(id);
    const alreadySaved = watchlist.includes(movieId);

    if (alreadySaved) {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movieId);

      if (error) {
        alert('Could not remove film: ' + error.message);
        return;
      }

      setWatchlist((current) =>
        current.filter((item) => item !== movieId)
      );
    } else {
      const { error } = await supabase.from('watchlist').insert({
        user_id: user.id,
        movie_id: movieId
      });

      if (error) {
        alert('Could not save film: ' + error.message);
        return;
      }

      setWatchlist((current) => [...current, movieId]);
    }
  };

  // FILM MODAL

const openFilm = (film) => {
  setSelected(film);
  setPlaying(false);
  setHasFilmAccess(false);
  setCheckingFilmAccess(false);
};

const playSelectedFilm = async () => {
  if (!selected) return;

  // Other films are not changed by this Night Flag check.
  if (selected.title !== 'The Night The Flag Changed') {
    setPlaying(true);
    return;
  }

  if (!user) {
    setPlaying(false);
    clearAuthMessages();
    setAuthError('Please sign in and request access to watch this film.');
    setAuthMode('login');
    return;
  }

  setCheckingFilmAccess(true);
  setPlaying(false);
  setHasFilmAccess(false);

  try {
    const { data, error } = await supabase
      .from('film_access')
      .select('film_slug')
      .eq('user_id', user.id)
      .eq('film_slug', 'night-flag')
      .maybeSingle();

    if (error) {
      console.error('Access check failed:', error.message);
      setAccessError('Unable to verify access. Please try again.');
      return;
    }

    if (!data) {
      setAccessError('Access has not been approved for your account. Please request access for $4.99.');
      return;
    }

    setHasFilmAccess(true);
    setPlaying(true);
    setAccessError('');
  } finally {
    setCheckingFilmAccess(false);
  }
};

  const closeFilm = () => {
    setSelected(null);
    setPlaying(false);
  };

  // LOGIN
  const signIn = async () => {
    clearAuthMessages();

    if (!email.trim() || !password) {
      setAuthError('Please enter your email and password.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    setAuthMode(null);
    setEmail('');
    setPassword('');
  };

  // CREATE ACCOUNT
  const signUp = async () => {
    clearAuthMessages();

    if (!fullName.trim() || !email.trim() || !password) {
      setAuthError('Please complete all fields.');
      return;
    }

    if (password.length < 6) {
      setAuthError('Your password must contain at least 6 characters.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() }
      }
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (data.session) {
      setAuthMode(null);
      setEmail('');
      setPassword('');
      setFullName('');
    } else {
      setAuthMessage(
        'Account created. Please check your email to confirm your account before signing in.'
      );
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError(error.message);
      return;
    }

    setAuthMode(null);
    setActivePage('home');
  };

  const openAccount = () => {
    clearAuthMessages();
    setAuthMode(user ? 'account' : 'login');
  };

  const changePage = (page) => {
    setActivePage(page);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* NAVIGATION */}
      <header className="nav">
        <div
          className="brand"
          onClick={() => changePage('home')}
          style={{ cursor: 'pointer' }}
        >
          AI<span>FLIX</span>
        </div>

        <nav>
          <button onClick={() => changePage('home')}>Home</button>
          <button onClick={() => changePage('browse')}>Browse</button>
          <button onClick={() => changePage('mylist')}>My List</button>
          <button onClick={() => changePage('categories')}>
            Categories
          </button>
          <button onClick={() => changePage('unlock')}>
            Unlock
          </button>
        </nav>

        <div className="navRight">
          <div className="search">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActivePage('browse');
              }}
              placeholder="Search films..."
              aria-label="Search films"
            />
          </div>

          <button
            className="iconBtn"
            onClick={openAccount}
            aria-label="Your account"
          >
            <User size={19} />
          </button>
        </div>
      </header>

      <main>
        {/* UNLOCK AI FLIX */}
        {activePage === 'unlock' && (
          <section className="section">
            <div
              style={{
                maxWidth: '720px',
                margin: '25px auto',
                padding: '32px 22px',
                border: '1px solid #333',
                borderRadius: '16px',
                background: '#111',
                textAlign: 'center'
              }}
            >
              <LockKeyhole
                size={38}
                style={{ margin: '0 auto 16px', color: '#e50914' }}
              />

              <div className="eyebrow">INDEPENDENT CINEMA</div>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
                Unlock AI Flix
              </h1>

              <p style={{ color: '#bbb', lineHeight: 1.8 }}>
                Experience original films by independent filmmaker
                Kainat Ali.
              </p>

              <div
                style={{
                  fontSize: '42px',
                  fontWeight: 800,
                  margin: '22px 0 8px'
                }}
              >
                $4.99 <span style={{ fontSize: '16px' }}>USD</span>
              </div>

              <p style={{ color: '#aaa', fontSize: '14px' }}>
                Request access to a film. We will send you payment
                instructions individually.
              </p>

              <form
                onSubmit={requestAccess}
                style={{
                  display: 'grid',
                  gap: '14px',
                  textAlign: 'left',
                  marginTop: '26px'
                }}
              >
                <label htmlFor="access-name">Full name</label>
                <input
                  id="access-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={accessName}
                  onChange={(event) => setAccessName(event.target.value)}
                  required
                  style={fieldStyle}
                />

                <label htmlFor="access-email">Email address</label>
                <input
                  id="access-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={accessEmail}
                  onChange={(event) => setAccessEmail(event.target.value)}
                  required
                  style={fieldStyle}
                />

                <label htmlFor="access-film">Choose a film</label>
                <select
                  id="access-film"
                  value={accessFilm}
                  onChange={(event) => setAccessFilm(event.target.value)}
                  style={fieldStyle}
                >
                  {films.map((film) => (
                    <option key={film.id} value={film.title}>
                      {film.title}
                    </option>
                  ))}
                </select>

                {accessError && (
                  <p className="authError">{accessError}</p>
                )}

                <button
                  type="submit"
                  className="primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '8px'
                  }}
                >
                  <Mail size={18} />
                  Request Payment Instructions
                  <ArrowRight size={18} />
                </button>
              </form>

              <p
                style={{
                  color: '#888',
                  fontSize: '12px',
                  lineHeight: 1.7,
                  marginTop: '20px'
                }}
              >
                This opens your email app with a prepared request.
                Your request is not submitted until you send that email.
                We will send an individual payment request and confirm
                payment before granting access.
              </p>
            </div>
          </section>
        )}

        {/* MY LIST */}
        {activePage === 'mylist' ? (
          <section className="section myListPage">
            <div className="sectionHead"><h2>My List</h2></div>

            {!user ? (
              <div className="emptyState">
                <h2>Sign in to view My List</h2>
                <p>Sign in to save your favourite original films.</p>
                <button
                  className="primary"
                  onClick={() => {
                    clearAuthMessages();
                    setAuthMode('login');
                  }}
                >
                  Sign In
                </button>
              </div>
            ) : watchlistLoading ? (
              <div className="emptyState"><p>Loading your list...</p></div>
            ) : films.filter((film) =>
                watchlist.includes(String(film.id))
              ).length === 0 ? (
              <div className="emptyState">
                <h2>Your list is empty</h2>
                <p>Films you save will appear here.</p>
                <button
                  className="primary"
                  onClick={() => changePage('browse')}
                >
                  Browse Films
                </button>
              </div>
            ) : (
              <div className="grid">
                {films.filter((film) =>
                  watchlist.includes(String(film.id))
                ).map((film) => (
                  <article
                    className="card"
                    key={film.id}
                    onClick={() => openFilm(film)}
                  >
                    <img src={film.poster} alt={film.title} />
                    <div className="cardOverlay">
                      <span>{film.runtime}</span>
                      <span>{film.genre}</span>
                    </div>
                    <div className="cardBody">
                      <h3>{film.title}</h3>
                      <p>{film.country} • {film.year}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : activePage === 'categories' ? (
          <section className="section">
            <div className="sectionHead"><h2>Explore Categories</h2></div>
            <div className="chips">
              {[...new Set(films.map((film) => film.genre).filter(Boolean))]
                .map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setQuery(category);
                      setActivePage('browse');
                    }}
                  >
                    {category}
                  </button>
                ))}
            </div>
          </section>
        ) : activePage !== 'unlock' ? (
          <>
            {/* HOME HERO */}
            {activePage === 'home' && heroFilm && (
              <section
                className="hero"
                style={{
                  backgroundImage: `linear-gradient(
                    90deg,
                    rgba(5,5,8,.82) 0%,
                    rgba(5,5,8,.48) 48%,
                    rgba(5,5,8,.12) 100%
                  ), url("${heroFilm.poster}")`
                }}
              >
                <div className="heroCopy">
                  <div className="eyebrow">
                    AI FLIX ORIGINAL • {heroFilm.year}
                  </div>
                  <h1>{heroFilm.title}</h1>
                  <p className="meta">
                    {heroFilm.year} • {heroFilm.runtime} • {heroFilm.genre}
                  </p>
                  <p className="description">{heroFilm.description}</p>
                  <div className="actions">
                    <button className="primary" onClick={() => openFilm(heroFilm)}>
                      <Play size={18} fill="currentColor" />
                      View Film
                    </button>
                    <button
                      className="secondary"
                      onClick={() => toggleWatchlist(heroFilm.id)}
                    >
                      {watchlist.includes(String(heroFilm.id))
                        ? <Check size={18} />
                        : <Plus size={18} />}
                      {watchlist.includes(String(heroFilm.id))
                        ? 'In My List'
                        : 'My List'}
                    </button>
                    <button
                      className="primary"
                      onClick={() => changePage('unlock')}
                    >
                      <LockKeyhole size={17} />
                      Unlock for $4.99
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* FILM CATALOGUE */}
            <section className="section">
              <div className="sectionHead">
                <h2>
                  {query
                    ? 'Search Results'
                    : activePage === 'browse'
                      ? 'Browse Our Films'
                      : films.length === 1
                        ? 'Now Streaming'
                        : 'AI Flix Originals'}
                </h2>
                <ChevronRight size={20} />
              </div>

              {loadingFilms ? (
                <div className="emptyState"><p>Loading films...</p></div>
              ) : filtered.length === 0 ? (
                <div className="emptyState">
                  <h2>No films found</h2>
                  <p>Try another search or check back for future releases.</p>
                  {query && (
                    <button className="secondary" onClick={() => setQuery('')}>
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid">
                  {filtered.map((film) => (
                    <article
                      className="card"
                      key={film.id}
                      onClick={() => openFilm(film)}
                    >
                      <img src={film.poster} alt={film.title} />
                      <div className="cardOverlay">
                        <span>{film.runtime}</span>
                        <span>{film.genre}</span>
                      </div>
                      <div className="cardBody">
                        <h3>{film.title}</h3>
                        <p>{film.country} • {film.year}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {!query && activePage === 'home' && (
              <>
                <section className="section">
                  <div className="sectionHead">
                    <h2>More Original Films Coming Soon</h2>
                  </div>
                  <p style={{ color: '#aaa', maxWidth: '650px', fontSize: '14px', lineHeight: '1.9' }}>
                    Discover original stories and independent cinema
                    created by Kainat Ali. New films will join the AI Flix
                    catalogue as they are released.
                  </p>
                </section>

                <section className="section">
                  <div className="sectionHead"><h2>Explore AI Cinema</h2></div>
                  <div className="chips">
                    {[...new Set(films.map((film) => film.genre).filter(Boolean))]
                      .map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setQuery(category);
                            setActivePage('browse');
                          }}
                        >
                          {category}
                        </button>
                      ))}
                  </div>
                </section>

                <section className="section">
                  <div
                    style={{
                      padding: '28px 22px',
                      border: '1px solid #333',
                      borderRadius: '14px',
                      background: '#111',
                      textAlign: 'center'
                    }}
                  >
                    <h2>Discover Independent Cinema</h2>
                    <p style={{ color: '#aaa', lineHeight: 1.8 }}>
                      Get access to original films from AI Flix for $4.99 USD.
                    </p>
                    <button
                      className="primary"
                      onClick={() => changePage('unlock')}
                    >
                      Unlock AI Flix <ArrowRight size={18} />
                    </button>
                  </div>
                </section>
              </>
            )}
          </>
        ) : null}
      </main>

      {/* FOOTER */}
      <footer>
        <div
          className="brand"
          onClick={() => changePage('home')}
          style={{ cursor: 'pointer' }}
        >
          AI<span>FLIX</span>
        </div>
        <p>© 2026 AI Flix. Original films. Independent cinema.</p>
        <p>
          Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
        <button className="secondary" onClick={() => changePage('unlock')}>
          Unlock AI Flix — $4.99
        </button>
      </footer>

      {/* AUTH MODAL */}
      {authMode && (
        <div className="modal" onClick={() => setAuthMode(null)}>
          <div
            className="modalCard authCard"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setAuthMode(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {authMode === 'login' && (
              <div className="modalContent">
                <div className="eyebrow">WELCOME BACK</div>
                <h2>Sign in to AI Flix</h2>
                <p>Continue exploring original cinema.</p>
                {authError && <p className="authError">{authError}</p>}
                {authMessage && <p className="authMessage">{authMessage}</p>}
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') signIn();
                  }}
                />
                <button className="primary" onClick={signIn}>Sign In</button>
                <button
                  className="secondary"
                  onClick={() => {
                    clearAuthMessages();
                    setAuthMode('signup');
                  }}
                >
                  Create an Account
                </button>
              </div>
            )}

            {authMode === 'signup' && (
              <div className="modalContent">
                <div className="eyebrow">JOIN AI FLIX</div>
                <h2>Create Your Account</h2>
                <p>Join us for original cinematic storytelling.</p>
                {authError && <p className="authError">{authError}</p>}
                {authMessage && <p className="authMessage">{authMessage}</p>}
                <input
                  type="text"
                  placeholder="Full name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password (at least 6 characters)"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button className="primary" onClick={signUp}>Create Account</button>
                <button
                  className="secondary"
                  onClick={() => {
                    clearAuthMessages();
                    setAuthMode('login');
                  }}
                >
                  Already have an account? Sign In
                </button>
              </div>
            )}

            {authMode === 'account' && user && (
              <div className="modalContent">
                <div className="eyebrow">YOUR ACCOUNT</div>
                <h2>{user.user_metadata?.full_name || 'AI Flix Member'}</h2>
                <p>{user.email}</p>
                {authError && <p className="authError">{authError}</p>}
                <button className="primary" onClick={signOut}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FILM DETAILS AND PLAYER */}
      {selected && (
        <div className="modal" onClick={closeFilm}>
          <div
            className={`modalCard ${playing ? 'playingCard' : ''}`}
            onClick={(event) => event.stopPropagation()}
          >
            {playing && !selected.requiresAccess ? (
              <div className="videoWrapper">
                {selected.videoUrl ? (
  <iframe
  src="https://www.youtube.com/embed/oh3EBozQ19M"
  title="The Night The Flag Changed"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  style={{
    width: '100%',
    aspectRatio: '16 / 9',
    display: 'block',
    border: 0,
    background: '#000'
  }}
/>
) : (
                  <div className="emptyState">
                    <h3>Film not available</h3>
                    <p>This film does not have a video file yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <img src={selected.poster} alt={selected.title} />
            )}

            <div className="modalContent">
              <button className="close" onClick={closeFilm} aria-label="Close film">
                <X size={20} />
              </button>
              <div className="eyebrow">{selected.country} • {selected.year}</div>
              <h2>{selected.title}</h2>
              <p className="meta">{selected.runtime} • {selected.genre}</p>
              <p>{selected.description}</p>
              <p className="creator">
                <Film size={16} /> Created by {selected.creator}
              </p>

              <div className="actions">
                
{selected.title === 'The Night The Flag Changed' ? (
  <button
    className="primary"
    onClick={playSelectedFilm}
    disabled={checkingFilmAccess}
  >
    <Play size={18} fill="currentColor" />
    {checkingFilmAccess ? 'Checking access...' : 'Play Film'}
  </button>
) : (
  <button
    className="primary"
    onClick={playSelectedFilm}
  >
    <Play size={18} fill="currentColor" />
    Play Film
  </button>
)}

<button
  className="secondary"
  onClick={() => changePage('unlock')}
>
  <LockKeyhole size={18} />
  Request Access — $4.99
</button>
                <button
                  className="secondary"
                  onClick={() => toggleWatchlist(selected.id)}
                >
                  {watchlist.includes(String(selected.id))
                    ? <Check size={18} />
                    : <Plus size={18} />}
                  {watchlist.includes(String(selected.id))
                    ? 'In My List'
                    : 'My List'}
                </button>
              </div>

              <p className="notice">
                Request access to receive payment instructions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const fieldStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 14px',
  borderRadius: '8px',
  border: '1px solid #444',
  background: '#1c1c1c',
  color: '#fff',
  fontSize: '15px'
};

createRoot(document.getElementById('root')).render(<App />);
