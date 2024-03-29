'use client' // Error components must be Client Components
 
import s from '@/components/shared/error/error.module.scss'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {


  return (
    <div className={s.error}>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}