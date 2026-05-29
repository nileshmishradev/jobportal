import React from "react";

const JobCardSkeleton = () => {
  return (
    <div className="border p-6 shadow rounded animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 bg-gray-200 rounded" />
      </div>

      {/* Title */}
      <div className="h-5 bg-gray-200 rounded w-3/4 mt-4"></div>

      {/* Tags */}
      <div className="flex gap-3 mt-3">
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Description */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <div className="h-9 w-28 bg-gray-200 rounded"></div>
        <div className="h-9 w-28 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;