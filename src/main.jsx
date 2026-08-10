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
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    featured: true,
  youtubeId: null,
    videoUrl:
  movie.video_url ||
  'https://wugdmnouiomxtltxmuen.supabase.co/storage/v1/object/public/videos/749822946_1781407777086011.mp4',

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

  useEffect(() => {
    const loadMovies = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('year', { ascending: false });

      if (error) {
        console.error('Could not load movies from Supabase:', error);
        return;
      }

      if (!data || data.length === 0) {
        return;
      }
const databaseFilms = data.map((movie) => {
  const existingFilm = fallbackFilms.find(
    (film) => film.title === movie.title
  );

  return {
    id: movie.id,
    title: movie.title,
    year: movie.year || existingFilm?.year || 2026,
    runtime: movie.duration || existingFilm?.runtime || '',
    genre: movie.genre || existingFilm?.genre || 'AI Cinema',
    country: existingFilm?.country || 'International',
    creator: movie.director || existingFilm?.creator || 'Unknown',
    description:
      movie.description ||
      existingFilm?.description ||
      'An AI-generated or AI-assisted film.',
    poster:
      movie.poster_url ||
      existingFilm?.poster ||
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    youtubeId: existingFilm?.youtubeId,
    videoUrl: 
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

  const toggleWatchlist = (id) => {
    setWatchlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const openFilm = (film) => {
  setSelected(film);
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
          <button>Home</button>
          <button>Browse</button>
          <button>Categories</button>
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

          <button className="iconBtn">
            <User size={19} />
          </button>
        </div>
      </header>

      <main>

        {/* HERO */}
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
              <button key={category}>
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

          <button className="primary">
            Submit a Film
            <ChevronRight size={18} />
          </button>

        </section>

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

{playing && selected.videoUrl ? (
  <div className="videoWrapper">
    <video
      src={selected.videoUrl}
      controls
      autoPlay
      playsInline
    />
  </div>
) : playing && selected.youtubeId ? (
  <div className="videoWrapper">
    <iframe
      src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1&rel=0`}
      title={selected.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
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

createRoot(
  document.getElementById('root')
).render(<App />);
