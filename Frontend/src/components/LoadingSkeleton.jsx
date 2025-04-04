import PropTypes from 'prop-types';

const LoadingSkeleton = ({ isMain = false }) => {
  if (isMain) {
    return (
      <div className="bg-gradient-to-red overflow-hidden transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-50 h-full rounded-lg">
        <div className="h-[400px] overflow-hidden rounded-lg relative group bg-gray-400 animate-pulse">
          <div className="absolute inset-0 shimmer"></div>
        </div>
        <div className="p-6 bg-gradient-to-red overflow-hidden">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-400 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
              <div className="h-3 w-16 bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-8 w-3/4 bg-gray-400 rounded animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-4 w-1/4 bg-gray-400 rounded animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="h-6 w-full bg-gray-400 rounded animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-red overflow-hidden transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-50 flex-1 rounded-lg">
      <div className="flex flex-col md:flex-row h-full overflow-hidden">
        <div className="p-4 md:w-[63%] flex flex-col justify-between bg-gradient-to-red overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-16 bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
              <div className="h-4 w-4 bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
              <div className="h-4 w-16 bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
            </div>
            <div className="h-6 w-3/4 bg-gray-400 rounded animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
              <div className="h-4 w-5/6 bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
              <div className="h-4 w-4/6 bg-gray-400 rounded animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[37%] h-[210px] bg-gray-400 rounded-lg animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
      </div>
    </div>
  );
};

LoadingSkeleton.propTypes = {
  isMain: PropTypes.bool
};

export default LoadingSkeleton; 