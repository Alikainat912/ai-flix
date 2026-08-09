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

function App() {
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [films, setFilms] = useState([]);
  const [loadingFilms, setLoadingFilms] = useState(true);

  useEffect(() => {
    async function loadFilms() {
      const { data, error } = await supabase
        .from('films')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading films:', error);
        setFilms([]);
      } else {
        setFilms(
          data.map((film) => ({
            ...film,
            youtubeId: film.youtube_id
          }))
        );
      }

      setLoadingFilms(false);
    }

    loadFilms();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return films;

    return films.filter((film) =>
      [film.title, film.genre, film.country, film.creator].some(
        (value) =>
          value &&
          value.toLowerCase().includes(q)
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

  const closeFilm = () => {
    setSelected(null);
    setPlaying(false);
  };

  if (loadingFilms) {
    return (
      <div className="app">
        <div className="loadingScreen">
          Loading AI Flix...
        </div>
      </div>
    );
  }

  if (!films.length) {
    return (
      <div className="app">
        <div className="loadingScreen">
          No films available yet.
        </div>
      </div>
    );
  }

  const featuredFilm =
    films.find((film) => film.featured) || films[0];

  return (
    <div className="app">

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

        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(
              90deg,
              rgba(0,0,0,.92) 0%,
              rgba(0,0,0,.58) 48%,
              rgba(0,0,0,.15) 100%
            ), url(${featuredFilm.poster})`
          }}
        >
          <div className="heroCopy">

            <div className="eyebrow">
              AI FLIX ORIGINAL • {featuredFilm.year}
            </div>

            <h1>{featuredFilm.title}</h1>

            <p className="meta">
              {featuredFilm.year} • {featuredFilm.runtime} •{' '}
              {featuredFilm.genre}
            </p>

            <p className="description">
              {featuredFilm.description}
            </p>

            <div className="actions">

              <button
                className="primary"
                onClick={() => openFilm(featuredFilm)}
              >
                <Play size={18} fill="currentColor" />
                Watch
              </button>

              <button
                className="secondary"
                onClick={() =>
                  toggleWatchlist(featuredFilm.id)
                }
              >
                {watchlist.includes(featuredFilm.id) ? (
                  <Check size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {watchlist.includes(featuredFilm.id)
                  ? 'In My List'
                  : 'My List'}
              </button>

            </div>
          </div>
        </section>

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

      <footer>

        <div className="brand">
          AI<span>FLIX</span>
        </div>

        <p>
          © 2026 AI Flix. A home for AI cinema.
        </p>

      </footer>

      {selected && (

        <div
          className="modal"
          onClick={closeFilm}
        >

          <div
            className={`modalCard ${
              playing ? 'playingCard' : ''
            }`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {playing && selected.youtubeId ? (

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

                {selected.youtubeId && (

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

                )}

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
