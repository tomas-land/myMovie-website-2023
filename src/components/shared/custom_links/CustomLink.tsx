'use client';

import s from './custom_link.module.scss';
import Link from 'next/link';

interface iProps {
  label?: string;
  position?: 'relative' | 'absolute';
  icon?: React.ReactNode;
  handleClick?: () => void;
  href: string;
}

const CustomLink = ({ label, position, icon, handleClick, href }: iProps) => {
  const style = {
    position: position,
  };

  return (
    <Link href={href} className={s.link} style={style} onClick={handleClick}>
      {icon ? <span className={s.icon}>{icon}</span> : ''}
      <span className={s.text}>{label}</span>
    </Link>
  );
};

export default CustomLink;
