'use client'
import { useState } from 'react';
import s from './dashboard_menu.module.scss';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';
import Link from 'next/link';

const menuItems = [
  { name: 'Favorites', subcategories: ['Movies', 'TV Series'], href: '/favorites' },
  { name: 'Watchlist', subcategories: ['Movies', 'TV Series'], href: '/watchlist' },
  { name: 'Rated', subcategories: ['Movies', 'TV Series'], href: '/rated' },
  { name: 'Lists', subcategories: ['Movies', 'test'], href: '/lists' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Settings', subcategories: ['Movies', 'TV Series'], href: '/settings' },
];


const DashboardMenu = () => {
  const [isSubMenuShown, setIsSubMenuShown] = useState(false);
  const [currentSubcategories, setCurrentSubcategories] = useState<string[]>([]);

  const handleMouseOver = (item: { name: string; subcategories?: string[] }) => {
    if (item.subcategories) {
      setCurrentSubcategories(item.subcategories);
      setIsSubMenuShown(true);
    } else {
      setCurrentSubcategories([]);
      setIsSubMenuShown(false);
    }
  };

  const handleMouseOut = () => {
    setCurrentSubcategories([]);
    setIsSubMenuShown(false);
  };

  return (
    <div className={s.dashboard_menu}>
      <ul className={s.list} onMouseOut={handleMouseOut}>
        {menuItems.map((item, index) => (
          <li key={index} className={s.item} onMouseOver={() => handleMouseOver(item)}>
            {item.name}
            {isSubMenuShown && item.subcategories === currentSubcategories ? (
              <ul className={s.subcategory_list}>
                {currentSubcategories.map((subcategory, subIndex) => (
                  <li key={subIndex} className={s.subcategory_item} >
                    <Link href={item.href}>
                      {subcategory}
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
