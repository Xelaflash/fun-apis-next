'use client';

import { useState } from 'react';

import { ApodData } from '../types/apiTypes';
import { Card } from './Card';

type CardListProps = {
  // TODO: define the shape of the data
  // for now we use the shape of APOD api
  data: ApodData[];
};

const CardList = ({ data }: CardListProps) => {
  const [expandedCards, setExpandedCards] = useState<boolean[]>(new Array(data.length).fill(false));

  const handleToggleExpand = (index: number) => {
    setExpandedCards((prev) => {
      const newExpandedCards = [...prev];
      newExpandedCards[index] = !newExpandedCards[index];
      return newExpandedCards;
    });
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 justify-items-center">
      {data.map((item: ApodData, index: number) => (
        <Card
          key={item.date}
          data={item}
          isExpanded={expandedCards[index]}
          onToggleExpand={() => handleToggleExpand(index)}
        />
      ))}
    </div>
  );
};

export { CardList };
