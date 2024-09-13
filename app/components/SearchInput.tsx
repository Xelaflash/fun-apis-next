'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { z } from 'zod';
import { useSearchContext } from '@/app/contexts/SearchContext';
import useDebounce from '../hooks/useDebounce';
const searchSchema = z.object({
  query: z.string(),
});

export default function SearchInput() {
  const { setSearchQuery } = useSearchContext();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;

    try {
      const { query: validatedQuery } = searchSchema.parse({ query });
      setError(null);
      setSearchQuery(validatedQuery);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const [inputValue, setInputValue] = useState('');
  const debouncedSearchQuery = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setSearchQuery('');
      setInputValue('');
    } else {
      setInputValue(e.target.value);
    }
  };

  return (
    <form className="relative w-64 max-w-sm" onSubmit={handleSubmit}>
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10 pr-4 py-2"
        name="query"
        onChange={handleInputChange}
        value={inputValue}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
}
