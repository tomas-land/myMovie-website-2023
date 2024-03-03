import { BiCameraMovie, BiTv } from "react-icons/bi";
import { PiMaskHappy } from "react-icons/pi";
import { FiBookmark } from 'react-icons/fi';

const lists = [
    { title: 'Favorite Movies', icon: <BiCameraMovie /> },
    { title: 'Favorite Tv-series', icon: <BiTv /> },
    { title: 'Favorite Actors', icon: <PiMaskHappy /> },
    { title: 'Watchlist', icon: <FiBookmark /> },
];

export default lists;