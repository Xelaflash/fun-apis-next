import { SkeletonCard } from './SkeletonCard';

const SkeletonCardList = ({ cardCount }: { cardCount: number }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 justify-items-center">
      {Array.from({ length: cardCount }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export { SkeletonCardList };
