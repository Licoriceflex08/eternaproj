export const SkeletonCard = () => (
  // The animation-pulse class provides the simple shimmer effect
  <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800 animate-pulse">
    
    {/* Left Side: Avatar and Ticker */}
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-gray-600 mr-3"></div>
      <div>
        <div className="h-4 w-16 bg-gray-600 rounded mb-1"></div>
        <div className="h-3 w-24 bg-gray-700 rounded text-xs"></div>
      </div>
    </div>
    
    {/* Right Side: Data */}
    <div className="text-right">
      <div className="h-4 w-20 bg-gray-600 rounded mb-1"></div>
      <div className="h-3 w-12 bg-gray-700 rounded text-xs"></div>
    </div>
  </div>
);