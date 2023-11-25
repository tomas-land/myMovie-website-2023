import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  const skeletonAttributes = {
    baseColor: '#233145',
    highlightColor: '#1D2636',
    enableAnimation: true,
    borderRadius: 16,
  };

  return (

    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
      <LoadingSpinner />
    </div>

  );
}
