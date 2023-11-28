import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from '@/components/shared/loading_spinner/loading.module.scss';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';

export default function Loading() {
  // const skeletonAttributes = {
  //   baseColor: '#233145',
  //   highlightColor: '#1D2636',
  //   enableAnimation: true,
  //   borderRadius: 16,
  // };

  return (
    <div className={s.loading}>
      <LoadingSpinner />
    </div>
  );
}
