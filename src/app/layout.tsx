import type { Metadata } from 'next';
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
};

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased bg-background overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
