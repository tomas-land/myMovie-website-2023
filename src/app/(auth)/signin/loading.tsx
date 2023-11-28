import s from '@/components/shared/loading_spinner/loading.module.scss';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';

export default function Loading() {
  return (
    <div className={s.loading}>
      <LoadingSpinner />
    </div>
  );
}
