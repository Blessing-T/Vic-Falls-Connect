'use client';

import { useState } from 'react';
import Link from 'next/link';

type SiteNavProps = {
  links: Array<{ label: string; href: string }>;
  ctaLabel: string;
  ctaHref: string;
};

export default function SiteNav({ links, ctaLabel, ctaHref }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link href="/" className="brandmark" onClick={() => setOpen(false)}>Vic Falls <span>Connect</span></Link>
      <div className={open ? 'nav-list mobile-open' : 'nav-list'}>
        {links.map((link) => <Link href={link.href} key={link.label} onClick={() => setOpen(false)}>{link.label}</Link>)}
      </div>
      <Link href={ctaHref} className="nav-book" onClick={() => setOpen(false)}>{ctaLabel}</Link>
      <button className={open ? 'menu-toggle is-open' : 'menu-toggle'} type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((current) => !current)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
