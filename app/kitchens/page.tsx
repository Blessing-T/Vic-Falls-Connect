'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteNav from '@/components/SiteNav';

type Kitchen = {
  name: string;
  area: string;
  cuisine: string[];
  price: string;
  priceValue: number;
  description: string;
  hours: string;
  accent: string;
};

const kitchens: Kitchen[] = [
  {
    name: 'Mama Moyo\'s Kitchen',
    area: 'Chinotimba',
    cuisine: ['Sadza', 'Zimbabwean'],
    price: '$0 - $100',
    priceValue: 2,
    description: 'Learn to make sadza from maize meal, then sit down to chicken stew and leafy greens with the Moyo family.',
    hours: 'Lesson · Tue–Sun',
    accent: 'kitchen-card-rust',
  },
  {
    name: 'Zambezi Bream Lesson',
    area: 'Town Centre',
    cuisine: ['Fish', 'Zimbabwean'],
    price: '$300+',
    priceValue: 3,
    description: 'Follow a host family to the market, prepare fresh bream, and learn the spice blend they use at home.',
    hours: 'Lesson · Wed–Sun',
    accent: 'kitchen-card-teal',
  },
  {
    name: 'Tadiwa\'s Fire Kitchen',
    area: 'Mkhosana',
    cuisine: ['Braai', 'Southern African'],
    price: '$100 - $300',
    priceValue: 2,
    description: 'A family-led cooking session around the fire: braai techniques, sadza cakes, and the stories behind the meal.',
    hours: 'Lesson · Thu–Mon',
    accent: 'kitchen-card-gold',
  },
  {
    name: 'The Relish Room',
    area: 'Chinotimba',
    cuisine: ['Vegetarian', 'Zimbabwean'],
    price: '$100 - $300',
    priceValue: 2,
    description: 'Spend an afternoon with a host family making pumpkin, groundnut stew, seasonal greens, and a treasured relish recipe.',
    hours: 'Lesson · Mon–Sat',
    accent: 'kitchen-card-night',
  },
  {
    name: 'Mbira & Maize Family',
    area: 'Mkhosana',
    cuisine: ['Sadza', 'Vegetarian'],
    price: '$100 - $300',
    priceValue: 2,
    description: 'Grind maize, shape your own sadza, and cook plant-based Zimbabwean plates before sharing them with your hosts.',
    hours: 'Lesson · Fri–Sun',
    accent: 'kitchen-card-rust',
  },
  {
    name: 'Dust & Honey Morning',
    area: 'Town Centre',
    cuisine: ['Breakfast', 'Southern African'],
    price: '$0 - $100',
    priceValue: 1,
    description: 'Join a family kitchen for breakfast and learn how local honey, maputi, eggs, and seasonal fruit come together.',
    hours: 'Lesson · Daily',
    accent: 'kitchen-card-gold',
  },
];

const cuisineFilters = ['All', 'Zimbabwean', 'Sadza', 'Braai', 'Vegetarian', 'Fish'];
const areaFilters = ['All areas', 'Chinotimba', 'Mkhosana', 'Town Centre'];

