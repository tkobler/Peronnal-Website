import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/layout/ClientShell";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = "https://timkobler.ch";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Tim Kobler",
    template: "%s | Tim Kobler",
  },
  description: "Robotics portfolio — EPFL Master's student in Robotics.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Tim Kobler",
    title: "Tim Kobler",
    description: "Robotics portfolio — EPFL Master's student in Robotics.",
    images: [
      {
        url: "/images/profile/pp.png",
        width: 400,
        height: 400,
        alt: "Tim Kobler",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Tim Kobler",
    description: "Robotics portfolio — EPFL Master's student in Robotics.",
    images: ["/images/profile/pp.png"],
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
              name: "Tim Kobler",
              url: siteUrl,
              jobTitle: "Robotics Master's Student",
              affiliation: [
                { "@type": "Organization", name: "EPFL" },
              ],
              sameAs: [
                "https://www.linkedin.com/in/kobler-tim/",
                "https://github.com/tkobler",
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