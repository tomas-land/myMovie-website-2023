'use client';
import s from './primary_button.module.scss';

interface iButtonProps {
  label?: string;
  position?: 'relative' | 'absolute';
  icon?: React.ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const PrimaryButton = ({ label, position, icon, handleClick, type }: iButtonProps) => {
  const style = {
    position: position,
  };

  return (
    <button className={s.button} style={style} onClick={handleClick} type={type}>
      {icon ? <span className={s.icon}>{icon}</span> : null}
      <span className={s.text}>{label}</span>
    </button>
  );
};

export default PrimaryButton;
