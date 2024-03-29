import React from 'react';
import Link from 'next/link';
import s from './mobile_menu.module.scss';
import { Squash as Hamburger } from 'hamburger-react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';


interface iMobileMenuProps {
  links: { href: string; label: string }[];
  closeMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface iMobileMenuLinkProps {
  href: string;
  label: string;
  closeMobileMenu: () => void;
}

const MobileMenuLink = ({ href, label, closeMobileMenu }: iMobileMenuLinkProps) => (
  <li className={s.mobile_menu_item}>
    <Link href={href} className={s.link} onClick={closeMobileMenu}>
      {label}
    </Link>
  </li>
);

const MobileMenu = ({ links, closeMobileMenu, isMobileMenuOpen, setIsMobileMenuOpen }: iMobileMenuProps) => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  
  return (
    <div className={`${s.mobile_menu} ${s.open}`}>
      <div className={s.hamburger_wrapper}>
        <Hamburger toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} size={25} rounded duration={0.9} />
      </div>
      <div className={s.mobile_menu_list}>
        {session ? <MobileMenuLink href="/dashboard" label="Profile" closeMobileMenu={closeMobileMenu} /> : null}
        {links.map((link) => (
          <MobileMenuLink href={link.href} label={link.label} key={link.href} closeMobileMenu={closeMobileMenu} />
        ))}
        {session ?
          <button className={s.auth_button} onClick={handleSignOut}>Sign Out</button> :
          <Link href={'/signin'} className={s.auth_button} onClick={closeMobileMenu}>Sign In</Link>
        }
      </div>
    </div>
  );
};

export default MobileMenu;