import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-next",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif-next",
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-next",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: "uxe.fyi", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  // The brand kit's icon set (context/Brand Kit.html). favicon.ico and
  // manifest.ts come from file conventions in src/app.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#FF3D88" }],
  },
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "uxe.fyi — UX Engineering Thinking" }] },
  },
  title: "uxe.fyi — the open-source home for UX Engineering",
  description: "A living handbook, a career bridge, and a community for the discipline of UX Engineering — making interfaces feel inevitable.",
};

export const viewport: Viewport = {
  themeColor: "#0B0B0A",
};

// Organization + WebSite structured data, so search results can show the logo.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "uxe.fyi",
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-mark-512.png`, width: 512, height: 512 },
      sameAs: ["https://github.com/sidhanshumonga/uxe.fyi"],
    },
    { "@type": "WebSite", name: "uxe.fyi", url: `${SITE_URL}/`, publisher: { "@id": `${SITE_URL}/#org` } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = `${bricolage.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;

  return (
    // suppressHydrationWarning: the inline theme script adds .theme-light before hydration
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('uxe-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('theme-light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="grain">
        <ThemeProvider>
          <div className="shell">
            <Nav />
            <main className="page-body">
              <div className="fade-in">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
