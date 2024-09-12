import * as React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="border border-gray-500 p-4 w-[400px] animate-pulse rounded-lg">
      <div className="flex items-center justify-center pt-[56.25%] bg-gray-700 pr-4"></div>
      <div className="flex flex-col items-center justify-center pt-4 pr-4">
        <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
      </div>

      <div className="pt-4 pr-4">
        <div className="h-4 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export { SkeletonCard };
