'use client';

import s from './secondary_button.module.scss';

interface iButtonProps {
  label: string;
  icon?: React.ReactNode;
  handleClick?: () => void;
}

const SecondaryButton = ({ label, icon, handleClick }: iButtonProps) => {
  return (
    <button className={s.button} onClick={handleClick}>
      {icon ? <span className={s.icon}>{icon}</span> : ''}
      <span className={s.text}>{label}</span>
    </button>
  );
};

export default SecondaryButton;
