import React from 'react';
import s from './button.module.scss';

interface iButtonProps {
  label: string;
  position?: 'relative' | 'absolute';
  icon?: React.ReactNode;
  handleClick?: () => void;
}

const Button = ({ label, position, icon, handleClick }: iButtonProps) => {
  const style = {
    position: position,
  };

  return (
    <button className={s.button} style={style} onClick={handleClick}>
      {icon ? <span className={s.icon}>{icon}</span> : ''}
      <span className={s.text}>{label}</span>
    </button>
  );
};

export default Button;
