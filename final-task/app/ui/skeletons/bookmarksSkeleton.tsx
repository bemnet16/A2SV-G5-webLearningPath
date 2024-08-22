const BookmarksSkeleton = () => {
  return (
    <div className="bookmarks-skeleton" data-testid="bookmarks-skeleton">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="w-2/3 flex flex-col sm:flex-row gap-4 p-6 lg:px-12 lg:pl-6 border-2 border-gray-400/25 rounded-lg relative m-5 ml-0 animate-pulse"
        >
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>

          <div className="flex-1">
            <div className="h-4 bg-gray-300 mb-2"></div>
            <div className="h-4 bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarksSkeleton;
