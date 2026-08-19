'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteNav from '@/components/SiteNav';

type Maker = {
  name: string;
  area: string;
  category: string;
  item: string;
  price: string;
  description: string;
  maker: string;
  accent: string;
};

const makers: Maker[] = [
  { name: 'Chinotimba Woodcarvers', area: 'Chinotimba', category: 'Woodcarving', item: 'Hand-carved soapstone animals', price: '$100 - $300', description: 'Sculptures shaped by hand from locally sourced stone, with every maker setting their own price.', maker: 'Maker co-op · Open daily', accent: 'market-card-rust' },
  { name: 'Mkhosana Batik Studio', area: 'Mkhosana', category: 'Batik', item: 'Hand-dyed wall cloths', price: '$100 - $300', description: 'Wax-resist batik in bold local patterns, made in a small family studio you can visit.', maker: 'Family studio · Mon–Sat', accent: 'market-card-teal' },
  { name: 'Mosi Bead Collective', area: 'Mkhosana', category: 'Beadwork', item: 'Seed-bead jewelry', price: '$0 - $100', description: 'Colorful necklaces, bracelets, and key rings made by women working together in the neighborhood.', maker: 'Women-led co-op · Daily', accent: 'market-card-gold' },
  { name: 'Zambezi Village Honey', area: 'Town Centre', category: 'Honey', item: 'Raw forest honey', price: '$0 - $100', description: 'Unfiltered honey from village beekeepers, bottled close to the source and sold without middlemen.', maker: 'Village co-op · Market days', accent: 'market-card-night' },
  { name: 'Tonga Basket Makers', area: 'Town Centre', category: 'Weaving', item: 'Ilala palm baskets', price: '$100 - $300', description: 'Useful, beautiful baskets woven from ilala palm by makers preserving a living local craft.', maker: 'Maker collective · Fri–Sun', accent: 'market-card-rust' },
  { name: 'Victoria Falls Print Room', area: 'Chinotimba', category: 'Prints', item: 'Local artist prints', price: '$0 - $100', description: 'Small-run prints by Zimbabwean artists celebrating the river, wildlife, and everyday town life.', maker: 'Artist-run · Tue–Sat', accent: 'market-card-gold' },
];

const categories = ['All', 'Woodcarving', 'Batik', 'Beadwork', 'Honey', 'Weaving', 'Prints'];
const areas = ['All areas', 'Chinotimba', 'Mkhosana', 'Town Centre'];

export default function MarketPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [area, setArea] = useState('All areas');
  const [price, setPrice] = useState('Any price');

  const filteredMakers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return makers.filter((maker) => {
      const matchesSearch = !query || [maker.name, maker.area, maker.category, maker.item].join(' ').toLowerCase().includes(query);
      return matchesSearch && (category === 'All' || maker.category === category) && (area === 'All areas' || maker.area === area) && (price === 'Any price' || maker.price === price);
    });
  }, [area, category, price, search]);

  function clearFilters() {
    setSearch(''); setCategory('All'); setArea('All areas'); setPrice('Any price');
  }

  return (
    <main className="market-page">
      <SiteNav links={[{ label: 'Home', href: '/' }, { label: 'Market', href: '#listings' }, { label: 'Kitchens', href: '/kitchens' }, { label: 'Tables', href: '/tables' }, { label: 'Village', href: '/village' }]} ctaLabel="Become a maker" ctaHref="/host" />

      <header className="market-hero wrap">
        <div>
          <span className="kicker">The local marketplace · Victoria Falls</span>
          <h1 className="display">Take a piece<br /><em>of the town.</em></h1>
          <p>Meet the makers behind the woodcarving, batik, beadwork, and honey of Victoria Falls. Buy directly, pay fairly, and take home something with a story.</p>
          <div className="market-hero-meta mono"><span><b>06</b> maker listings</span><span><b>03</b> local areas</span><span><b>0</b> middlemen</span></div>
        </div>
        <div className="market-mark" aria-hidden="true"><span className="market-mark-number">03</span><span className="market-mark-label mono">Made here<br />carried onward</span><div className="market-mark-sun" /></div>
      </header>

      <section className="market-browser wrap" id="listings">
        <div className="browser-toolbar"><div><span className="kicker">Direct from the maker</span><h2 className="display">The market shelf</h2></div><span className="result-count mono">{filteredMakers.length.toString().padStart(2, '0')} makers</span></div>
        <div className="filter-panel">
          <label className="search-field"><span className="mono">Search the shelf</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try honey, batik, Mkhosana..." /></label>
          <label className="filter-select"><span className="mono">Area</span><select value={area} onChange={(event) => setArea(event.target.value)}>{areas.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="filter-select"><span className="mono">Price range</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option>Any price</option><option>$0 - $100</option><option>$100 - $300</option><option>$300+</option></select></label>
        </div>
        <div className="filter-chips" aria-label="Filter by craft category">{categories.map((filter) => <button key={filter} className={category === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(filter)} type="button">{filter}</button>)}</div>
        {filteredMakers.length > 0 ? <motion.div className="market-list" layout>{filteredMakers.map((maker, index) => (
          <motion.article className={`market-card ${maker.accent}`} key={maker.name} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }} whileHover={{ y: -7 }}>
            <div className="market-card-visual"><span className="mono market-card-index">0{index + 1} / VF</span><span className="market-card-symbol">✦</span><span className="mono market-card-area">{maker.area}</span></div>
            <div className="market-card-content"><div className="market-card-topline"><span className="tag">{maker.category}</span><span className="mono price">{maker.price}</span></div><h3>{maker.name}</h3><p>{maker.description}</p><div className="market-item mono">Find: <b>{maker.item}</b></div><div className="market-card-footer"><span className="mono market-maker">{maker.maker}</span><a href={`mailto:hello@vicfallsconnect.com?subject=Market inquiry: ${maker.name}`} className="t-link">Ask about an item →</a></div></div>
          </motion.article>
        ))}</motion.div> : <div className="empty-state"><span className="kicker">No maker match yet</span><h3 className="display">Try another shelf.</h3><p>Nothing matches those filters. Clear them and browse the full local marketplace.</p><button className="btn btn-solid" onClick={clearFilters} type="button">Clear filters</button></div>}
      </section>

      <section className="market-note"><div className="wrap market-note-grid"><div><span className="kicker">Why fair trade matters</span><h2 className="display">The price goes<br />back home.</h2></div><p>Every listing is sourced through local makers and co-ops. There are no middlemen marking up the work, so more of what you spend stays with the person who made it.</p><Link href="/" className="btn btn-line">Back to the route</Link></div></section>
      <footer className="wrap kitchens-footer"><div className="brandmark">Vic Falls <span>Connect</span></div><span className="mono">Made here, fairly found.</span><div className="copyright-row"><span>&copy; 2026 Vic Falls Connect</span><span className="footer-credit">Created by <strong>3FT Print House</strong></span></div></footer>
    </main>
  );
}
