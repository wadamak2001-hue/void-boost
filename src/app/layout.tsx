
import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VOID BOOST | Ultimate Gaming Performance',
  description: 'Professional Android-style gaming optimizer with futuristic neon UI.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VOID BOOST',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0C12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://picsum.photos/seed/voidboost/192/192" />
        <link rel="apple-touch-icon" href="https://picsum.photos/seed/voidboost/192/192" />
      </head>
      <body className="font-body antialiased bg-background overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
