'use client'
import { useState } from 'react';
import s from './dashboard_menu.module.scss';
import Link from 'next/link';
import menuItemsData from '@/lib/constants/menuItemsData';

interface iMenuItem {
  name: string;
  subcategories?: { name: string; href: string }[];
  href?: string;
}

const DashboardMenu = () => {
  const [menuItems, setMenuItems] = useState<iMenuItem[]>(menuItemsData);
  const [isSubMenuShown, setIsSubMenuShown] = useState<boolean>(false);
  const [currentSubcategories, setCurrentSubcategories] = useState<{ name: string; href: string }[]>([]);

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

  return (
    <div className={s.dashboard_menu}>
      <ul className={s.list} onMouseOut={handleMouseOut}>
        {/* // map through menu items and show them */}
        {menuItems.map((item, index) => (
          <li key={index} className={s.item} onMouseOver={() => handleMouseOver(item)}>
            {item.name}
            {/* // if the hovered item has subcategories, show them */}
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
    </div>
  );
};

export default DashboardMenu;