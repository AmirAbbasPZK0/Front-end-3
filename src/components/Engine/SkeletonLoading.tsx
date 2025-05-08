import React from 'react';

export default function SkeletonLoading() {
  return (
    <div className="p-6 w-[90%] h-screen bg-[#f5f6fc] min-h-screen">
      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />

          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mt-6" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="h-6 w-40 bg-gray-300 rounded animate-pulse mt-6" />
          <div className="space-y-2">
            <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="h-6 w-24 bg-gray-300 rounded animate-pulse mt-6" />
          <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-300 rounded animate-pulse mt-6" />
          <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-300 rounded animate-pulse mt-6" />
          <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
          
        </div>
        
        

        {/* Right Image */}
        <div className="w-full md:w-64 h-[400px] bg-gray-300 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
