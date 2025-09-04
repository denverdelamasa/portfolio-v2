import "../styles/globals.css";
import "../styles/fonts.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Inter, Outfit, DM_Sans, Ubuntu } from "next/font/google";
// Configure your fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"], // Include weights you need
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="corporate" className="">
      <body className={`${inter.variable} ${dmSans.variable} ${outfit.variable} ${ubuntu.variable} antialiased`}>
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
