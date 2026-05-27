export default function SkeletonCard() {
  return (
    <div className="bg-gray-800/60 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-700" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-700 rounded w-3/4" />
        <div className="h-2 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}
