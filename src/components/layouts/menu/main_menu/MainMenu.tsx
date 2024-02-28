"use client"
import s from './main_menu.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface iMenuProps {
  links: { href: string; label: string }[];
}
interface iMenuLinkProps {
  href: string;
  label: string;
  setActiveLink: (href: string) => void;
  activeLink: string | null;
}

const MenuItem = ({ href, label, setActiveLink, activeLink }: iMenuLinkProps) => {
  return (
    <li className={s.menu_item}>
      <Link href={href} className={`${s.link} ${activeLink === href ? s.active : null}`} scroll={false} onClick={() => setActiveLink(href)}>
        {label}
      </Link>
    </li>
  )
};

const MainMenu = ({ links }: iMenuProps) => {
  const { data: session } = useSession();
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleSetActiveLink = (href: string) => {
    setActiveLink(href);
  };

  return (
    <div className={s.menu}>
      <div className={s.menu_list}>
        {session ? <MenuItem href="/dashboard" label="Profile" setActiveLink={handleSetActiveLink} activeLink={activeLink} /> : null}
        {links.map((link) => (
          <MenuItem href={link.href} label={link.label} key={link.href} setActiveLink={handleSetActiveLink} activeLink={activeLink} />
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
