'use client';
import LoadingSpinner from '../../loading_spinner/LoadingSpinner';
import s from './primary_button.module.scss';

interface iButtonProps {
  label?: string;
  position?: 'relative' | 'absolute';
  icon?: React.ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  spinner?: boolean;
}

const PrimaryButton = ({ label, position, icon, handleClick, type, spinner }: iButtonProps) => {
  const style = {
    position: position,
  };

  return (
    <button className={s.button} style={style} onClick={handleClick} type={type}>
      {spinner ? (
        <LoadingSpinner width={20} height={20} />) : (
        <>
          {icon && <span className={s.icon}>{icon}</span>}
          <span className={s.text}>{label}</span>
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
