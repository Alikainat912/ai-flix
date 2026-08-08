import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Search, Play, Plus, Check, ChevronRight, Film, User} from 'lucide-react';
import './styles.css';

const films = [
  {
    id: 1,
    title: 'The Night The Flag Changed',
    year: 2026,
    runtime: '22 min',
    genre: 'Historical Thriller',
    country: 'Pakistan',
    creator: 'Kainat Ali',
    description: 'A historical thriller exploring a pivotal night through AI-assisted cinema.',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 2,
    title: 'Neon Memory',
    year: 2026,
    runtime: '11 min',
    genre: 'Sci-Fi',
    country: 'International',
    creator: 'AI Flix Showcase',
    description: 'A short journey through a city where memories can be replayed.',
    poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'The Last Garden',
    year: 2026,
    runtime: '8 min',
    genre: 'Drama',
    country: 'International',
    creator: 'AI Flix Showcase',
    description: 'A quiet story about a final garden in a changing world.',
    poster: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    title: 'Beyond the Mountains',
    year: 2026,
    runtime: '15 min',
    genre: 'Adventure',
    country: 'Pakistan',
    creator: 'AI Flix Showcase',
    description: 'An expedition into landscapes shaped by imagination and generative cinema.',
    poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80'
  }
];

function App() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return films;
    return films.filter(f =>
      [f.title, f.genre, f.country, f.creator].some(v => v.toLowerCase().includes(q))
    );
  }, [query]);

  const toggleWatchlist = (id) => {
    setWatchlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  };

  return (
    <div className="app">
      <header className="nav">
        <div className="brand">AI<span>FLIX</span></div>
        <nav>
          <button>Home</button><button>Browse</button><button>Categories</button>
        </nav>
        <div className="navRight">
          <div className="search">
            <Search size={18}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search films..." />
          </div>
          <button className="iconBtn"><User size={19}/></button>
        </div>
      </header>

      <main>
        <section className="hero" style={{backgroundImage:`linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.58) 48%, rgba(0,0,0,.15) 100%), url(${films[0].poster})`}}>
          <div className="heroCopy">
            <div className="eyebrow">AI FLIX ORIGINAL • 2026</div>
            <h1>{films[0].title}</h1>
            <p className="meta">{films[0].year} &nbsp;•&nbsp; {films[0].runtime} &nbsp;•&nbsp; {films[0].genre}</p>
            <p className="description">{films[0].description}</p>
            <div className="actions">
              <button className="primary" onClick={()=>setSelected(films[0])}><Play size={18} fill="currentColor"/> Watch</button>
              <button className="secondary" onClick={()=>toggleWatchlist(films[0].id)}>
                {watchlist.includes(films[0].id) ? <Check size={18}/> : <Plus size={18}/>}
                {watchlist.includes(films[0].id) ? 'In My List' : 'My List'}
              </button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="sectionHead"><h2>{query ? 'Search Results' : 'Featured AI Cinema'}</h2><ChevronRight size={20}/></div>
          <div className="grid">
            {filtered.map(f => (
              <article className="card" key={f.id} onClick={()=>setSelected(f)}>
                <img src={f.poster} alt={f.title}/>
                <div className="cardOverlay"><span>{f.runtime}</span><span>{f.genre}</span></div>
                <div className="cardBody"><h3>{f.title}</h3><p>{f.country} • {f.year}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="sectionHead"><h2>Explore AI Cinema</h2></div>
          <div className="chips">
            {['Drama','Sci-Fi','Historical','Animation','Documentary','Experimental','Pakistan','International'].map(x=><button key={x}>{x}</button>)}
          </div>
        </section>

        <section className="creatorBanner">
          <div>
            <div className="eyebrow">FOR FILMMAKERS</div>
            <h2>Have an AI film?</h2>
            <p>AI Flix is being built as a home for AI-generated and AI-assisted cinema.</p>
          </div>
          <button className="primary">Submit a Film <ChevronRight size={18}/></button>
        </section>
      </main>

      <footer><div className="brand">AI<span>FLIX</span></div><p>© 2026 AI Flix. A home for AI cinema.</p></footer>

      {selected && (
        <div className="modal" onClick={()=>setSelected(null)}>
          <div className="modalCard" onClick={e=>e.stopPropagation()}>
            <img src={selected.poster} alt="" />
            <div className="modalContent">
              <button className="close" onClick={()=>setSelected(null)}>×</button>
              <div className="eyebrow">{selected.country} • {selected.year}</div>
              <h2>{selected.title}</h2>
              <p className="meta">{selected.runtime} • {selected.genre}</p>
              <p>{selected.description}</p>
              <p className="creator"><Film size={16}/> Created by {selected.creator}</p>
              <div className="actions">
                <button className="primary"><Play size={18} fill="currentColor"/> Watch</button>
                <button className="secondary" onClick={()=>toggleWatchlist(selected.id)}>
                  {watchlist.includes(selected.id) ? <Check size={18}/> : <Plus size={18}/>}
                  {watchlist.includes(selected.id) ? 'In My List' : 'My List'}
                </button>
              </div>
              <p className="notice">Demo player: real film streaming will be connected in the next build stage.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
