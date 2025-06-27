import './globals.css';
import type { Metadata } from 'next';
import Header from './header';
import Footer from './footer';
import styles from './page.module.css';
import Providers from '@/contexts/_app';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hospital 🔌Plug',
  description:
    'Hospital Plug is a platform connecting healthcare providers, facilities, and professionals to streamline hospital operations, staffing, and resource management.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <header className={styles.header}>
            <Header />
          </header>
          {children}
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
