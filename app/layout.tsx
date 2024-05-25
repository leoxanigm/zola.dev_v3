import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';

import '@/app/globals.css';
import Header from '@/app/ui/Header';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zelalem (Zola) - Software Developer',
  description: "Zola's portfolio website"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto_mono.className}>
        <Header />

        {children}
      </body>
    </html>
  );
}
