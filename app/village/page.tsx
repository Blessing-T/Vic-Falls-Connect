'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SiteNav from '@/components/SiteNav';

type EventItem = { date: string; day: string; title: string; type: string; place: string; description: string; action: string; accent: string };

const events: EventItem[] = [
  { date: '22', day: 'Sat · Jun', title: 'Chinotimba Community Football', type: 'Community', place: 'Chinotimba grounds', description: 'A Saturday match, local teams, and an afternoon of cheering from the touchline.', action: 'Join the match day', accent: 'village-card-rust' },
  { date: '24', day: 'Mon · Jun', title: 'Read Together at Mosi Primary', type: 'Volunteer', place: 'Mosi Primary School', description: 'Share a story, listen to young readers, and help make the school library feel alive.', action: 'Volunteer for reading', accent: 'village-card-teal' },
  { date: '26', day: 'Wed · Jun', title: 'Drums Under the Baobab', type: 'Culture', place: 'Mkhosana arts yard', description: 'An open drumming circle led by local musicians. All rhythms and experience levels welcome.', action: 'Join the circle', accent: 'village-card-gold' },
  { date: '29', day: 'Sat · Jun', title: 'Zambezi Edge Tree Morning', type: 'Volunteer', place: 'Zambezi river route', description: 'Plant indigenous trees, learn why the river edge matters, and spend a useful morning outdoors.', action: 'Join the planting', accent: 'village-card-night' },
  { date: '03', day: 'Wed · Jul', title: 'Women Makers Market Day', type: 'Market', place: 'Mkhosana community hall', description: 'Meet local makers, browse fairly priced work, and support a women-led market collective.', action: 'Visit the market', accent: 'village-card-rust' },
  { date: '06', day: 'Sat · Jul', title: 'Community Kitchen Morning', type: 'Volunteer', place: 'Chinotimba family centre', description: 'Help prepare a shared meal and learn the recipes that bring neighbors around one table.', action: 'Join the kitchen', accent: 'village-card-teal' },
];

const eventFilters = ['All', 'Volunteer', 'Community', 'Culture', 'Market'];

export default function VillagePage() {
  const [filter, setFilter] = useState('All');
  const [joined, setJoined] = useState<string[]>([]);
  const visibleEvents = useMemo(() => filter === 'All' ? events : events.filter((event) => event.type === filter), [filter]);

  function toggleJoined(title: string) {
    setJoined((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  }

  return (
    <main className="village-page">
      <SiteNav links={[{ label: 'Home', href: '/' }, { label: 'Calendar', href: '#calendar' }, { label: 'Volunteer', href: '#volunteer' }, { label: 'Market', href: '/market' }]} ctaLabel="Explore kitchens" ctaHref="/kitchens" />

      <header className="village-hero wrap">
        <div>
          <span className="kicker">The community calendar · Victoria Falls</span>
          <h1 className="display">Show up<br /><em>for the village.</em></h1>
          <p>A football match, a drumming circle, a tree-planting morning, a school reading session. See what is happening this week and find a useful way to join in.</p>
          <div className="village-hero-meta mono"><span><b>06</b> events ahead</span><span><b>03</b> ways to join</span><span><b>01</b> connected town</span></div>
        </div>
        <div className="village-calendar-mark" aria-hidden="true"><span className="calendar-mark-month mono">JUN / JUL</span><span className="calendar-mark-number">26</span><span className="calendar-mark-label mono">Put something<br />back</span></div>
      </header>

      <section className="village-calendar wrap" id="calendar">
        <div className="browser-toolbar"><div><span className="kicker">This week and next</span><h2 className="display">What is on</h2></div><span className="result-count mono">{visibleEvents.length.toString().padStart(2, '0')} events</span></div>
        <div className="filter-chips village-filters" aria-label="Filter community events">{eventFilters.map((option) => <button key={option} className={filter === option ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(option)} type="button">{option}</button>)}</div>
        <div className="event-list">{visibleEvents.map((event, index) => (
          <motion.article className={`event-card ${event.accent}`} key={event.title} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: index * .05 }} whileHover={{ y: -6 }}>
            <div className="event-date"><span className="mono">{event.day}</span><strong className="display">{event.date}</strong></div>
            <div className="event-content"><div className="event-topline"><span className="tag">{event.type}</span><span className="mono event-place">{event.place}</span></div><h3>{event.title}</h3><p>{event.description}</p><div className="event-footer"><span className="mono event-status">{joined.includes(event.title) ? 'You are joining' : 'Open to join'}</span><button className="t-link event-action" onClick={() => toggleJoined(event.title)} type="button">{joined.includes(event.title) ? 'You are in ✓' : `${event.action} →`}</button></div></div>
          </motion.article>
        ))}</div>
      </section>

      <section className="volunteer-section" id="volunteer"><div className="wrap volunteer-grid"><div><span className="kicker">Volunteer with a local partner</span><h2 className="display">Your time can travel further.</h2><p>Choose a program, tell us when you are in Victoria Falls, and we will connect you with the right local team.</p></div><div className="volunteer-org"><span className="mono volunteer-org-label">Featured organization</span><h3>Afro Edge Volunteer and Tours</h3><p>A local volunteering organization connecting visitors with community, education, conservation, and cultural programs around Victoria Falls.</p><a href="mailto:hello@vicfallsconnect.com?subject=Afro Edge Volunteer and Tours" className="btn btn-line">Ask about programs</a></div></div></section>

      <section className="village-join wrap"><div><span className="kicker">Three ways to join</span><h2 className="display">Find your place in the week.</h2></div><div className="join-options"><div><strong className="display">01</strong><h3>Give time</h3><p>Join a school, conservation, or community program.</p></div><div><strong className="display">02</strong><h3>Bring energy</h3><p>Turn up for football, drums, and local events.</p></div><div><strong className="display">03</strong><h3>Share fairly</h3><p>Support makers, hosts, and people doing the work.</p></div></div></section>

      <footer className="wrap kitchens-footer"><div className="brandmark">Vic Falls <span>Connect</span></div><span className="mono">Show up. Stay connected.</span><div className="copyright-row"><span>&copy; 2026 Vic Falls Connect</span><span className="footer-credit">Created by <strong>3FT Print House</strong></span></div></footer>
    </main>
  );
}
