'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Squash as Hamburger } from 'hamburger-react';
import s from './header.module.scss';
import Logo from '@/components/shared/logo/Logo';
import { FiSearch, FiUser } from 'react-icons/fi';
import MainMenu from '@/components/layouts/menu/main_menu/MainMenu';
import MobileMenu from '@/components/layouts/menu/mobile_menu/MobileMenu';
import CustomLink from '@/components/shared/custom_links/CustomLink';
import Search from '@/components/shared/search/search/Search';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react"
import SignOutButton from '@/components/pages/auth/signout_button/SignOutButton';


const menuLinks = [
  { href: '/dashboard', label: 'dash' },
  { href: '/movies', label: 'Movies' },
  { href: '/tv-shows', label: 'TV Shows' },
  { href: '/actors', label: 'Actors' },
  { href: '/more', label: 'More' },
];

const Header = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);


  const searchVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsInputFocused(true); // Set the state to focus the input
  };

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
            <Link href="/signin" className={s.sign_in_btn}>
              <FiUser />
            </Link>
          </div>
          <div className={s.sign_in_wrapper}>
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
              <Search isInputFocused={isInputFocused} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;


// 'use client';

// import { useState,useRef } from 'react';
// import Link from 'next/link';
// import { Squash as Hamburger } from 'hamburger-react';
// import s from './header.module.scss';
// import Logo from '@/components/shared/logo/Logo';
// import { FiSearch, FiUser } from 'react-icons/fi';
// import MainMenu from '@/components/shared/menu/main_menu/MainMenu';
// import MobileMenu from '@/components/shared/menu/mobile_menu/MobileMenu';
// import CustomLink from '@/components/shared/custom_links/CustomLink';
// import Search from '@/components/shared/search/search/Search';
// import { motion, AnimatePresence } from 'framer-motion';


// const menuLinks = [
//   { href: '/', label: 'Home' },
//   { href: '/movies', label: 'Movies' },
//   { href: '/tv-shows', label: 'TV Shows' },
//   { href: '/actors', label: 'Actors' },
//   { href: '/more', label: 'More' },
// ];

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const searchVariants = {
//     hidden: { y: -10, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   };

//   const toggleSearch = () => {
//     setIsSearchOpen((prev) => !prev);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };
//   return (
//     <header className={s.header}>
//       <div className={s.container}>
//         <Link href="/">
//           <Logo />
//         </Link>
//         <div className={s.btns_wrapper}>
//           <div className={s.mobile_btns}>
//             <button className={s.search_btn} onClick={toggleSearch}>
//               <FiSearch />
//             </button>
//             <Link href="" className={s.sign_in_btn}>
//               <FiUser />
//             </Link>
//           </div>
//           <div className={s.sign_in_wrapper}>
//             <CustomLink label="sign-in" href={''} icon={<FiUser />} />
//           </div>
//           <div className={s.hamburger_wrapper}>
//             <Hamburger toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} size={25} rounded />
//           </div>
//         </div>
//         <MainMenu links={menuLinks} />
//       </div>
//       {isMobileMenuOpen ? <MobileMenu links={menuLinks} closeMobileMenu={closeMobileMenu} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} /> : null}
//       <div className={s.search_wrapper}>
//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div
//             variants={searchVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             className={s.searchContainer}
//           >
//             <Search />
//           </motion.div>
//         )}
//       </AnimatePresence>
//       </div>
//     </header>
//   );
// };

// export default Header;
