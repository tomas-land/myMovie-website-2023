
const menuItemsData = [
    {
      name: 'Favorites',
      subcategories: [
        { name: 'Movies', href: '/dashboard/favorites/movies' },
        { name: 'TV Series (in development)', href: '/dashboard/favorites/tv-series' },
      ],
      href: '/dashboard/favorites',
    },
    {
      name: 'Watchlist',
      subcategories: [
        { name: 'Movies (in development)', href: '/watchlist/movies' },
        { name: 'TV Series (in development)', href: '/watchlist/tv-series' },
      ],
      href: '/watchlist',
    },
    {
      name: 'Rated',
      subcategories: [
        { name: 'Movies (in development)', href: '/rated/movies' },
        { name: 'TV Series (in development)', href: '/rated/tv-series' },
      ],
      href: '/rated',
    },
    {
      name: 'Lists',
      subcategories: [
        { name: 'Movies (in development)', href: '/lists/movies' },
        { name: 'Test (in development)', href: '/lists/test' },
      ],
      href: '/lists',
    },
    { name: 'Reviews (in development)', href: '/reviews' },
    {
      name: 'Settings',
      subcategories: [
        { name: 'Account (in development)', href: '/settings/movies' },
      ],
      href: '/settings',
    },
  ];
  
  export default menuItemsData;

  