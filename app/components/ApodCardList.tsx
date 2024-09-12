'use client';

import { useEffect, useState } from 'react';
import { CardList } from './CardList';
import { fetchApodData } from '../actions/getApoditems';
import { ApodData } from '../types/apiTypes';

export function ApodCardList() {
  const [items, setItems] = useState<ApodData[]>([]);

  useEffect(() => {
    fetchApodData().then(setItems);
  }, []);

  return <CardList initialItems={items} />;
}
