import s from './main_menu.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface iMenuProps {
  links: { href: string; label: string }[];
}
interface iMenuLinkProps {
  href: string;
  label: string;
}

const MenuItem = ({ href, label }: iMenuLinkProps) => (
  <li className={s.menu_item}>
    <Link href={href} className={s.link}>
      {label}
    </Link>
  </li>
);

const MainMenu = ({ links }: iMenuProps) => {
  const { data: session } = useSession();
  return (
    <div className={s.menu}>
      <div className={s.menu_list}>
        {session? <MenuItem href="/dashboard" label="Profile" /> : null}
        {links.map((link) => (
          <MenuItem href={link.href} label={link.label} key={link.href} />
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
