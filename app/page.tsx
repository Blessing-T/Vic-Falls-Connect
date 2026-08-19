'use client';

import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MotionController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.reveal', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('.hero-sub', { opacity: 0, y: 12, duration: 0.7, delay: 0.45, ease: 'power2.out' });
      gsap.from('.hero-copy', { opacity: 0, x: -28, duration: 0.9, delay: 0.55, ease: 'power3.out' });
      gsap.from('.hero-art', { opacity: 0, x: 34, rotate: 2, duration: 1, delay: 0.4, ease: 'power3.out' });

      gsap.utils.toArray<HTMLElement>('.reveal:not(.hero-copy)').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 82%', once: true },
          }
        );
      });

      gsap.to('.mist-drift', { y: -8, scale: 1.03, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-art', { y: -10, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    return () => context.revert();
  }, []);

  return null;
}

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.form className="cta-form" onSubmit={handleSubmit} whileTap={{ scale: 0.98 }}>
      <motion.input
        type="email"
        placeholder="you@email.com"
        required
        whileFocus={{ borderColor: '#BE8A31', scale: 1.02 }}
      />
      <motion.button className="btn btn-line" type="submit" whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
        {submitted ? 'You are on the list' : 'Notify me'}
      </motion.button>
    </motion.form>
  );
}

export default function Home() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="paperNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <svg className="grain" aria-hidden="true">
        <rect width="100%" height="100%" filter="url(#paperNoise)" />
      </svg>

<nav className="site-nav">
  <div className="brandmark">Vic Falls <span>Connect</span></div>
  <div className="nav-list">
    <a href="/kitchens">Kitchens</a>
    <a href="/tables">Tables</a>
    <a href="/market">Market</a>
    <a href="/village">Village</a>
  </div>
  <a href="#" className="nav-book">Host with us</a>
</nav>

<header className="hero wrap">
  <div className="hero-top">
    <div className="hero-title-block">
      <div className="hero-title display">
        <span className="line"><span>Victoria</span></span>
        <span className="line"><span>Falls</span></span>
      </div>
      <div className="hero-sub">Mosi-oa-Tunya · the smoke that thunders · Zimbabwe</div>
    </div>
    <div className="stamp">
      EST. LOCAL
      <br />
      <b>ROUTES</b>
      <span>17.9243&deg;S</span>
      <br />
      <span>25.8572&deg;E</span>
    </div>
  </div>

  <div className="hero-body">
    <div className="hero-copy">
      <p>Most visitors see the gorge, the bridge, the bungee jump — then eat at the hotel and leave. Vic Falls Connect opens the other side of town: home kitchens, family-run eateries, maker stalls, and the community events that make this place home for the people who live in it.</p>
      <div className="hero-actions">
        <motion.a href="/kitchens" className="btn btn-solid" whileHover={{ y: -4, x: -2 }} whileTap={{ scale: 0.96 }}>
          Find an experience
        </motion.a>
        <motion.a href="#" className="btn btn-line" whileHover={{ y: -4, x: -2 }} whileTap={{ scale: 0.96 }}>
          Become a local host
        </motion.a>
      </div>
    </div>
    <div className="hero-art">
      <svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="halftone" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.3" fill="#1C2B27" opacity="0.28"/>
          </pattern>
        </defs>
        {/* gorge terraces */}
        <polygon points="0,420 0,300 90,300 90,340 190,340 190,280 300,280 300,330 420,330 420,260 520,260 520,420" fill="#1C2B27"/>
        <polygon points="0,420 0,340 70,340 70,370 170,370 170,320 280,320 280,360 400,360 400,300 520,300 520,420" fill="#3E4E48" opacity="0.55"/>
        {/* falling water streaks */}
        <g stroke="#EBDFC2" strokeWidth="3" strokeLinecap="round" opacity="0.9">
          <line x1="120" y1="40" x2="112" y2="270"/>
          <line x1="150" y1="30" x2="146" y2="270"/>
          <line x1="180" y1="45" x2="176" y2="260"/>
          <line x1="215" y1="35" x2="210" y2="255"/>
          <line x1="250" y1="50" x2="248" y2="250"/>
          <line x1="285" y1="30" x2="280" y2="240"/>
        </g>
        {/* mist */}
        <g className="mist-drift">
          <ellipse cx="200" cy="90" rx="150" ry="60" fill="url(#halftone)" opacity="0.5"/>
          <ellipse cx="230" cy="55" rx="110" ry="42" fill="url(#halftone)" opacity="0.4"/>
        </g>
        {/* birds */}
        <path className="bird b1" d="M40 60 L48 52 L56 60" stroke="#1C2B27" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path className="bird b2" d="M75 80 L83 72 L91 80" stroke="#1C2B27" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  </div>

  <svg className="torn" viewBox="0 0 1200 34" preserveAspectRatio="none">
    <polygon points="0,34 40,6 90,20 140,2 190,16 240,4 290,22 340,8 390,18 440,2 490,20 540,6 590,16 640,4 690,22 740,8 790,18 840,2 890,20 940,6 990,16 1040,4 1090,22 1140,8 1200,18 1200,34" fill="var(--night)"/>
  </svg>
