import { Copyright } from 'lucide-react';
import { Header } from './components/Header';
import { CardList } from './components/CardList';

export default async function Home() {
  const data = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&count=5`,
  ).then((res) => res.json());

  return (
    <>
      <Header />
      <main className="min-h-screen mx-auto p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-screen-2xl ">
        {/* filters */}
        <CardList data={data} />
      </main>
      <footer className="border border-t border-zinc-600 flex items-center justify-center gap-2 pt-2 pb-10">
        <Copyright size={14} /> <span className="text-sm font-bold">{new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
