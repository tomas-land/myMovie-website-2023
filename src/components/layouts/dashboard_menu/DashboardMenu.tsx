'use client'
import { use, useState, useEffect } from 'react';
import s from './dashboard_menu.module.scss';
import Link from 'next/link';
import menuItemsData from '@/lib/constants/menuItemsData';
import SwipeIcon from './SwipeIcon';

interface iMenuItem {
  name: string;
  subcategories?: { name: string; href: string }[];
  href?: string;
}

const DashboardMenu = () => {
  const [menuItems, setMenuItems] = useState<iMenuItem[]>(menuItemsData);
  const [isSubMenuShown, setIsSubMenuShown] = useState<boolean>(false);
  const [currentSubcategories, setCurrentSubcategories] = useState<{ name: string; href: string }[]>([]);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    // Function to update mobile view state
    const updateMobileView = () => {
      setMobileView(window.innerWidth < 768);
    };
    // Add event listener for window resize
    window.addEventListener('resize', updateMobileView);

    // Initial cleanup of the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateMobileView);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount


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

  const closeDashboardMenu = () => {
    setCurrentSubcategories([]);
    setIsSubMenuShown(false);
  }

  return (
    <div className={s.dashboard_menu} onMouseLeave={handleMouseOut}>
      <div className={s.wrapper}>
        <ul className={s.list} >
          {/* // map through menu items and show them */}
          {menuItems.map((item, index) => (
            <li key={index} className={s.item} onMouseEnter={() => handleMouseOver(item)}>
              {item.name}
              {/* // if the item has subcategories, show them */}
              {isSubMenuShown && item.subcategories === currentSubcategories ? (
                <ul className={s.subcategory_list}>
                  {currentSubcategories.map((subcategory, subIndex) => (
                    <li key={subIndex} className={s.subcategory_item}>
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
                <li key={subIndex} className={s.subcategory_item} onClick={closeDashboardMenu}>
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