'use client'
import { useState, useEffect, use } from 'react';
import s from './dashboard_menu.module.scss';
import Link from 'next/link';
import menuItemsData from '@/lib/constants/menuItemsData';
import SwipeIcon from './SwipeIcon';
import { useRouter } from 'next/navigation'

interface iMenuItem {
  name: string;
  subcategories?: { name: string; href: string }[];
  href?: string;
}

const DashboardMenu = () => {
  const [menuItems, setMenuItems] = useState<iMenuItem[]>(menuItemsData);
  const [isSubMenuShown, setIsSubMenuShown] = useState<boolean>(false);
  const [currentSubcategories, setCurrentSubcategories] = useState<{ name: string; href: string }[]>([]);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [isActiveMenuItem, setIsActiveMenuItem] = useState<boolean>(false);
  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState<number>(0)
  const router = useRouter();

  useEffect(() => {
    const currentMenuItem = menuItems.find((item, index) => index === activeMenuItemIndex)
    setIsActiveMenuItem(!!currentMenuItem) // if the current menu item is active, set it to true or false
  }, [activeMenuItemIndex])

  // useEffect(() => {
  //   // Function to update mobile view state
  //   const updateMobileView = () => setMobileView(window.innerWidth < 768);
  //   // Add event listener for window resize
  //   window.addEventListener('resize', updateMobileView);
  //   // Initial cleanup of the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', updateMobileView);
  //   };
  // }, []);

  // on mouse over, if the item has subcategories, show them ,else hide menu
  const handleMouseOver = (item: iMenuItem) => {
    if (item.subcategories) {
      setCurrentSubcategories(item.subcategories);
      setIsSubMenuShown(true);
    } else {
      setCurrentSubcategories([]);
      setIsSubMenuShown(false);
    }
  };

  // on mouse out, hide menu
  const handleMouseOut = () => {
    setCurrentSubcategories([]);
    setIsSubMenuShown(false);
  };

  // const closeDashboardMenu = () => {
  //   setCurrentSubcategories([]);
  //   setIsSubMenuShown(false);
  // }

  const handleOpenSubMenu = (item: iMenuItem, index: number) => {  // if the item has subcategories, show them, else navigate to the item href
    if (item.subcategories) {
      setCurrentSubcategories(item.subcategories);
      setIsSubMenuShown(true);
    } else {
      setCurrentSubcategories([]);
      setIsSubMenuShown(false);
      if (item.href) {
        router.push(item.href);
        setActiveMenuItemIndex(index)
      }
    }
  }

  const highlightActiveMenuItem = (index: number) => {
    setActiveMenuItemIndex(index)
  }
  return (
    <div className={s.dashboard_menu} onMouseLeave={handleMouseOut}>
      <div className={s.wrapper}>
        <ul className={s.list} >
          {/* // map through menu items and show them */}
          {menuItems.map((item, index) => (
            <li key={index} className={`${s.menu_item} ${index === activeMenuItemIndex && isActiveMenuItem ? s.active_menu_item : ''}`} onMouseOver={() => handleMouseOver(item)} onClick={() => handleOpenSubMenu(item, index)}>
              {item.name}
              {/* // if the item has subcategories, show them */}
              {isSubMenuShown && item.subcategories === currentSubcategories ? (
                <ul className={s.subcategory_list}>
                  {currentSubcategories.map((subcategory, subIndex) => (
                    <li key={subIndex} className={s.subcategory_item} onClick={() => highlightActiveMenuItem(index)}>
                      <Link href={subcategory.href}>
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <div className={s.swipe_icon_wrapper}>
          <SwipeIcon />
        </div>
      </div>
      {/* // if mobile view, show subcategories below the dashboard menu */}
      {mobileView ? (
        <div className={s.mobile_subcategory_list}>
          {isSubMenuShown ? (
            <ul className={s.subcategory_list}>
              {currentSubcategories.map((subcategory, subIndex) => (
                <li key={subIndex} className={s.subcategory_item} >
                  <Link href={subcategory.href}>
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default DashboardMenu;