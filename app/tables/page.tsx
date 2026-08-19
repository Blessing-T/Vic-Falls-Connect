'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Table = {
  name: string;
  area: string;
  food: string[];
  price: string;
  description: string;
  order: string;
  accent: string;
};

const tables: Table[] = [
  { name: 'Chinotimba Sadza House', area: 'Chinotimba', food: ['Sadza', 'Zimbabwean'], price: '$', description: 'The neighbourhood plate: sadza with beef stew, covo, and bright tomato relish. Come hungry and eat like a local.', order: 'Order: sadza + beef stew', accent: 'table-card-rust' },
  { name: 'Mosi Grill & Braai', area: 'Town Centre', food: ['Braai', 'Grill'], price: '$$', description: 'A lively open grill for flame-kissed beef, chicken, sausage, and pap after a long day near the falls.', order: 'Order: mixed grill + chakalaka', accent: 'table-card-teal' },
  { name: 'Amai Rudo Kitchen', area: 'Mkhosana', food: ['Home cooking', 'Zimbabwean'], price: '$', description: 'A family-run kitchen where the menu changes with the market: pumpkin leaves, groundnut stew, and fresh maize.', order: 'Order: ask what is cooking', accent: 'table-card-gold' },
  { name: 'Zambezi Bream Stop', area: 'Town Centre', food: ['Fish', 'Grill'], price: '$$', description: 'Local bream, grilled simply and served with chips, relish, or sadza. A reliable stop for a taste of the river.', order: 'Order: grilled bream + relish', accent: 'table-card-night' },
  { name: "Mama Tandi's Corner", area: 'Mkhosana', food: ['Breakfast', 'Home cooking'], price: '$', description: 'Maputi, eggs, tea, and fresh vetkoek from a small morning counter that commuters and taxi drivers know well.', order: 'Order: vetkoek + tea', accent: 'table-card-rust' },
  { name: 'The Copper Pot', area: 'Chinotimba', food: ['Vegetarian', 'Zimbabwean'], price: '$$', description: 'A no-fuss family spot for beans, leafy greens, roasted butternut, and slow-cooked dishes made without shortcuts.', order: 'Order: beans + seasonal greens', accent: 'table-card-gold' },
];

const foodFilters = ['All', 'Sadza', 'Braai', 'Home cooking', 'Fish', 'Vegetarian'];
const areaFilters = ['All areas', 'Chinotimba', 'Mkhosana', 'Town Centre'];

export default function TablesPage() {
  const [search, setSearch] = useState('');
  const [food, setFood] = useState('All');
  const [area, setArea] = useState('All areas');
  const [price, setPrice] = useState('Any price');
  const filteredTables = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tables.filter((table) => {
      const matchesSearch = !query || [table.name, table.area, ...table.food].join(' ').toLowerCase().includes(query);
      return matchesSearch && (food === 'All' || table.food.includes(food)) && (area === 'All areas' || table.area === area) && (price === 'Any price' || table.price === price);
    });
  }, [area, food, price, search]);

  function clearFilters() {
    setSearch(''); setFood('All'); setArea('All areas'); setPrice('Any price');
  }

  return (
    <main className="tables-page">
      <nav className="site-nav kitchens-nav">
        <Link href="/" className="brandmark">Vic Falls <span>Connect</span></Link>
        <div className="nav-list"><Link href="/">Home</Link><a href="#listings">Tables</a><Link href="/kitchens">Kitchens</Link></div>
        <Link href="/#village" className="nav-book">Host with us</Link>
      </nav>
      <header className="tables-hero wrap">
        <div>
          <span className="kicker">The local table · Victoria Falls</span>
          <h1 className="display">Eat where<br /><em>locals eat.</em></h1>
          <p>Skip the buffet. We map the sadza houses, braai stands, and family kitchens that locals actually return to, verified in person.</p>
          <div className="tables-hero-meta mono"><span><b>06</b> verified tables</span><span><b>03</b> neighbourhoods</span><span><b>100%</b> local recommendations</span></div>
        </div>
        <div className="tables-map-mark" aria-hidden="true"><div className="map-line map-line-one" /><div className="map-line map-line-two" /><div className="map-pin">✦</div><span className="mono">VERIFIED<br />ON THE GROUND</span></div>
      </header>
      <section className="table-browser wrap" id="listings">
        <div className="browser-toolbar"><div><span className="kicker">The trusted local map</span><h2 className="display">Pull up a local seat</h2></div><span className="result-count mono">{filteredTables.length.toString().padStart(2, '0')} places</span></div>
        <div className="filter-panel">
          <label className="search-field"><span className="mono">Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try braai, Mkhosana..." /></label>
          <label className="filter-select"><span className="mono">Area</span><select value={area} onChange={(event) => setArea(event.target.value)}>{areaFilters.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="filter-select"><span className="mono">Price</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option>Any price</option><option>$</option><option>$$</option></select></label>
        </div>
        <div className="filter-chips" aria-label="Filter by food style">{foodFilters.map((filter) => <button key={filter} className={food === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setFood(filter)} type="button">{filter}</button>)}</div>
        {filteredTables.length > 0 ? <motion.div className="table-list" layout>{filteredTables.map((table, index) => (
          <motion.article className={`table-card ${table.accent}`} key={table.name} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }} whileHover={{ y: -7 }}>
            <div className="table-card-visual"><span className="mono table-card-index">0{index + 1} / VF</span><span className="table-card-symbol">✦</span><span className="mono table-card-area">{table.area}</span></div>
            <div className="table-card-content"><div className="table-card-topline"><span className="tag">{table.food[0]}</span><span className="mono price">{table.price}</span></div><h3>{table.name}</h3><p>{table.description}</p><div className="table-card-footer"><span className="mono table-order">{table.order}</span><a href={`mailto:hello@vicfallsconnect.com?subject=Local table: ${table.name}`} className="t-link">Get directions &amp; details →</a></div></div>
          </motion.article>
        ))}</motion.div> : <div className="empty-state"><span className="kicker">No table match yet</span><h3 className="display">Try another corner.</h3><p>Nothing matches those filters. Clear the search and find your next local plate.</p><button className="btn btn-solid" onClick={clearFilters} type="button">Clear filters</button></div>}
      </section>
      <section className="tables-note"><div className="wrap tables-note-grid"><div><span className="kicker">Why trust the map</span><h2 className="display">No cold listings.<br />No tourist traps.</h2></div><p>Our local team eats at every place before it appears here. We ask what to order, check the address, and listen to the people who live nearby. The result is a short list worth crossing town for.</p><Link href="/kitchens" className="btn btn-line">Learn to cook it</Link></div></section>
      <footer className="wrap kitchens-footer"><div className="brandmark">Vic Falls <span>Connect</span></div><span className="mono">The local table, fairly found.</span><div className="copyright-row"><span>&copy; 2026 Vic Falls Connect</span><span className="footer-credit">Created by <strong>3FT Print House</strong></span></div></footer>
    </main>
  );
}
