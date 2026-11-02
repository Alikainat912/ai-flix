
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
  X
} from 'lucide-react';
import './styles.css';
import { supabase } from './supabase';

// --------------------------------------------------
// FILMS
// --------------------------------------------------

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
  },
  {
    id: 'nothing-left-to-lose',
    title: 'Nothing Left to Lose',
    year: 2026,
    runtime: '5 min 46 sec',
    genre: 'Drama',
    country: 'Pakistan',
    creator: 'Kainat Ali',
    description:
      'Nothing Left to Lose — an AI-assisted short film by independent filmmaker Kainat Ali.',
    poster:
      'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/posters/867052322_1788628477263587.jpg',
    videoUrl: 'https://www.youtube.com/embed/zG9y4fBlcLw'
  },
  {
    id: 'unspoken-terminus',
    title: 'The Unspoken Terminus',
    year: 2026,
    runtime: '4 min 10 sec',
    genre: 'Experimental Sci-Fi',
    country: 'Pakistan',
    creator: 'Kainat Ali',
    description:
      'A science-fiction meditation on language, mystery, human connection and the boundaries of understanding.',
    poster:
      'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/posters/21257650_1788675699651661.jpg',
    videoUrl: 'https://www.youtube.com/embed/95PDubDKBhI'
  }
];

// --------------------------------------------------
// SERIES
// --------------------------------------------------

const FALLBACK_SERIES = [
  {
    id: 'the-other-woman',
    title: 'The Other Woman',
    year: 2026,
    genre: 'Psychological Thriller',
    language: 'English',
    creator: 'Kainat Ali',
    description:
      'A perfect marriage. An impossible message. A secret that refuses to stay buried.',
    runtime: '24 min',
    poster: 'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/posters/Screenshot_20261101_112024_Flow.jpg',
    episodes: [
      {
        id: 'tow-ep1',
        number: 1,
        title: 'The First Message',
        runtime: '5 min',
        videoUrl: 'https://www.youtube.com/embed/gnG1yl_y6wk',
        status: 'available'
      },
{
  id: 'tow-ep2',
  number: 2,
  title: 'Someone Knows',
  runtime: '5 min',
  videoUrl: 'https://www.youtube.com/embed/_jK9XKsgwWw',
  status: 'available'
},
},
      {
        id: 'tow-ep3',
        number: 3,
        title: 'The Photograph',
        runtime: '5 min',
        videoUrl: '',
        status: 'upcoming'
      },
      {
        id: 'tow-ep4',
        number: 4,
        title: "Don't Trust Him",
        runtime: '5 min',
        videoUrl: '',
        status: 'upcoming'
      },
      {
        id: 'tow-ep5',
        number: 5,
        title: 'The Other Woman',
        runtime: '4 min',
        videoUrl: '',
        status: 'upcoming'
      }
    ]
  }
];

// --------------------------------------------------
// APP
// --------------------------------------------------

