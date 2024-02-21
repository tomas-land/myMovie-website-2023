'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Squash as Hamburger } from 'hamburger-react';
import s from './header.module.scss';
import Logo from '@/components/shared/logo/Logo';
import { FiLogOut, FiSearch, FiUser } from 'react-icons/fi';
import MainMenu from '@/components/layouts/menu/main_menu/MainMenu';
import MobileMenu from '@/components/layouts/menu/mobile_menu/MobileMenu';
import CustomLink from '@/components/shared/custom_links/CustomLink';
import Search from '@/components/shared/search_header/search/Search';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react"
import SignOutButton from '@/components/pages/auth/signout_button/SignOutButton';
import { useGlobalContext } from '@/context/GlobalContext';
import { signOut } from 'next-auth/react';


const menuLinks = [
  { href: '/movies', label: 'Movies' },
  { href: '/tvshows', label: 'TV Shows' },
  { href: '/actors', label: 'Actors' },
];

const Header = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleSearch, isSearchOpen } = useGlobalContext();

  const searchVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link href="/">
          <Logo />
        </Link>
        <MainMenu links={menuLinks} />
        <div className={s.btns_wrapper}>
          <div className={s.mobile_btns}>
            <button className={s.search_btn} onClick={toggleSearch}>
              <FiSearch />
            </button>
            {session ?
              <button className={s.auth_btn} onClick={handleSignOut}><FiLogOut /></button> :
              <Link href="/signin" className={s.auth_btn}>
                <FiUser />
              </Link>
            }
          </div>
          <div className={s.auth_wrapper}>
            {session ? (
              <SignOutButton />
            ) : (
              <CustomLink label="sign in" href={'/signin'} icon={<FiUser />} />
            )}
          </div>
          <div className={s.hamburger_wrapper}>
            <Hamburger toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} size={25} rounded />
          </div>
        </div>
      </div>
      {isMobileMenuOpen ? <MobileMenu links={menuLinks} closeMobileMenu={closeMobileMenu} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} /> : null}
      <div className={s.search_wrapper} >
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={s.searchContainer}
            >
              <Search />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
