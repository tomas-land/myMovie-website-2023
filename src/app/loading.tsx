import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from '@/components/pages/homepage/movies_display/movies_display.module.scss';

export default function Loading() {
  const skeletonAttributes = {
    baseColor: '#233145',
    highlightColor: '#1D2636',
    enableAnimation: true,
    borderRadius: 16,
  };

  return (
    <>
      <div className={s.movies_display} style={{ marginTop: '40rem' }}>
        <div className={s.header}>
          <h1 className={s.title}>
            <Skeleton width={200} {...skeletonAttributes} />
          </h1>
        </div>
        <div className={s.movies_slider} style={{ display: 'flex', gap: '1rem', overflow: 'hidden' }}>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} width={255} height={522} {...skeletonAttributes} />
            ))}
        </div>
      </div>
    </>
  );
}
