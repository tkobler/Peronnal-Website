import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/layout/ClientShell";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://example.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Your Name",
    template: "%s | Your Name",
  },
  description: "Engineering portfolio — replace this with your one-line specialty.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Your Name",
    title: "Your Name",
    description: "Engineering portfolio — replace this with your one-line specialty.",
    images: [
      {
        url: "/images/placeholders/square.svg",
        width: 400,
        height: 400,
        alt: "Your Name",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Your Name",
    description: "Engineering portfolio — replace this with your one-line specialty.",
    images: ["/images/placeholders/square.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l='en';try{l=localStorage.getItem('locale')||''}catch(e){}if(l!=='en'&&l!=='fr'){var n=navigator.language||'';l=n.startsWith('fr')?'fr':'en'}window.__LOCALE__=l})()` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Your Name",
              url: siteUrl,
              jobTitle: "Master's Student in Engineering",
              affiliation: [
                { "@type": "Organization", name: "EPFL" },
              ],
              sameAs: [
                "https://www.linkedin.com/in/your-name/",
                "https://github.com/your-username",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <ClientShell>
            {children}
            <Footer /> {/* <--- 2. Add it here, at the bottom of the shell */}
        </ClientShell>
      </body>
    </html>
  );
}