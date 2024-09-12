import { useRef, useEffect, useState } from 'react';
import { ApodData } from '../types/apiTypes';
import Image from 'next/image';

type CardProps = {
  data: ApodData;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

const Card = ({ data, isExpanded, onToggleExpand }: CardProps) => {
  const [contentHeight, setContentHeight] = useState('100px');
  const [cardHeight, setCardHeight] = useState('auto');
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString('fr-FR');

  const truncateExplanation = (text: string, lines: number) => {
    const words = text.split(' ');
    const truncated = words.slice(0, lines * 10).join(' ');
    return truncated + (words.length > lines * 10 ? '...' : '');
  };

  useEffect(() => {
    if (cardRef.current && contentRef.current) {
      if (originalHeight === null) {
        setOriginalHeight(cardRef.current.offsetHeight);
      }

      if (isExpanded) {
        const fullContentHeight = contentRef.current.scrollHeight;
        const newCardHeight = originalHeight! + (fullContentHeight - 100);
        setContentHeight(`${fullContentHeight}px`);
        setCardHeight(`${newCardHeight}px`);
      } else {
        setContentHeight('100px');
        setCardHeight(`${originalHeight}px`);
      }
    }
  }, [isExpanded, originalHeight]);

  return (
    <div
      ref={cardRef}
      className="border border-gray-500 rounded-lg p-4 max-w-[400px] flex flex-col transition-[height] duration-300 ease-in-out"
      style={{ height: cardHeight }}
    >
      <div className="flex items-center justify-center relative pt-[56.25%]">
        <Image className="object-contain" src={data.url} fill alt={data.title} />
      </div>
      <div className="flex flex-col items-center justify-center pt-4">
        <h2 className="text-2xl font-bold text-center">{data.title}</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <div className="flex-grow overflow-hidden">
        <div
          className="pt-4 overflow-hidden transition-[height] duration-300 ease-in-out"
          style={{ height: contentHeight }}
        >
          <div ref={contentRef}>
            <p className="text-sm text-gray-300">
              {isExpanded ? data.explanation : truncateExplanation(data.explanation, 5)}
            </p>
          </div>
        </div>
        {data.explanation.split(' ').length > 50 && (
          <button className="text-sm text-blue-500 mt-2" onClick={onToggleExpand}>
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    </div>
  );
};

export { Card };
