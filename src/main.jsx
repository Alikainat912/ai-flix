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

const fallbackFilms = [
  {
    id: 1,
    title: 'The Night The Flag Changed',
    year: 2026,
    runtime: '22 min',
    genre: 'Historical Thriller',
    country: 'Pakistan',
    creator: 'Kainat Ali',
    description:
      'A historical thriller exploring a pivotal night through AI-assisted cinema.',
    poster:
  'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/posters/104914533_1781362209762270.jpg',
    featured: true,
  youtubeId: null,

  },
  {
    id: 2,
    title: 'Neon Memory',
    year: 2026,
    runtime: '11 min',
    genre: 'Sci-Fi',
    country: 'International',
    creator: 'AI Flix Showcase',
    description:
      'A short journey through a city where memories can be replayed.',
    poster:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'The Last Garden',
    year: 2026,
    runtime: '8 min',
    genre: 'Drama',
    country: 'International',
    creator: 'AI Flix Showcase',
    description:
      'A quiet story about a final garden in a changing world.',
    poster:
      'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    title: 'Beyond the Mountains',
    year: 2026,
    runtime: '15 min',
    genre: 'Adventure',
    country: 'Pakistan',
    creator: 'AI Flix Showcase',
    description:
      'An expedition into landscapes shaped by imagination and generative cinema.',
    poster:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80'
  }
];

function App() {
  const [films, setFilms] = useState(fallbackFilms);
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [activePage, setActivePage] = useState('home');
  const [submissionTitle, setSubmissionTitle] = useState('');
const [submissionDescription, setSubmissionDescription] = useState('');
const [submissionGenre, setSubmissionGenre] = useState('');
const [submissionCountry, setSubmissionCountry] = useState('');
const [submissionDirector, setSubmissionDirector] = useState('');
const [submissionYear, setSubmissionYear] = useState('');
const [submissionDuration, setSubmissionDuration] = useState('');
const [submissionMessage, setSubmissionMessage] = useState('');
const [submissionError, setSubmissionError] = useState('');
  // AUTH STATES
const [user, setUser] = useState(null);
const [authMode, setAuthMode] = useState(null);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [fullName, setFullName] = useState('');
const [authError, setAuthError] = useState('');
const [authMessage, setAuthMessage] = useState('');
  const [submissionPoster, setSubmissionPoster] = useState(null);
const [submissionVideo, setSubmissionVideo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  // LOGIN CHECK
useEffect(() => {
  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    setUser(user);
  };

  getUser();

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user || null);
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, []);
  useEffect(() => {
  if (!user) {
    setIsAdmin(false);
    return;
  }

  setIsAdmin(
    user.id === '888a7732-5e06-4d4d-8d35-373351509343'
  );
}, [user]);
  useEffect(() => {
  setSubmissionMessage('PENDING EFFECT RAN — ADMIN: ' + isAdmin);

  if (!isAdmin) {
    setPendingSubmissions([]);
    return;
  }

  const loadPendingSubmissions = async () => {
    const { data, error } = await supabase
      .from('film_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    setSubmissionMessage(
  'QUERY RETURNED — DATA: ' +
  JSON.stringify(data) +
  ' — ERROR: ' +
  JSON.stringify(error)
);

    console.log('ALL SUBMISSIONS:', data);
    console.log('SUBMISSION ERROR:', error);

    if (error) {
      setSubmissionError(
        'ADMIN QUERY ERROR: ' + error.message
      );
      return;
    }

    setPendingSubmissions(data || []);

    setSubmissionMessage(
      'ADMIN QUERY FOUND: ' + (data || []).length
    );
  };

  loadPendingSubmissions();
}, [isAdmin]);
  
  useEffect(() => {
  const loadWatchlist = async () => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    const { data, error } = await supabase
      .from('watchlist')
      .select('movie_id')
      .eq('user_id', user.id);

    if (error) {
      console.error(
        'Could not load My List:',
        error
      );
      return;
    }

    setWatchlist(
  (data || []).map((item) => Number(item.movie_id))
);
  };

  loadWatchlist();
}, [user]);

