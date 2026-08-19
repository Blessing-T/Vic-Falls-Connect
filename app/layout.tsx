import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vic Falls Connect — Victoria Falls, Zimbabwe',
  description:
    'Discover home kitchens, family-run eateries, maker stalls, and community experiences in Victoria Falls.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
