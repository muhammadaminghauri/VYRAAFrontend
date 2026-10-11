'use client'

import { useState } from 'react'
import { Headphones, Home, Library, ListMusic, Menu, MoreHorizontal, Play, Search, Sparkles, WandSparkles, Heart, Plus, Radio, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { albums, genres, navItems, nowPlaying, playlists, tracks } from '@/frontend/data'

const iconMap = { home: Home, sparkles: Sparkles, wand: WandSparkles, library: Library }

export default function Page() {
  const [activeNav, setActiveNav] = useState('Home')
  const [activeGenre, setActiveGenre] = useState('For you')
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <main className="vyra-shell">
      <aside className="vyra-sidebar">
        <div className="brand"><span className="brand-mark"><Headphones /></span><span>VYRA</span></div>
        <div className="side-label">Menu</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap]; return <button key={item.label} className={`nav-item ${activeNav === item.label ? 'active' : ''}`} onClick={() => setActiveNav(item.label)}><Icon />{item.label}</button> })}
        </nav>
        <div className="side-label library-label">Your library</div>
        <div className="nav-list">
          {playlists.map((playlist, index) => <button className="nav-item subtle" key={playlist} onClick={() => setActiveNav(playlist)}><ListMusic />{playlist}<span className="track-count">{index + 3}</span></button>)}
        </div>
        <button className="new-playlist"><Plus /> New playlist</button>
        <div className="sidebar-note"><span className="note-icon"><Radio /></span><div><strong>VYRA Radio</strong><small>Ambient frequency</small></div><span className="live-dot" /></div>
      </aside>

      <section className="vyra-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open menu"><Menu /></button><div className="breadcrumb">{activeNav} <span>/</span> Curated for you</div><label className="search"><Search /><input placeholder="Search moods, artists, tracks" aria-label="Search music" /></label><button className="avatar" aria-label="Open profile">VL</button></header>
        <div className="content-scroll">
          <section className="hero-grid">
            <div className="hero-copy"><p className="eyebrow">YOUR DAILY FREQUENCY</p><h1>Find your<br /><em>inner tempo.</em></h1><p className="hero-description">A listening space that moves with you. Discover soundtracks for every version of your day.</p><div className="hero-actions"><button className="primary-action" onClick={() => setPlaying(true)}><Play /> Start listening</button><button className="ghost-action">Explore moods <span>→</span></button></div></div>
            <div className="hero-art"><img src={albums[0].image} alt="Glass Hours album artwork" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-caption"><span>NOW PLAYING</span><strong>Glass Hours</strong><small>Vera Lux · After Rain</small></div></div>
          </section>

          <section className="section-block"><div className="section-heading"><div><p className="eyebrow">LISTEN BY FEELING</p><h2>What's your mood?</h2></div><button className="text-action">View all <span>→</span></button></div><div className="genre-row">{genres.map((genre) => <button key={genre} className={`genre-pill ${activeGenre === genre ? 'selected' : ''}`} onClick={() => setActiveGenre(genre)}>{genre}</button>)}</div></section>

          <section className="section-block"><div className="section-heading"><div><p className="eyebrow">HANDPICKED FOR YOU</p><h2>Today's rotation</h2></div><button className="text-action">See collection <span>→</span></button></div><div className="album-grid">{albums.slice(0, 3).map((album) => <article className="album-card" key={album.title} onClick={() => setPlaying(true)}><div className="album-image"><img src={album.image} alt={`${album.title} by ${album.artist}`} /><button className="card-play" aria-label={`Play ${album.title}`}><Play /></button></div><div className="album-info"><div><h3>{album.title}</h3><p>{album.artist} · {album.genre}</p></div><button className="more-button" aria-label={`More options for ${album.title}`}><MoreHorizontal /></button></div></article>)}</div></section>

          <section className="lower-grid"><div className="track-panel"><div className="panel-heading"><div><p className="eyebrow">RECENTLY PLAYED</p><h2>Keep the feeling going</h2></div><button className="icon-button"><MoreHorizontal /></button></div>{tracks.map((track, index) => <div className={`track-row ${index === 0 ? 'current' : ''}`} key={track.title}><span className="track-index">{index + 1}</span><img src={track.image} alt="" /><div className="track-name"><strong>{track.title}</strong><span>{track.artist}</span></div><span className="track-duration">{track.duration}</span><button className="heart-button" aria-label={`Like ${track.title}`}><Heart /></button></div>)}</div><div className="mood-card"><div className="mood-glow" /><p className="eyebrow">YOUR LISTENING WEATHER</p><h2>Late night<br /><em>daydreamer</em></h2><p className="mood-copy">Soft edges, bright thoughts, and a little room to wander.</p><div className="mood-bars"><span /><span /><span /><span /><span /></div><button className="mood-button">Open mood mix <span>→</span></button></div></section>
        </div>
      </section>

      <footer className="player-bar"><div className="player-track"><img src={nowPlaying.image} alt="" /><div><strong>{nowPlaying.title}</strong><span>{nowPlaying.artist}</span></div><button className={liked ? 'liked' : ''} onClick={() => setLiked(!liked)} aria-label="Like current track"><Heart /></button></div><div className="player-controls"><button><SkipBack /></button><button className="player-play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <span className="pause-symbol">Ⅱ</span> : <Play />}</button><button><SkipForward /></button></div><div className="player-progress"><span>1:24</span><div className="progress-line"><i /></div><span>3:21</span></div><div className="player-volume"><Volume2 /><div className="volume-line"><i /></div></div></footer>
    </main>
  )
}
