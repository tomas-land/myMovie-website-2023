
const menuItemsData = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Favorites',
    subcategories: [
      { name: 'Movies', href: '/dashboard/favorites/movies' },
      { name: 'TV Series', href: '/dashboard/favorites/tv_series' },
    ],
  },
  {
    name: 'Watchlist',
    subcategories: [
      { name: 'Movies', href: '/dashboard/watchlist/movies' },
      { name: 'TV Series', href: '/dashboard/watchlist/tv_series' },
    ],
  },
  {
    name: 'Rated',
    subcategories: [
      { name: 'Movies', href: '/dashboard/rated/movies' },
      { name: 'TV Series', href: '/dashboard/rated/tv_series' },
    ],
  },
  {
    name: 'Lists',
    subcategories: [
      { name: 'Movies (in dev)', href: '/lists/movies' },
      { name: 'Test (in dev)', href: '/lists/test' },
    ],
  },
  {
    name: 'Reviews',
    href: '#'
  },
  {
    name: 'Settings',
    subcategories: [
      { name: 'Account (in dev)', href: '/settings/movies' },
    ],
  },
];

export default menuItemsData;

