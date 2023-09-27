import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  // return <LoadingSpinner />;
  return <Skeleton count={10} />;
  // return <div>Loading...</div>;
}
