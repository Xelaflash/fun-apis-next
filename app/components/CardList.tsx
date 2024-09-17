'use client';

import { useEffect, useState } from 'react';
import { ApodData } from '../types/apiTypes';
import { Card } from './Card';
import { fetchApodData } from '../actions/getApoditems';
import { useInView } from 'react-intersection-observer';
import { RESULTS_PER_PAGE } from '@/constants';
import { SkeletonCardList } from './SkeletonCardList';
import { useSearchContext } from '../contexts/SearchContext';
import useDebounce from '../hooks/useDebounce';

type CardListProps = {
  // TODO: define the shape of the data
  // for now we use the shape of APOD api
  initialItems: ApodData[];
};

const CardList = ({ initialItems }: CardListProps) => {
  const [scrollTrigger, isInView] = useInView();
  const { searchQuery } = useSearchContext();
  const [expandedCards, setExpandedCards] = useState<boolean[]>(new Array(initialItems.length).fill(false));
  const [items, setItems] = useState<ApodData[]>(initialItems);

  const loadMoreItems = async () => {
    const apiItems = await fetchApodData();
    setItems((prev) => [...prev, ...apiItems]);
  };

  useEffect(() => {
    if (isInView && searchQuery === '') {
      loadMoreItems();
    }
  }, [isInView, searchQuery]);

  const filteredItems = searchQuery
    ? items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;
  if (filteredItems.length === 0 && searchQuery) {
    return (
      <p className="text-center text-2xl">
        No items found with your query: <span className="font-bold text-purple-700 text-4xl">{searchQuery}</span>
      </p>
    );
  }

  const handleToggleExpand = (index: number) => {
    setExpandedCards((prev) => {
      const newExpandedCards = [...prev];
      newExpandedCards[index] = !newExpandedCards[index];
      return newExpandedCards;
    });
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 justify-items-center">
        {filteredItems.map((item: ApodData, index: number) => (
          <Card
            key={item.date}
            data={item}
            isExpanded={expandedCards[index]}
            onToggleExpand={() => handleToggleExpand(index)}
          />
        ))}
      </div>

      {searchQuery === '' && (
        <div className="pt-4" ref={scrollTrigger}>
          <SkeletonCardList cardCount={RESULTS_PER_PAGE} />
        </div>
      )}

      {/* <div className="pt-12 flex justify-center">
        <button
          className="border-purple-600 border-2 border-solid p-4 rounded-md w-48 bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors duration-300 ease-in-out"
          onClick={loadMoreItems}
        >
          Load More Items
        </button>
      </div> */}
    </>
  );
};

export { CardList };
