import { Copyright } from 'lucide-react';
import { Header } from './components/Header';
import { CardList } from './components/CardList';
import { fetchApodData } from './actions/getApoditems';

export default async function Home() {
  const initialItems = await fetchApodData();
  return (
    <>
      <Header />
      <main className="min-h-screen mx-auto p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-screen-2xl ">
        {/* TODO: filters */}
        <CardList initialItems={initialItems} />
      </main>
      <footer className="border border-t border-zinc-600 flex items-center justify-center gap-2 pt-2 pb-10">
        <Copyright size={14} /> <span className="text-sm font-bold">{new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
