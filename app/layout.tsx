import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SearchProvider } from './contexts/SearchProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Fun APIs',
  description: 'Playground app for testing APIs and new next.js stuff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
