"use client"
import { Oval } from 'react-loader-spinner';
import s from './loading.module.scss';

interface iLoadingSpinnerProps {
  height?: number;
  width?: number;
}

const LoadingSpinner = ({ height=60, width=60 }: iLoadingSpinnerProps) => {
  return (
    <div className={s.loading}>
      <Oval height={height} width={width} color="#3eada6" wrapperStyle={{}} wrapperClass="" visible={true} ariaLabel="oval-loading" secondaryColor="#2A7A75" strokeWidth={2} strokeWidthSecondary={2} />
    </div>
  );
};

export default LoadingSpinner;
