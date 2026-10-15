import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://uxe.fyi"),
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "uxe.fyi — UX Engineering Thinking" }] },
  },
  title: "uxe.fyi — the open-source home for UX Engineering",
  description: "A living handbook, a career bridge, and a community for the discipline of UX Engineering — making interfaces feel inevitable.",
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
