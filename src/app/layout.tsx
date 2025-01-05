import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "./glitch.css";

import Footer from "@/components/Layout/Footer.component";
import SkipLink from "@/components/UI/SkipLink.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hi,",
  description: "first name | Frontend Web developer | Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />

        <meta property="og:title" content="first name " />
        <meta name="author" content="first name " />
        <meta property="og:locale" content="nb_NO" />
        <meta
          name="description"
          content="first name| Frontend Web developer | Portfolio"
        />
        <meta
          property="og:description"
          content="first name | Frontend Web developer | Portfolio"
        />

        <meta property="og:url" content="https://www.dfweb.no/" />
        <meta property="og:site_name" content="dfweb.no" />
      </head>

      <body
        className={`flex flex-col min-h-screen bg-slate-900 leading-relaxed text-slate-300/[0.9] antialiased selection:bg-teal-300 selection:text-teal-900 ${inter.className}`}
      >
        <SkipLink />
        <div id="main-content" className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
