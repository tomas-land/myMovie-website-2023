'use client';

import s from './primary_button.module.scss';

interface iButtonProps {
  label: string;
  position?: 'relative' | 'absolute';
  icon?: React.ReactNode;
  handleClick?: () => void;
}

const PrimaryButton = ({ label, position, icon, handleClick }: iButtonProps) => {
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

export default PrimaryButton;
