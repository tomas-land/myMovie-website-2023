
const menuItemsData = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    index: 0
  },
  {
    name: 'Favorites',
    subcategories: [
      { name: 'Movies', href: '/dashboard/favorites/movies' },
      { name: 'TV Series', href: '/dashboard/favorites/tv_series' },
    ],
    index: 1
  },
  {
    name: 'Watchlist',
    subcategories: [
      { name: 'Movies', href: '/dashboard/watchlist/movies' },
      { name: 'TV Series', href: '/dashboard/watchlist/tv_series' },
    ],
    index: 2
  },
  {
    name: 'Rated',
    subcategories: [
      { name: 'Movies', href: '/dashboard/rated/movies' },
      { name: 'TV Series', href: '/dashboard/rated/tv_series' },
    ],
    index: 3
  },
  {
    name: 'Lists',
    subcategories: [
      { name: 'Movies (in dev)', href: '/lists/movies' },
      { name: 'Test (in dev)', href: '/lists/test' },
    ],
    index: 4
  },
  {
    name: 'Reviews',
    href: '#',
    index: 5
  },
  {
    name: 'Settings',
    subcategories: [
      { name: 'Account (in dev)', href: '/settings/movies' },
    ],
    index: 6
  },
];

export default menuItemsData;

