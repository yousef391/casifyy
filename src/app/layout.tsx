import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Cairo, Space_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FacebookPixel from '@/components/tracking/FacebookPixel';
import CustomCursor from '@/components/ui/CustomCursor';
import { Providers } from './providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const arabicFont = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ar',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
});

// ─── SEO Metadata ───
export const metadata: Metadata = {
  metadataBase: new URL('https://casify.dz'),
  title: {
    default: 'CASIFY — أغطية هواتف مخصصة | Coques personnalisées en Algérie',
    template: '%s | CASIFY',
  },
  description:
    'أنشئي غطاء هاتفك المخصص — صور شخصية، خط عربي، رسم مخصص. طباعة عالية الجودة وتوصيل لكل الولايات في الجزائر. Créez votre coque personnalisée — livraison partout en Algérie.',
  keywords: [
    'casify',
    'coque personnalisée',
    'أغطية هواتف',
    'غطاء هاتف مخصص',
    'phone case algeria',
    'coque algérie',
    'custom phone case',
    'خط عربي',
    'calligraphy case',
    'iPhone case algeria',
    'Samsung case algeria',
    'أغطية آيفون',
    'أغطية سامسونج',
    'هدية مخصصة',
    'توصيل الجزائر',
  ],
  authors: [{ name: 'Casify', url: 'https://casify.dz' }],
  creator: 'Casify',
  publisher: 'Casify',
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: 'https://casify.dz',
    languages: {
      'ar-DZ': 'https://casify.dz',
      'fr-DZ': 'https://casify.dz',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_DZ',
    alternateLocale: ['fr_DZ'],
    url: 'https://casify.dz',
    siteName: 'Casify',
    title: 'CASIFY — أغطية هواتف مخصصة في الجزائر',
    description:
      'أنشئي غطاء هاتفك المخصص بتصميمك الخاص. صور، خط عربي، رسومات. طباعة عالية الجودة وتوصيل لـ 58 ولاية.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Casify — أغطية هواتف مخصصة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CASIFY — أغطية هواتف مخصصة في الجزائر',
    description: 'أنشئي غطاء هاتفك المخصص — توصيل لكل الولايات',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when ready
    // google: 'your-google-verification-code',
    // other: { 'facebook-domain-verification': 'your-fb-verification' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0E8' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1C1E' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ─── JSON-LD Structured Data ───
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Casify',
  description: 'أغطية هواتف مخصصة في الجزائر — Custom phone cases in Algeria',
  url: 'https://casify.dz',
  logo: 'https://casify.dz/logo.png',
  image: 'https://casify.dz/og-image.png',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'DZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.7538,
    longitude: 3.0588,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Algeria',
  },
  sameAs: [
    'https://instagram.com/casify.dz',
    'https://facebook.com/casify.dz',
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'DZD',
    lowPrice: '1500',
    highPrice: '5000',
    offerCount: '50',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cormorant.variable} ${dmSans.variable} ${arabicFont.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://jgyuewsnjgqrjsnqhctd.supabase.co" />
        <link rel="preconnect" href="https://jgyuewsnjgqrjsnqhctd.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <FacebookPixel />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
