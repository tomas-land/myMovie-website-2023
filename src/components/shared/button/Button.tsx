'use client';

import s from './button.module.scss';

interface iButtonProps {
  label: string;
  position?: 'relative' | 'absolute';
  icon?: React.ReactNode;
}

const Button = ({ label, position, icon}: iButtonProps) => {
  const style = {
    position: position,
  };

  return (
    <button className={s.button} style={style}>
      {icon ? <span className={s.icon}>{icon}</span> : ''}
      <span className={s.text}>{label}</span>
    </button>
  );
};

export default Button;
