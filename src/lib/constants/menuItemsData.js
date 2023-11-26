
const menuItemsData = [
    {
      name: 'Favorites',
      subcategories: [
        { name: 'Movies', href: '/dashboard/favorites/movies' },
        { name: 'TV Series', href: '/dashboard/favorites/tv-series' },
      ],
      href: '/dashboard/favorites',
    },
    {
      name: 'Watchlist',
      subcategories: [
        { name: 'Movies', href: '/watchlist/movies' },
        { name: 'TV Series', href: '/watchlist/tv-series' },
      ],
      href: '/watchlist',
    },
    {
      name: 'Rated',
      subcategories: [
        { name: 'Movies', href: '/rated/movies' },
        { name: 'TV Series', href: '/rated/tv-series' },
      ],
      href: '/rated',
    },
    {
      name: 'Lists',
      subcategories: [
        { name: 'Movies', href: '/lists/movies' },
        { name: 'Test', href: '/lists/test' },
      ],
      href: '/lists',
    },
    { name: 'Reviews', href: '/reviews' },
    {
      name: 'Settings',
      subcategories: [
        { name: 'Movies', href: '/settings/movies' },
        { name: 'TV Series', href: '/settings/tv-series' },
      ],
      href: '/settings',
    },
  ];
  
  export default menuItemsData;

  