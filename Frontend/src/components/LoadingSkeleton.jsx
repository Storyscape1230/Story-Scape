import PropTypes from 'prop-types';

const LoadingSkeleton = ({ isMain = false }) => {
  if (isMain) {
    return (
      <div className="bg-gradient-to-red overflow-hidden transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-50 h-full rounded-lg">
        <div className="h-[400px] overflow-hidden rounded-lg relative group bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
        </div>
        <div className="p-6 bg-gradient-to-red">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-200 animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
              </div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="p-4 md:w-[63%] flex flex-col justify-between bg-gradient-to-red">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
          </div>
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
            <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[37%] h-[200px] bg-gray-200 rounded-lg animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
      </div>
    </div>
  );
};

LoadingSkeleton.propTypes = {
  isMain: PropTypes.bool
};

export default LoadingSkeleton; 