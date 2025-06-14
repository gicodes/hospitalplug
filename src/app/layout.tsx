import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";
import styles from './page.module.css';
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hospital 🔌Plug",
  description: "Hospital Plug is a platform connecting healthcare providers, facilities, and professionals to streamline hospital operations, staffing, and resource management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>
          <Header/>
        </header>
        {children}
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
