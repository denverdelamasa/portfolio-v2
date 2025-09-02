import "../styles/globals.css";
import { Inter } from "next/font/google";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="retro" className="bg-noise">
      <body className={`${inter.variable} antialiased`}>
        <header>
          <Navbar />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
