'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteNav from '@/components/SiteNav';

type Table = {
  name: string;
  area: string;
  food: string[];
  price: string;
  description: string;
  order: string;
  accent: string;
  mapX: number;
  mapY: number;
};

const tables: Table[] = [
  { name: 'Chinotimba Sadza House', area: 'Chinotimba', food: ['Sadza', 'Zimbabwean'], price: '$0 - $100', description: 'The neighbourhood plate: sadza with beef stew, covo, and bright tomato relish. Come hungry and eat like a local.', order: 'Order: sadza + beef stew', accent: 'table-card-rust', mapX: 22, mapY: 34 },
  { name: 'Mosi Grill & Braai', area: 'Town Centre', food: ['Braai', 'Grill'], price: '$100 - $300', description: 'A lively open grill for flame-kissed beef, chicken, sausage, and pap after a long day near the falls.', order: 'Order: mixed grill + chakalaka', accent: 'table-card-teal', mapX: 62, mapY: 47 },
  { name: 'Amai Rudo Kitchen', area: 'Mkhosana', food: ['Home cooking', 'Zimbabwean'], price: '$0 - $100', description: 'A family-run kitchen where the menu changes with the market: pumpkin leaves, groundnut stew, and fresh maize.', order: 'Order: ask what is cooking', accent: 'table-card-gold', mapX: 42, mapY: 72 },
  { name: 'Zambezi Bream Stop', area: 'Town Centre', food: ['Fish', 'Grill'], price: '$100 - $300', description: 'Local bream, grilled simply and served with chips, relish, or sadza. A reliable stop for a taste of the river.', order: 'Order: grilled bream + relish', accent: 'table-card-night', mapX: 76, mapY: 28 },
  { name: "Mama Tandi's Corner", area: 'Mkhosana', food: ['Breakfast', 'Home cooking'], price: '$0 - $100', description: 'Maputi, eggs, tea, and fresh vetkoek from a small morning counter that commuters and taxi drivers know well.', order: 'Order: vetkoek + tea', accent: 'table-card-rust', mapX: 34, mapY: 57 },
  { name: 'The Copper Pot', area: 'Chinotimba', food: ['Vegetarian', 'Zimbabwean'], price: '$100 - $300', description: 'A no-fuss family spot for beans, leafy greens, roasted butternut, and slow-cooked dishes made without shortcuts.', order: 'Order: beans + seasonal greens', accent: 'table-card-gold', mapX: 16, mapY: 62 },
];

const foodFilters = ['All', 'Sadza', 'Braai', 'Home cooking', 'Fish', 'Vegetarian'];
const areaFilters = ['All areas', 'Chinotimba', 'Mkhosana', 'Town Centre'];

export default function TablesPage() {
  const [search, setSearch] = useState('');
  const [food, setFood] = useState('All');
  const [area, setArea] = useState('All areas');
  const [price, setPrice] = useState('Any price');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
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
      <SiteNav links={[{ label: 'Home', href: '/' }, { label: 'Tables', href: '#listings' }, { label: 'Kitchens', href: '/kitchens' }, { label: 'Market', href: '/market' }, { label: 'Village', href: '/village' }]} ctaLabel="Host with us" ctaHref="/host" />
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
          <label className="filter-select"><span className="mono">Price range</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option>Any price</option><option>$0 - $100</option><option>$100 - $300</option><option>$300+</option></select></label>
        </div>
        <div className="filter-chips" aria-label="Filter by food style">{foodFilters.map((filter) => <button key={filter} className={food === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setFood(filter)} type="button">{filter}</button>)}</div>
        {filteredTables.length > 0 ? <>
          <div className="local-map" aria-label="Map of verified local tables">
            <div className="map-grid-lines" />
            <svg className="map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M8 78 C20 63, 20 42, 34 53 S52 80, 65 45 S78 20, 94 12" /><path d="M5 25 C24 31, 33 20, 48 37 S70 64, 94 82" /></svg>
            <span className="map-area-label map-label-chinotimba mono">CHINOTIMBA</span><span className="map-area-label map-label-mkhosana mono">MKHOSANA</span><span className="map-area-label map-label-centre mono">TOWN CENTRE</span><span className="map-river mono">ZAMBEZI RIVER</span>
            {filteredTables.map((table, index) => <button key={table.name} type="button" className={selectedTable === table.name ? 'map-pin active' : 'map-pin'} style={{ left: `${table.mapX}%`, top: `${table.mapY}%` }} onClick={() => setSelectedTable(table.name)} aria-label={`Show ${table.name}`}><span>{index + 1}</span></button>)}
            <div className="map-legend mono"><span><i className="legend-pin" /> Verified local place</span><span>VF / LOCAL ROUTE</span></div>
          </div>
          <motion.div className="table-list" layout>{filteredTables.map((table, index) => (
          <motion.article className={selectedTable === table.name ? `table-card ${table.accent} is-selected` : `table-card ${table.accent}`} id={`place-${index + 1}`} key={table.name} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }} whileHover={{ y: -7 }}>
            <div className="table-card-visual"><span className="mono table-card-index">0{index + 1} / VF</span><span className="table-card-symbol">✦</span><span className="mono table-card-area">{table.area}</span></div>
            <div className="table-card-content"><div className="table-card-topline"><span className="tag">{table.food[0]}</span><span className="mono price">{table.price}</span></div><h3>{table.name}</h3><p>{table.description}</p><div className="table-card-footer"><span className="mono table-order">{table.order}</span><a href={`mailto:hello@vicfallsconnect.com?subject=Local table: ${table.name}`} className="t-link">Get directions &amp; details →</a></div></div>
          </motion.article>
        ))}</motion.div></> : <div className="empty-state"><span className="kicker">No table match yet</span><h3 className="display">Try another corner.</h3><p>Nothing matches those filters. Clear the search and find your next local plate.</p><button className="btn btn-solid" onClick={clearFilters} type="button">Clear filters</button></div>}
      </section>
      <section className="tables-note"><div className="wrap tables-note-grid"><div><span className="kicker">Why trust the map</span><h2 className="display">No cold listings.<br />No tourist traps.</h2></div><p>Our local team eats at every place before it appears here. We ask what to order, check the address, and listen to the people who live nearby. The result is a short list worth crossing town for.</p><Link href="/kitchens" className="btn btn-line">Learn to cook it</Link></div></section>
      <footer className="wrap kitchens-footer"><div className="brandmark">Vic Falls <span>Connect</span></div><span className="mono">The local table, fairly found.</span><div className="copyright-row"><span>&copy; 2026 Vic Falls Connect</span><span className="footer-credit">Created by <strong>3FT Print House</strong></span></div></footer>
    </main>
  );
}
