
const menuItemsData = [
    {
      name: 'Favorites',
      subcategories: [
        { name: 'Movies', href: '/dashboard/favorites/movies' },
        { name: 'TV Series', href: '/dashboard/favorites/tv_series' },
      ],
      href: '/dashboard/favorites',
    },
    {
      name: 'Watchlist',
      subcategories: [
        { name: 'Movies', href: '/dashboard/watchlist/movies' },
        { name: 'TV Series', href: '/dashboard/watchlist/tv_series' },
      ],
      href: '/watchlist',
    },
    {
      name: 'Rated',
      subcategories: [
        { name: 'Movies (in dev)', href: '/rated/movies' },
        { name: 'TV Series (in dev)', href: '/rated/tv_series' },
      ],
      href: '/rated',
    },
    {
      name: 'Lists',
      subcategories: [
        { name: 'Movies (in dev)', href: '/lists/movies' },
        { name: 'Test (in dev)', href: '/lists/test' },
      ],
      href: '/lists',
    },
    { name: 'Reviews', href: '/reviews' },
    {
      name: 'Settings',
      subcategories: [
        { name: 'Account (in dev)', href: '/settings/movies' },
      ],
      href: '/settings',
    },
  ];
  
  export default menuItemsData;

  