function App() {
  const [films, setFilms] = useState(FALLBACK_FILMS);
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [activePage, setActivePage] = useState('home');

  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const [loadingFilms, setLoadingFilms] = useState(true);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  // ------------------------------------------------
  // AUTHENTICATION
  // ------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      const {
        data: { user: currentUser },
        error
      } = await supabase.auth.getUser();

      if (mounted && !error) {
        setUser(currentUser);
      }
    };

    getUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user || null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ------------------------------------------------
  // LOAD FILMS FROM SUPABASE
  // ------------------------------------------------

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
          if (mounted) setFilms(FALLBACK_FILMS);
          return;
        }

        if (!mounted) return;

        const databaseFilms = (data || []).map((movie) => {
          const existingFilm = FALLBACK_FILMS.find(
            (film) =>
              film.title.trim().toLowerCase() ===
              movie.title?.trim().toLowerCase()
          );

          return {
            id: existingFilm?.id || movie.id,
            title: movie.title || 'Untitled Film',
            year: movie.year || 2026,
            runtime: movie.duration || existingFilm?.runtime || '',
            genre: movie.genre || existingFilm?.genre || 'Original Cinema',
            country: existingFilm?.country || 'International',
            creator: movie.director || existingFilm?.creator || 'Kainat Ali',
            description:
              movie.description ||
              existingFilm?.description ||
              'An original film from AI Flix.',
            poster:
              movie.poster_url?.trim() ||
              existingFilm?.poster ||
              '',
            videoUrl:
              existingFilm?.videoUrl ||
              movie.video_url ||
              ''
          };
        });

        const mergedFilms = [...databaseFilms];

        FALLBACK_FILMS.forEach((fallbackFilm) => {
          const exists = mergedFilms.some(
            (film) =>
              film.title.trim().toLowerCase() ===
              fallbackFilm.title.trim().toLowerCase()
          );

          if (!exists) {
            mergedFilms.push(fallbackFilm);
          }
        });

        setFilms(mergedFilms);
      } catch (error) {
        console.error('Unexpected movie loading error:', error);
        if (mounted) setFilms(FALLBACK_FILMS);
      } finally {
        if (mounted) setLoadingFilms(false);
      }
    };

    loadMovies();

    return () => {
      mounted = false;
    };
  }, []);

  // ------------------------------------------------
  // LOAD WATCHLIST
  // ------------------------------------------------

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
        if (mounted) {
          setWatchlistLoading(false);
        }
      }
    };

    loadWatchlist();

    return () => {
      mounted = false;
    };
  }, [user]);

  // ------------------------------------------------
  // SEARCH
  // ------------------------------------------------

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

  // ------------------------------------------------
  // HELPERS
  // ------------------------------------------------

  const clearAuthMessages = () => {
    setAuthError('');
    setAuthMessage('');
  };

  const changePage = (page) => {
    setActivePage(page);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAccount = () => {
    clearAuthMessages();
    setAuthMode(user ? 'account' : 'login');
  };

  // ------------------------------------------------
  // WATCHLIST
  // ------------------------------------------------

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
      const { error } = await supabase
        .from('watchlist')
        .insert({
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

  // ------------------------------------------------
  // FILM PLAYER
  // ------------------------------------------------

  const openFilm = (film) => {
    setSelected(film);
    setPlaying(false);
  };

  const closeFilm = () => {
    setSelected(null);
    setPlaying(false);
  };

  const playSelectedFilm = () => {
    setPlaying(true);
  };

  // ------------------------------------------------
  // SIGN IN
  // ------------------------------------------------

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

  // ------------------------------------------------
  // SIGN UP
  // ------------------------------------------------

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

  // ------------------------------------------------
  // SIGN OUT
  // ------------------------------------------------

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError(error.message);
      return;
    }

    setAuthMode(null);
    setActivePage('home');
  };

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

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
          <button onClick={() => changePage('browse')}>Movies</button>
          <button onClick={() => changePage('series')}>Series</button>
          <button onClick={() => changePage('mylist')}>My List</button>
          <button onClick={() => changePage('categories')}>
            Categories
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

      {/* MAIN CONTENT */}

      <main>

        {/* SERIES DETAIL PAGE */}

        {activePage === 'series-detail' && selectedSeries ? (
          <section className="section">
            <button
              className="secondary"
              onClick={() => changePage('series')}
            >
              ← Back to Series
            </button>

            <div style={{ padding: '30px 0', maxWidth: '750px' }}>
              <div className="eyebrow">
                AI FLIX ORIGINAL SERIES • {selectedSeries.year}
              </div>

              <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)' }}>
                {selectedSeries.title}
              </h1>

              <p className="meta">
                {selectedSeries.genre} • {selectedSeries.language} •{' '}
                {selectedSeries.episodes.length} Episodes
              </p>

              <p className="description">
                {selectedSeries.description}
              </p>

              <p className="creator">
                Created by {selectedSeries.creator}
              </p>
            </div>

            <div className="sectionHead">
              <h2>Episodes</h2>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {selectedSeries.episodes.map((episode) => (
                <article
                  key={episode.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '16px',
                    background: '#15171e',
                    border: '1px solid #292b33',
                    borderRadius: '12px'
                  }}
                >
                  <div
                    style={{
                      minWidth: '45px',
                      height: '45px',
                      display: 'grid',
                      placeItems: 'center',
                      background: '#292b33',
                      borderRadius: '8px',
                      fontWeight: 800
                    }}
                  >
                    {String(episode.number).padStart(2, '0')}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 6px' }}>
                      {episode.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: '#999',
                        fontSize: '13px'
                      }}
                    >
                      Episode {episode.number} • {episode.runtime}
                    </p>
                  </div>

                  {episode.status === 'available' && episode.videoUrl ? (
                    <button
                      className="primary"
                      onClick={() => setSelectedEpisode(episode)}
                    >
                      <Play size={16} fill="currentColor" />
                      Watch
                    </button>
                  ) : (
                    <span style={{ color: '#aaa', fontSize: '12px' }}>
                      Coming Soon
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>

        ) : activePage === 'series' ? (

          /* SERIES CATALOGUE */

          <section className="section">
            <div className="sectionHead">
              <h2>AI Flix Original Series</h2>
            </div>

            <div className="grid">
              {FALLBACK_SERIES.map((series) => (
                <article
                  className="card"
                  key={series.id}
                  onClick={() => {
                    setSelectedSeries(series);
                    changePage('series-detail');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {series.poster ? (
                    <img src={series.poster} alt={series.title} />
                  ) : (
                    <div
                      style={{
                        aspectRatio: '2 / 3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '20px',
                        boxSizing: 'border-box',
                        background:
                          'linear-gradient(145deg, #29202b, #09090d)'
                      }}
                    >
                      <div>
                        <div className="eyebrow">AI FLIX ORIGINAL</div>
                        <h2
                          style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '28px'
                          }}
                        >
                          THE OTHER WOMAN
                        </h2>
                        <p style={{ color: '#aaa' }}>
                          A psychological thriller
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="cardBody">
                    <h3>{series.title}</h3>
                    <p>
                      {series.genre} • {series.episodes.length} Episodes
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

        ) : activePage === 'mylist' ? (

          /* MY LIST PAGE */

          <section className="section myListPage">
            <div className="sectionHead">
              <h2>My List</h2>
            </div>

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
              <div className="emptyState">
                <p>Loading your list...</p>
              </div>
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
                {films
                  .filter((film) =>
                    watchlist.includes(String(film.id))
                  )
                  .map((film) => (
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

          /* CATEGORIES PAGE */

          <section className="section">
            <div className="sectionHead">
              <h2>Explore Categories</h2>
            </div>

            <div className="chips">
              {[...new Set(
                films.map((film) => film.genre).filter(Boolean)
              )].map((category) => (
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

        ) : (

          /* HOME AND MOVIE BROWSE PAGES */

          <>
            {/* HOMEPAGE HERO */}

            {activePage === 'home' && heroFilm && (
              <section
                className="hero"
                style={{
                  backgroundImage:
                    `linear-gradient(90deg, rgba(5,5,8,.82) 0%, rgba(5,5,8,.48) 48%, rgba(5,5,8,.12) 100%), url("${heroFilm.poster}")`
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

                  <p className="description">
                    {heroFilm.description}
                  </p>

                  <div className="actions">
                    <button
                      className="primary"
                      onClick={() => openFilm(heroFilm)}
                    >
                      <Play size={18} fill="currentColor" />
                      View Film
                    </button>

                    <button
                      className="secondary"
                      onClick={() => toggleWatchlist(heroFilm.id)}
                    >
                      {watchlist.includes(String(heroFilm.id)) ? (
                        <Check size={18} />
                      ) : (
                        <Plus size={18} />
                      )}

                      {watchlist.includes(String(heroFilm.id))
                        ? 'In My List'
                        : 'My List'}
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
                      : 'AI Flix Originals'}
                </h2>

                <ChevronRight size={20} />
              </div>

              {loadingFilms ? (
                <div className="emptyState">
                  <p>Loading films...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="emptyState">
                  <h2>No films found</h2>
                  <p>
                    Try another search or check back for future releases.
                  </p>

                  {query && (
                    <button
                      className="secondary"
                      onClick={() => setQuery('')}
                    >
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

            {/* SERIES BELOW FILMS ON HOMEPAGE */}

            {!query && activePage === 'home' && (
              <section className="section seriesFeatured">
                <div className="sectionHead">
                  <h2>AI Flix Original Series</h2>
                  <ChevronRight size={20} />
                </div>

                {FALLBACK_SERIES.map((series) => (
                  <article
                    className="seriesFeatureCard"
                    key={series.id}
                    onClick={() => {
                      setSelectedSeries(series);
                      changePage('series-detail');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="seriesFeaturePoster">
                      {series.poster ? (
                        <img src={series.poster} alt={series.title} />
                      ) : (
                        <div className="seriesPosterPlaceholder">
                          <span>AI FLIX ORIGINAL</span>
                          <h2>THE OTHER WOMAN</h2>
                          <p>A psychological thriller</p>
                        </div>
                      )}
                    </div>

                    <div className="seriesFeatureInfo">
                      <span className="eyebrow">
                        AI FLIX ORIGINAL SERIES
                      </span>

                      <h2>{series.title}</h2>
                      <p>{series.genre}</p>

                      <p>
                        {series.episodes.length} Episodes · {series.language}
                      </p>

                      <button
                        className="primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedSeries(series);
                          changePage('series-detail');
                        }}
                      >
                        View Series
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            )}

            {/* HOMEPAGE LOWER SECTIONS */}

            {!query && activePage === 'home' && (
              <>
                <section className="section">
                  <div className="sectionHead">
                    <h2>More Original Films Coming Soon</h2>
                  </div>

                  <p
                    style={{
                      color: '#aaa',
                      maxWidth: '650px',
                      fontSize: '14px',
                      lineHeight: '1.9'
                    }}
                  >
                    Discover original stories and independent cinema created
                    by Kainat Ali. New films will join the AI Flix catalogue
                    as they are released.
                  </p>
                </section>

                <section className="section">
                  <div className="sectionHead">
                    <h2>Explore AI Cinema</h2>
                  </div>

                  <div className="chips">
                    {[...new Set(
                      films.map((film) => film.genre).filter(Boolean)
                    )].map((category) => (
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
              </>
            )}
          </>
        )}
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
          Support:{' '}
          <a href="mailto:support@aiflixmovies.com">
            support@aiflixmovies.com
          </a>
        </p>
      </footer>

      {/* AUTHENTICATION MODAL */}

      {authMode && (
        <div
          className="modal"
          onClick={() => setAuthMode(null)}
          style={{ zIndex: 100001 }}
        >
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

                {authError && (
                  <p className="authError">{authError}</p>
                )}

                {authMessage && (
                  <p className="authMessage">{authMessage}</p>
                )}

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

                <button className="primary" onClick={signIn}>
                  Sign In
                </button>

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

                {authError && (
                  <p className="authError">{authError}</p>
                )}

                {authMessage && (
                  <p className="authMessage">{authMessage}</p>
                )}

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

                <button className="primary" onClick={signUp}>
                  Create Account
                </button>

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

                <h2>
                  {user.user_metadata?.full_name || 'AI Flix Member'}
                </h2>

                <p>{user.email}</p>

                {authError && (
                  <p className="authError">{authError}</p>
                )}

                <button className="primary" onClick={signOut}>
                  Sign Out
                </button>
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
            {playing ? (
              <div className="videoWrapper">
                {selected.videoUrl ? (
                  <iframe
                    src={selected.videoUrl}
                    title={selected.title}
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
              <button
                className="close"
                onClick={closeFilm}
                aria-label="Close film"
              >
                <X size={20} />
              </button>

              <div className="eyebrow">
                {selected.country} • {selected.year}
              </div>

              <h2>{selected.title}</h2>

              <p className="meta">
                {selected.runtime} • {selected.genre}
              </p>

              <p>{selected.description}</p>

              <p className="creator">
                <Film size={16} /> Created by {selected.creator}
              </p>

              <div className="actions">
                <button
                  className="primary"
                  onClick={playSelectedFilm}
                >
                  <Play size={18} fill="currentColor" />
                  {playing ? 'Playing' : 'Play Film'}
                </button>

                <button
                  className="secondary"
                  onClick={() => toggleWatchlist(selected.id)}
                >
                  {watchlist.includes(String(selected.id)) ? (
                    <Check size={18} />
                  ) : (
                    <Plus size={18} />
                  )}

                  {watchlist.includes(String(selected.id))
                    ? 'In My List'
                    : 'My List'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EPISODE PLAYER */}

      {selectedEpisode && (
        <div
          className="modal"
          onClick={() => setSelectedEpisode(null)}
        >
          <div
            className="modalCard playingCard"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSelectedEpisode(null)}
              aria-label="Close episode"
            >
              <X size={20} />
            </button>

            <div className="videoWrapper">
              <iframe
                src={selectedEpisode.videoUrl}
                title={selectedEpisode.title}
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
            </div>

            <div className="modalContent">
              <div className="eyebrow">
                THE OTHER WOMAN • EPISODE {selectedEpisode.number}
              </div>

              <h2>{selectedEpisode.title}</h2>
              <p>AI FLIX ORIGINAL SERIES</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