useEffect(() => {
  const loadMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('year', { ascending: false });

    if (error) {
      console.error(
        'Could not load movies from Supabase:',
        error
      );
      return;
    }

    if (!data || data.length === 0) {
      return;
    }

    const databaseFilms = data.map((movie) => {
      console.log('MOVIE:', movie.title);
      console.log(
        'POSTER URL FROM SUPABASE:',
        movie.poster_url
      );

      const existingFilm = fallbackFilms.find(
        (film) => film.title === movie.title
      );

      return {
        id: movie.id,

        title:
          movie.title ||
          existingFilm?.title ||
          'Untitled Film',

        year:
          movie.year ||
          existingFilm?.year ||
          2026,

        runtime:
          movie.duration ||
          existingFilm?.runtime ||
          '',

        genre:
          movie.genre ||
          existingFilm?.genre ||
          'AI Cinema',

        country:
          existingFilm?.country ||
          'International',

        creator:
          movie.director ||
          existingFilm?.creator ||
          'Unknown',

        description:
          movie.description ||
          existingFilm?.description ||
          'An AI-generated or AI-assisted film.',

        poster:
  movie.title === 'The Night The Flag Changed'
    ? 'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/posters/104914533_1781362209762270.jpg'
    : movie.poster_url?.trim() || existingFilm?.poster || '',

        videoUrl:
          movie.video_url ||
          existingFilm?.videoUrl ||
          'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/videos/749822946_1781407777086011.mp4',
      };
    });

    setFilms(databaseFilms);
  };

  loadMovies();
}, []);
  
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return films;

    return films.filter((film) =>
      [film.title, film.genre, film.country, film.creator].some(
        (value) => value && value.toLowerCase().includes(q)
      )
    );
  }, [query, films]);

  const toggleWatchlist = async (id) => {
  console.log('MY LIST CLICKED:', id);
  console.log('CURRENT USER:', user);

  if (!user) {
    setAuthError('Please sign in to use My List.');
    setAuthMode('login');
    return;
  }

  const alreadySaved = watchlist.includes(id);

  console.log('ALREADY SAVED:', alreadySaved);

  if (alreadySaved) {
    const { data, error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', user.id)
      .eq('movie_id', String(id))
      .select();

    console.log('DELETE RESULT:', data);
    console.log('DELETE ERROR:', error);

    if (error) {
      alert('DELETE ERROR: ' + error.message);
      return;
    }

    setWatchlist((current) =>
      current.filter((item) => item !== id)
    );

  } else {
    const { data, error } = await supabase
      .from('watchlist')
      .insert({
        user_id: user.id,
        movie_id: String(id)
      })
      .select();

    console.log('INSERT RESULT:', data);
    console.log('INSERT ERROR:', error);

    if (error) {
      alert('INSERT ERROR: ' + error.message);
      return;
    }

    setWatchlist((current) => [
      ...current,
      id
    ]);
  }
};
 const submitFilm = async () => {
  setSubmissionError('');
  setSubmissionMessage('');

  if (!user) {
    setSubmissionError(
      'Please sign in before submitting a film.'
    );
    setAuthMode('login');
    return;
  }

  if (!submissionTitle.trim()) {
    setSubmissionError('Please enter a film title.');
    return;
  }

  if (!submissionPoster) {
    setSubmissionError('Please upload a film poster.');
    return;
  }

  if (!submissionVideo) {
    setSubmissionError('Please upload your film/video.');
    return;
  }

  try {
    // Create unique file names
    const posterPath =
      `${user.id}/${Date.now()}-${submissionPoster.name}`;

    const videoPath =
      `${user.id}/${Date.now()}-${submissionVideo.name}`;

    // Upload poster
    const { error: posterError } = await supabase.storage
      .from('posters')
      .upload(posterPath, submissionPoster);

    if (posterError) {
      console.error('POSTER UPLOAD ERROR:', posterError);
      setSubmissionError(
        'Could not upload poster: ' + posterError.message
      );
      return;
    }

    // Upload video
    const { error: videoError } = await supabase.storage
      .from('videos')
      .upload(videoPath, submissionVideo);

    if (videoError) {
      console.error('VIDEO UPLOAD ERROR:', videoError);
      setSubmissionError(
        'Could not upload video: ' + videoError.message
      );
      return;
    }

    // Get public poster URL
    const { data: posterData } = supabase.storage
      .from('posters')
      .getPublicUrl(posterPath);

    // Get public video URL
    const { data: videoData } = supabase.storage
      .from('videos')
      .getPublicUrl(videoPath);

    // Save submission information + file URLs
    const { error } = await supabase
      .from('film_submissions')
      .insert({
        user_id: user.id,
        title: submissionTitle.trim(),
        description: submissionDescription.trim(),
        genre: submissionGenre.trim(),
        country: submissionCountry.trim(),
        director: submissionDirector.trim(),
        year: submissionYear.trim(),
        duration: submissionDuration.trim(),
        filmmaker_email: user.email,
        poster_url: posterData.publicUrl,
        video_url: videoData.publicUrl,
        status: 'pending'
      });

    if (error) {
      console.error('SUBMISSION ERROR:', error);
      setSubmissionError(
        'Could not submit your film: ' + error.message
      );
      return;
    }

    setSubmissionMessage(
      'Your film has been submitted successfully and is now pending review.'
    );

    setSubmissionTitle('');
    setSubmissionDescription('');
    setSubmissionGenre('');
    setSubmissionCountry('');
    setSubmissionDirector('');
    setSubmissionYear('');
    setSubmissionDuration('');
    setSubmissionPoster(null);
    setSubmissionVideo(null);

  } catch (err) {
    console.error('UNEXPECTED SUBMISSION ERROR:', err);
    setSubmissionError(
      'Something went wrong while submitting your film.'
    );
  }
};
  const openFilm = (film) => {
  console.log('SELECTED FILM:', film);
  console.log('VIDEO URL:', film.videoUrl);

  setSelected(film);
  setPlaying(false);
};

const closeFilm = () => {
  setSelected(null);
  setPlaying(false);
};

const heroFilm = films[0];
  return (
    <div className="app">

      {/* NAVIGATION */}
      <header className="nav">
        <div className="brand">
          AI<span>FLIX</span>
        </div>
<nav>
  <button onClick={() => setActivePage('home')}>
    Home
  </button>

  <button onClick={() => setActivePage('browse')}>
    Browse
  </button>

  <button
    onClick={() => {
      console.log('MY LIST BUTTON CLICKED');
      setActivePage('mylist');
    }}
  >
    My List
  </button>

<button onClick={() => setActivePage('admin')}>
  Admin Review TEST
</button>
  

  <button onClick={() => setActivePage('categories')}>
    Categories
  </button>
</nav>
        
        <div className="navRight">
          <div className="search">
            <Search size={18} />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search films..."
            />
          </div>

          <button
  className="iconBtn"
  onClick={() => {
    setAuthError('');
    setAuthMessage('');
    setAuthMode(user ? 'account' : 'login');
  }}
>
  <User size={19} />
</button>
        </div>
      </header>
      {isAdmin && (
  <p style={{ color: 'green' }}>ADMIN DETECTED</p>
)}

  
        <main>
{activePage === 'admin' && isAdmin ? (
  <section className="section submitPage">

    <div className="sectionHead">
      <h2>Admin Review</h2>

<p className="adminIntro">
  Review filmmaker submissions before they appear on AI Flix.
</p>

{pendingSubmissions.length === 0 ? (
  <div className="emptyState adminEmpty">
    <h3>No pending submissions</h3>

    <p>
      New filmmaker submissions will appear here when they are ready
      for review.
    </p>
  </div>
) : (
  <div className="submissionList">

    {pendingSubmissions.map((submission) => (

      <div
        key={submission.id}
        className="submissionCard"
      >

        <div className="submissionHeader">

          <div>
            <span className="submissionLabel">
              FILM SUBMISSION
            </span>

            <h3>{submission.title}</h3>
          </div>

          <span className="submissionStatus">
            {submission.status}
          </span>

        </div>

        {submission.poster_url && (
          <div className="submissionPoster">
            <img
              src={submission.poster_url}
              alt={submission.title}
            />
          </div>
        )}

        <div className="submissionDetails">

          <div>
            <strong>Director</strong>
            <span>{submission.director || '—'}</span>
          </div>

          <div>
            <strong>Genre</strong>
            <span>{submission.genre || '—'}</span>
          </div>

          <div>
            <strong>Country</strong>
            <span>{submission.country || '—'}</span>
          </div>

          <div>
            <strong>Year</strong>
            <span>{submission.year || '—'}</span>
          </div>

          <div>
            <strong>Duration</strong>
            <span>{submission.duration || '—'}</span>
          </div>

          <div>
            <strong>Filmmaker</strong>
            <span>{submission.filmmaker_email || '—'}</span>
          </div>

        </div>

        {submission.description && (
          <div className="submissionDescription">

            <strong>Description</strong>

            <p>
              {submission.description}
            </p>

          </div>
        )}

        {submission.video_url && (
          <div className="submissionVideo">

            <strong>Film Preview</strong>

            <video
              controls
              preload="metadata"
            >
              <source
                src={submission.video_url}
                type="video/mp4"
              />

              Your browser does not support video playback.
            </video>

          </div>
        )}

        <div className="submissionActions">

          <button className="primary">
            Approve Film
          </button>

          <button className="secondary rejectButton">
            Reject Film
          </button>

        </div>

      </div>

    ))}

  </div>
)}

      

  </section>
  ) : activePage === 'submit' ? (
  <section className="section submitPage">

    <div className="sectionHead">
      <h2>Submit a Film</h2>
    </div>

    {!user ? (
      <div className="emptyState">
        <h2>Sign in to submit a film</h2>

        <p>
          You need an AI Flix account before submitting a film.
        </p>

        <button
          className="primary"
          onClick={() => {
            setAuthError('');
            setAuthMessage('');
            setAuthMode('login');
          }}
        >
          Sign In
        </button>
      </div>
    ) : (
      <div className="submissionForm">

        <div className="eyebrow">
          FILMMAKER SUBMISSION
        </div>

        <h2>Tell us about your film</h2>

        <p>
          Submit your AI-generated or AI-assisted film
          for review by AI Flix.
        </p>

        {submissionError && (
          <p className="authError">
            {submissionError}
          </p>
        )}

        {submissionMessage && (
          <p className="authMessage">
            {submissionMessage}
          </p>
        )}

        <input
          type="text"
          placeholder="Film title"
          value={submissionTitle}
          onChange={(e) =>
            setSubmissionTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Film description / synopsis"
          value={submissionDescription}
          onChange={(e) =>
            setSubmissionDescription(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Genre"
          value={submissionGenre}
          onChange={(e) =>
            setSubmissionGenre(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Country"
          value={submissionCountry}
          onChange={(e) =>
            setSubmissionCountry(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Director / Creator"
          value={submissionDirector}
          onChange={(e) =>
            setSubmissionDirector(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Year"
          value={submissionYear}
          onChange={(e) =>
            setSubmissionYear(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Duration (e.g. 22 min)"
          value={submissionDuration}
          onChange={(e) =>
            setSubmissionDuration(e.target.value)
          }
        />
        <label>Film Poster</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setSubmissionPoster(e.target.files[0])
  }
/>

<label>Film / Video</label>
<input
  type="file"
  accept="video/*"
  onChange={(e) =>
    setSubmissionVideo(e.target.files[0])
  }
/>

        <button
          className="primary"
          onClick={submitFilm}
        >
          Submit Film
          <ChevronRight size={18} />
        </button>

      </div>
    )}

  </section>
) : activePage === 'mylist' ? (
  <section className="section myListPage">

    <div className="sectionHead">
      <h2>My List</h2>
    </div>

    {watchlist.length === 0 ? (
      <div className="emptyState">
        <h2>Your list is empty</h2>
        <p>
          Films you add to My List will appear here.
        </p>

        <button
          className="primary"
          onClick={() => setActivePage('browse')}
        >
          Browse Films
        </button>
      </div>
    ) : (
      <div className="grid">

        {films
          .filter((film) =>
            watchlist.includes(film.id)
          )
          .map((film) => (
            <article
              className="card"
              key={film.id}
              onClick={() => openFilm(film)}
            >

              <img
                src={film.poster}
                alt={film.title}
              />

              <div className="cardOverlay">
                <span>{film.runtime}</span>
                <span>{film.genre}</span>
              </div>

              <div className="cardBody">
                <h3>{film.title}</h3>

                <p>
                  {film.country} • {film.year}
                </p>
              </div>

            </article>
          ))}

      </div>
    )}

  </section>
) : (
  <>
    {heroFilm && (
          <section
            className="hero"
            style={{
              backgroundImage: `linear-gradient(
                90deg,
                rgba(0,0,0,.92) 0%,
                rgba(0,0,0,.58) 48%,
                rgba(0,0,0,.15) 100%
              ), url(${heroFilm.poster})`
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
                  Watch
                </button>

                <button
                  className="secondary"
                  onClick={() => toggleWatchlist(heroFilm.id)}
                >
                  {watchlist.includes(heroFilm.id) ? (
                    <Check size={18} />
                  ) : (
                    <Plus size={18} />
                  )}

                  {watchlist.includes(heroFilm.id)
                    ? 'In My List'
                    : 'My List'}
                </button>

              </div>
            </div>
          </section>
        )}

        {/* FILMS */}
        <section className="section">

          <div className="sectionHead">
            <h2>
              {query ? 'Search Results' : 'Featured AI Cinema'}
            </h2>

            <ChevronRight size={20} />
          </div>

          <div className="grid">

            {filtered.map((film) => (
              <article
                className="card"
                key={film.id}
                onClick={() => openFilm(film)}
              >
                <img
                  src={film.poster}
                  alt={film.title}
                />

                <div className="cardOverlay">
                  <span>{film.runtime}</span>
                  <span>{film.genre}</span>
                </div>

                <div className="cardBody">
                  <h3>{film.title}</h3>
                  <p>
                    {film.country} • {film.year}
                  </p>
                </div>
              </article>
            ))}

          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section">

          <div className="sectionHead">
            <h2>Explore AI Cinema</h2>
          </div>

          <div className="chips">

            {[
  'Drama',
  'Sci-Fi',
  'Historical',
  'Animation',
  'Documentary',
  'Experimental',
  'Pakistan',
  'International'
].map((category) => (
  <button
    key={category}
    onClick={() => setQuery(category)}
  >
    {category}
  </button>
))}

          </div>
        </section>

        {/* FILMMAKER SECTION */}
        <section className="creatorBanner">

          <div>

            <div className="eyebrow">
              FOR FILMMAKERS
            </div>

            <h2>
              Have an AI film?
            </h2>

            <p>
              AI Flix is being built as a home for
              AI-generated and AI-assisted cinema.
            </p>

          </div>

          <button
  className="primary"
  onClick={() => setActivePage('submit')}
>
  Submit a Film
  <ChevronRight size={18} />
</button>

                </section>

  </>
)}

</main>

      {/* FOOTER */}
      <footer>

        <div className="brand">
          AI<span>FLIX</span>
        </div>

        <p>
          © 2026 AI Flix. A home for AI cinema.
        </p>

      </footer>
      {/* AUTH MODAL */}
{authMode && (
  <div
    className="modal"
    onClick={() => setAuthMode(null)}
  >
    <div
      className="modalCard authCard"
      onClick={(event) => event.stopPropagation()}
    >

      <button
        className="close"
        onClick={() => setAuthMode(null)}
      >
        <X size={20} />
      </button>

      {authMode === 'login' && (
        <div className="modalContent">

          <div className="eyebrow">
            WELCOME BACK
          </div>

          <h2>Sign in to AI Flix</h2>

          <p>
            Continue watching AI-generated and
            AI-assisted cinema.
          </p>

          {authError && (
            <p className="authError">
              {authError}
            </p>
          )}

          {authMessage && (
            <p className="authMessage">
              {authMessage}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="primary"
            onClick={async () => {

              setAuthError('');
              setAuthMessage('');

              const { error } =
                await supabase.auth.signInWithPassword({
                  email,
                  password
                });

              if (error) {
                setAuthError(error.message);
                return;
              }

              setAuthMode(null);
              setEmail('');
              setPassword('');
            }}
          >
            Sign In
          </button>

          <button
            className="secondary"
            onClick={() => {
              setAuthMode('signup');
              setAuthError('');
              setAuthMessage('');
            }}
          >
            Create an account
          </button>

        </div>
      )}

      {authMode === 'signup' && (
        <div className="modalContent">

          <div className="eyebrow">
            JOIN AI FLIX
          </div>

          <h2>Create your account</h2>

          <p>
            Join the home for AI cinema.
          </p>

          {authError && (
            <p className="authError">
              {authError}
            </p>
          )}

          {authMessage && (
            <p className="authMessage">
              {authMessage}
            </p>
          )}

          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="primary"
            onClick={async () => {

              setAuthError('');
              setAuthMessage('');

              const { data, error } =
                await supabase.auth.signUp({
                  email,
                  password,
                  options: {
                    data: {
                      full_name: fullName
                    }
                  }
                });

              if (error) {
                setAuthError(error.message);
                return;
              }

              if (data.user) {
                setAuthMessage(
                  'Account created successfully.'
                );
              }
            }}
          >
            Create Account
          </button>

          <button
            className="secondary"
            onClick={() => {
              setAuthMode('login');
              setAuthError('');
              setAuthMessage('');
            }}
          >
            Already have an account? Sign in
          </button>

        </div>
      )}

      {authMode === 'account' && user && (
        <div className="modalContent">

          <div className="eyebrow">
            YOUR ACCOUNT
          </div>

          <h2>
            {user.user_metadata?.full_name ||
              'AI Flix Member'}
          </h2>

          <p>
            {user.email}
          </p>

          <button
            className="primary"
            onClick={async () => {
              await supabase.auth.signOut();
              setAuthMode(null);
            }}
          >
            Sign Out
          </button>

        </div>
      )}

    </div>
  </div>
)}

      {/* FILM MODAL */}
      {selected && (

        <div
          className="modal"
          onClick={closeFilm}
        >
          <div
            className={`modalCard ${playing ? 'playingCard' : ''}`}
            onClick={(event) => event.stopPropagation()}
          >
{/* VIDEO PLAYER */}

{playing ? (
  <div className="videoWrapper">
    <video
  controls
  autoPlay
  playsInline
  src={selected?.videoUrl || 'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/videos/749822946_1781407777086011.mp4'}
  style={{
    width: '100%',
    height: 'auto',
    display: 'block',
    background: '#000'
  }}
/>
  </div>
) : (
  <img
    src={selected.poster}
    alt={selected.title}
  />
)}
             
    
            <div className="modalContent">

              <button
                className="close"
                onClick={closeFilm}
              >
                <X size={20} />
              </button>

              <div className="eyebrow">
                {selected.country} • {selected.year}
              </div>

              <h2>
                {selected.title}
              </h2>

              <p className="meta">
                {selected.runtime} • {selected.genre}
              </p>

              <p>
                {selected.description}
              </p>

              <p className="creator">
                <Film size={16} />
                Created by {selected.creator}
              </p>

              <div className="actions">

                <button
  className="primary"
  onClick={() => setPlaying(true)}
>
  <Play
    size={18}
    fill="currentColor"
  />
  Watch Film
</button>

                <button
                  className="secondary"
                  onClick={() =>
                    toggleWatchlist(selected.id)
                  }
                >
                  {watchlist.includes(selected.id) ? (
                    <Check size={18} />
                  ) : (
                    <Plus size={18} />
                  )}

                  {watchlist.includes(selected.id)
                    ? 'In My List'
                    : 'My List'}
                </button>

              </div>

              {playing && (
                <p className="notice">
                  You are watching on AI Flix.
                </p>
              )}

            </div>

          </div>
        </div>

      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
