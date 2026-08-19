'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteNav from '@/components/SiteNav';

const roles = [
  { value: 'kitchen', title: 'Kitchen owner', description: 'Teach visitors how to make Zimbabwean dishes in your home.' },
  { value: 'woodcarver', title: 'Woodcarver or maker', description: 'Share your craft, products, and story with respectful visitors.' },
  { value: 'market-seller', title: 'Market seller', description: 'List your stall, local goods, and regular market days.' },
  { value: 'restaurant', title: 'Restaurant or food spot', description: 'Help travelers find your locally loved menu and table.' },
  { value: 'organisation', title: 'Community organisation', description: 'Share events, volunteer programs, or community work.' },
];

export default function HostPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="host-page">
      <SiteNav links={[{ label: 'Home', href: '/' }, { label: 'Kitchens', href: '/kitchens' }, { label: 'Market', href: '/market' }, { label: 'Village', href: '/village' }]} ctaLabel="Explore the route" ctaHref="/" />
      <header className="host-hero wrap">
        <div><span className="kicker">Join the local route</span><h1 className="display">Your work<br /><em>belongs here.</em></h1><p>Tell us what you do in Victoria Falls. We verify every submission with care, then place it on the right page so visitors can find and support you.</p></div>
        <div className="host-mark" aria-hidden="true"><span className="host-mark-number">04</span><span className="mono">LOCAL VOICES<br />CAREFULLY FOUND</span></div>
      </header>
      <section className="host-section wrap">
        <div className="host-section-intro"><span className="kicker">Choose your route</span><h2 className="display">What do you offer?</h2><p>One form is all it takes to start. Our team will contact you for verification before anything is published.</p></div>
        {submitted ? (
          <motion.div className="host-success" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><span className="kicker">Application received</span><h2 className="display">Thank you for opening the door.</h2><p>Our local team will review your details and contact you for verification. Once approved, your listing will appear in the right Vic Falls Connect section.</p><Link href="/" className="btn btn-solid">Return to the route</Link></motion.div>
        ) : (
          <form className="host-form" onSubmit={handleSubmit}>
            <fieldset className="role-grid"><legend className="mono">I am a...</legend>{roles.map((role) => <label className="role-option" key={role.value}><input type="radio" name="role" value={role.value} required /><span><strong>{role.title}</strong><small>{role.description}</small></span></label>)}</fieldset>
            <div className="host-form-grid"><label><span className="mono">Your name</span><input name="name" required placeholder="Full name" /></label><label><span className="mono">Phone or WhatsApp</span><input name="phone" required placeholder="+263 ..." /></label><label><span className="mono">Email address</span><input name="email" type="email" required placeholder="you@example.com" /></label><label><span className="mono">Area</span><select name="area" required defaultValue=""><option value="" disabled>Select area</option><option>Chinotimba</option><option>Mkhosana</option><option>Town Centre</option><option>Wider Victoria Falls</option></select></label></div>
            <label className="host-full-field"><span className="mono">Tell us about your work</span><textarea name="details" required rows={5} placeholder="What would visitors experience, buy, learn, or join?" /></label>
            <label className="host-check"><input type="checkbox" required /> <span>I agree that Vic Falls Connect may contact me to verify this submission.</span></label>
            <motion.button className="btn btn-solid" type="submit" whileHover={{ y: -3 }} whileTap={{ scale: .98 }}>Send for verification →</motion.button>
          </form>
        )}
      </section>
      <section className="host-process"><div className="wrap host-process-grid"><div><span className="kicker">What happens next</span><h2 className="display">Verified before visible.</h2></div><div className="process-step"><b className="display">01</b><h3>We review</h3><p>We read your details and learn which page fits your work.</p></div><div className="process-step"><b className="display">02</b><h3>We visit</h3><p>Our local team contacts you to confirm the details in person.</p></div><div className="process-step"><b className="display">03</b><h3>You go live</h3><p>Your approved listing reaches the visitors looking for it.</p></div></div></section>
      <footer className="wrap kitchens-footer"><div className="brandmark">Vic Falls <span>Connect</span></div><span className="mono">&copy; 2026 Vic Falls Connect · Created by 3FT Print House</span></footer>
    </main>
  );
}
