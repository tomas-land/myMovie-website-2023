import React from 'react';
import s from './input.module.scss';

interface iInputProps {
  placeholder: string;
  maxLength?: number;
  handleClick?: () => void;
}

const CustomInput = ({ placeholder, maxLength, handleClick }: iInputProps) => {
  return <input className={s.input} maxLength={maxLength} placeholder={placeholder} onClick={handleClick} />;
};

export default CustomInput;