</header>

<section className="band band-night">
  <div className="wrap intro-grid reveal">
    <div className="side">
      <span className="kicker">Why we exist</span>
      <p style={{marginTop: 14}}>The falls bring you here. The town keeps you. This is a route through it: cooked meals, honest tables, direct trade, and a few hours of your time given back.</p>
    </div>
    <div>
      <p className="pull">&quot;You can watch the falls for an hour. Or you can sit in someone&apos;s kitchen and taste what an entire town has been cooking for generations.&quot;</p>
      <div className="coord mono">— Field note, Vic Falls Connect</div>
    </div>
  </div>
</section>

<svg className="torn" viewBox="0 0 1200 34" preserveAspectRatio="none" style={{marginTop: 0}}>
  <polygon points="0,0 40,26 90,10 140,30 190,14 240,28 290,8 340,24 390,12 440,30 490,10 540,26 590,14 640,28 690,8 740,24 790,12 840,30 890,10 940,26 990,14 1040,28 1090,8 1140,24 1200,14 1200,0" fill="var(--paper)"/>
</svg>

<section className="band">
  <div className="wrap">
    <div className="ticket-head reveal">
      <span className="kicker">Four ways in</span>
      <h2 className="display">Everything local, one town</h2>
    </div>

    <div className="ticket-grid reveal">
      <motion.div className="ticket" id="kitchens" whileHover={{ y: -8, rotate: 0, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <div className="stub">
          <div className="t-icon"><svg viewBox="0 0 24 24"><path d="M4 12h16M4 12a8 8 0 0 0 16 0M4 12a8 8 0 0 1 16 0M9 4c-.5 1.5-.5 2.5 0 4M15 4c-.5 1.5-.5 2.5 0 4"/></svg></div>
          <div className="t-serial">No. VF—0412<br />Admit small group</div>
        </div>
        <div className="body">
          <span className="tag">Host Family Lessons</span>
          <h3>The Kitchens</h3>
          <p>Grind maize into sadza by hand, spice bream fresh off the Zambezi, or learn a family relish recipe — taught in a host&apos;s own home.</p>
          <a href="/kitchens" className="t-link">Meet the host families →</a>
        </div>
      </motion.div>

      <motion.div className="ticket" id="tables" whileHover={{ y: -8, rotate: 0, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <div className="stub">
          <div className="t-icon"><svg viewBox="0 0 24 24"><path d="M7 3v6a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3M9 11v10M17 3c-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4v9"/></svg></div>
          <div className="t-serial">No. VF—0713<br />Table for two+</div>
        </div>
        <div className="body">
          <span className="tag">Authentic Restaurants</span>
          <h3>The Tables</h3>
          <p>Skip the buffet. We map the sadza houses, braai stands and family kitchens locals actually eat at, verified in person.</p>
          <a href="/tables" className="t-link">See the map →</a>
        </div>
      </motion.div>

      <motion.div className="ticket" id="market" whileHover={{ y: -8, rotate: 0, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <div className="stub">
          <div className="t-icon"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 8ZM8 8V6a4 4 0 0 1 8 0v2"/></svg></div>
          <div className="t-serial">No. VF—0955<br />Direct from maker</div>
        </div>
        <div className="body">
          <span className="tag">Local Marketplace</span>
          <h3>The Market</h3>
          <p>Woodcarving from Chinotimba, batik and beadwork from Mkhosana, honey from village co-ops — priced fairly, no middlemen.</p>
          <a href="/market" className="t-link">Shop the market →</a>
        </div>
      </motion.div>

      <motion.div className="ticket" id="village" whileHover={{ y: -8, rotate: 0, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <div className="stub">
          <div className="t-icon"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a5 5 0 0 1 10 0M12 21s7-4.5 7-10a5 5 0 0 0-10 0"/></svg></div>
          <div className="t-serial">No. VF—1121<br />Open to all</div>
        </div>
        <div className="body">
          <span className="tag">Events &amp; Volunteering</span>
          <h3>The Village</h3>
          <p>A Saturday football match, a drumming circle, a tree-planting morning, a school reading session — see what&apos;s on this week.</p>
          <a href="/village" className="t-link">See what&apos;s on →</a>
        </div>
      </motion.div>
    </div>
  </div>
</section>

<svg className="torn" viewBox="0 0 1200 34" preserveAspectRatio="none">
  <polygon points="0,34 40,6 90,20 140,2 190,16 240,4 290,22 340,8 390,18 440,2 490,20 540,6 590,16 640,4 690,22 740,8 790,18 840,2 890,20 940,6 990,16 1040,4 1090,22 1140,8 1200,18 1200,34" fill="var(--night)"/>
</svg>

<section className="band band-night">
  <div className="wrap why-grid reveal">
    <div className="why-item">
      <div className="why-mark">✦</div>
      <h3>Fair</h3>
      <p className="ink-soft">Hosts set their own prices. No middlemen marking things up — what a cook or vendor lists is what they take home.</p>
    </div>
    <div className="why-item">
      <div className="why-mark">✦</div>
      <h3>Verified</h3>
      <p className="ink-soft">Every listing visited in person by our local team before it goes live. No cold listings, no surprises.</p>
    </div>
    <div className="why-item">
      <div className="why-mark">✦</div>
      <h3>Small</h3>
      <p className="ink-soft">Most experiences run under eight people, so you actually get to talk to the person hosting you.</p>
    </div>
  </div>
</section>

<svg className="torn" viewBox="0 0 1200 34" preserveAspectRatio="none" style={{marginTop: 0}}>
  <polygon points="0,0 40,26 90,10 140,30 190,14 240,28 290,8 340,24 390,12 440,30 490,10 540,26 590,14 640,28 690,8 740,24 790,12 840,30 890,10 940,26 990,14 1040,28 1090,8 1140,24 1200,14 1200,0" fill="var(--paper)"/>
</svg>

<section className="band quote-band">
  <div className="wrap reveal">
    <svg width="90" height="20" viewBox="0 0 90 20"><path d="M2 14 Q 20 2, 45 12 T 88 8" stroke="var(--rust)" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
    <blockquote>&quot;Tourists used to walk past my stall on the way to the falls. Now they come looking for it.&quot;</blockquote>
    <p className="quote-attr">— Woodcarver, Chinotimba Market</p>
  </div>
</section>

<svg className="torn" viewBox="0 0 1200 34" preserveAspectRatio="none">
  <polygon points="0,34 40,6 90,20 140,2 190,16 240,4 290,22 340,8 390,18 440,2 490,20 540,6 590,16 640,4 690,22 740,8 790,18 840,2 890,20 940,6 990,16 1040,4 1090,22 1140,8 1200,18 1200,34" fill="var(--night)"/>
</svg>

<section className="band-night">
  <div className="wrap cta-band reveal">
    <h2>Come thirsty.<br />Leave <em>connected.</em></h2>
    <p>Get new hosts, monthly market days and volunteer programs in your inbox before you land.</p>
    <NewsletterForm />
    <p className="cta-note">Or start browsing now — no account needed.</p>
  </div>

  <footer className="wrap">
    <div className="footer-grid">
      <div>
        <div className="brandmark">Vic Falls <span>Connect</span></div>
        <p className="footer-meta">Built with hosts across Chinotimba, Mkhosana &amp; the town centre</p>
      </div>
      <div className="footer-links">
        <a href="/kitchens">Kitchens</a>
        <a href="/tables">Tables</a>
        <a href="/market">Market</a>
        <a href="/village">Village</a>
        <a href="#">Become a host</a>
        <a href="#">Contact</a>
      </div>
    </div>
    <div className="copyright-row">
      <span>&copy; 2026 Vic Falls Connect. All rights reserved.</span>
      <span className="footer-credit">Created by <strong>3FT Print House</strong></span>
    </div>
  </footer>
</section>

<MotionController />
    </>
  );
}
