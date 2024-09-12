import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchInput() {
  return (
    <div className="relative w-64 max-w-sm">
      <Input type="search" placeholder="Search..." className="pl-10 pr-4 py-2" />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    </div>
  );
}