export default function KitchensPage() {
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [area, setArea] = useState('All areas');
  const [price, setPrice] = useState('Any price');

  const filteredKitchens = useMemo(() => {
    const query = search.trim().toLowerCase();

    return kitchens.filter((kitchen) => {
      const matchesSearch = !query || [kitchen.name, kitchen.area, ...kitchen.cuisine].join(' ').toLowerCase().includes(query);
      const matchesCuisine = cuisine === 'All' || kitchen.cuisine.includes(cuisine);
      const matchesArea = area === 'All areas' || kitchen.area === area;
      const matchesPrice = price === 'Any price' || kitchen.price === price;
      return matchesSearch && matchesCuisine && matchesArea && matchesPrice;
    });
  }, [area, cuisine, price, search]);

  function clearFilters() {
    setSearch('');
    setCuisine('All');
    setArea('All areas');
    setPrice('Any price');
  }

  return (
    <main className="kitchens-page">
      <SiteNav links={[{ label: 'Home', href: '/' }, { label: 'Kitchens', href: '#listings' }, { label: 'Tables', href: '/tables' }, { label: 'Market', href: '/market' }, { label: 'Village', href: '/village' }]} ctaLabel="Host with us" ctaHref="/host" />

      <header className="kitchens-hero wrap">
        <div className="kitchens-hero-copy">
          <span className="kicker">Local food route · Victoria Falls</span>
          <h1 className="display">Pull up a chair.</h1>
          <p>Step into a Zimbabwean home kitchen and learn the dishes families in Victoria Falls have cooked for generations.</p>
          <div className="kitchens-hero-meta mono">
            <span><b>06</b> host families</span>
            <span><b>03</b> neighbourhoods</span>
            <span><b>01</b> shared table</span>
          </div>
        </div>
        <div className="kitchens-hero-mark" aria-hidden="true">
          <span className="hero-mark-number">01</span>
          <span className="hero-mark-label mono">Eat local<br />stay curious</span>
          <div className="hero-mark-sun" />
        </div>
      </header>

      <section className="kitchen-browser wrap" id="listings">
        <div className="browser-toolbar">
          <div>
            <span className="kicker">Meet the host families</span>
            <h2 className="display">Cook it together</h2>
          </div>
          <span className="result-count mono">{filteredKitchens.length.toString().padStart(2, '0')} results</span>
        </div>

        <div className="filter-panel">
          <label className="search-field">
            <span className="mono">Search</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try sadza, Chinotimba..." />
          </label>
          <label className="filter-select">
            <span className="mono">Area</span>
            <select value={area} onChange={(event) => setArea(event.target.value)}>
              {areaFilters.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="filter-select">
            <span className="mono">Price</span>
            <select value={price} onChange={(event) => setPrice(event.target.value)}>
              <option>Any price</option>
              <option>$0 - $100</option>
              <option>$100 - $300</option>
              <option>$300+</option>
            </select>
          </label>
        </div>

        <div className="filter-chips" aria-label="Filter by cuisine">
          {cuisineFilters.map((filter) => (
            <button key={filter} className={cuisine === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setCuisine(filter)} type="button">
              {filter}
            </button>
          ))}
        </div>

        {filteredKitchens.length > 0 ? (
          <motion.div className="kitchen-list" layout>
            {filteredKitchens.map((kitchen, index) => (
              <motion.article className={`kitchen-card ${kitchen.accent}`} key={kitchen.name} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.05 }} whileHover={{ y: -7 }}>
                <div className="kitchen-card-visual">
                  <span className="mono kitchen-card-index">0{index + 1} / VF</span>
                  <span className="kitchen-card-symbol">✦</span>
                  <span className="mono kitchen-card-area">{kitchen.area}</span>
                </div>
                <div className="kitchen-card-content">
                  <div className="kitchen-card-topline">
                    <span className="tag">{kitchen.cuisine[0]}</span>
                    <span className="mono price">{kitchen.price}</span>
                  </div>
                  <h3>{kitchen.name}</h3>
                  <p>{kitchen.description}</p>
                  <div className="kitchen-card-footer">
                    <span className="mono kitchen-hours">{kitchen.hours}</span>
                    <motion.a href={`mailto:hello@vicfallsconnect.com?subject=Cooking lesson with ${kitchen.name}`} className="t-link" whileHover={{ x: 4 }}>Request this lesson →</motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="empty-state">
            <span className="kicker">No host match yet</span>
            <h3 className="display">Try a wider route.</h3>
            <p>There are no host families matching those filters. Clear the search and find a kitchen to learn from.</p>
            <button className="btn btn-solid" onClick={clearFilters} type="button">Clear filters</button>
          </div>
        )}
      </section>

      <section className="kitchens-note" id="how-it-works">
        <div className="wrap kitchens-note-grid">
          <div>
            <span className="kicker">How a kitchen lesson works</span>
            <h2 className="display">Come as a guest.<br />Leave with a recipe.</h2>
          </div>
          <p>Every host family is visited by our local team. We meet the cooks, learn what they teach, and keep each lesson small enough for real conversation. Send a lesson request and we will connect you with the kitchen.</p>
          <Link href="/" className="btn btn-line">Back to the route</Link>
        </div>
      </section>

      <footer className="wrap kitchens-footer">
        <div className="brandmark">Vic Falls <span>Connect</span></div>
        <span className="mono">Local food, fairly found.</span>
        <div className="copyright-row">
          <span>&copy; 2026 Vic Falls Connect</span>
          <span className="footer-credit">Created by <strong>3FT Print House</strong></span>
        </div>
      </footer>
    </main>
  );
}
