'use client';
import { Oval } from 'react-loader-spinner';
import s from './loading_spinner.module.scss';

const LoadingSpinner = () => {
  return (
      <div className={s.loading_spinner}>
        <Oval height={60} width={60} color="#3eada6" wrapperStyle={{}} wrapperClass="" visible={true} ariaLabel="oval-loading" secondaryColor="#2A7A75" strokeWidth={2} strokeWidthSecondary={2} />{' '}
      </div>
  );
};

export default LoadingSpinner;
