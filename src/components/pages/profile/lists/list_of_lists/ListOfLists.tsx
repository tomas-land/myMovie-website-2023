"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiInfo, PiListPlusBold, PiShareLight, PiDownloadSimple } from "react-icons/pi";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import Tooltip from '@/components/shared/tooltip/Tooltip';
import { iFavorite, iFavoriteActor } from '@/lib/interfaces/favorite';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';
import listOfLists from '@/lib/constants/listOflists';
import { deleteListItems } from '@/lib/actions/deleteListItems';
import s from './list_of_lists.module.scss'
import { useModalContext } from "@/context/ModalContext";
import CreateNewListModal from '../CreateNewListModal/CreateNewListModal';
import Sublist from '../sublist/Sublist';


interface iProps {
    favoriteMovies: iFavorite[],
    favoriteTvSeries: iFavorite[],
    favoriteActors: iFavoriteActor[],
    watchlist: iWatchlistItem[]
}

const ListOfLists = ({ favoriteMovies, favoriteTvSeries, favoriteActors, watchlist }: iProps) => {
    const router = useRouter()
    const { openModal } = useModalContext();
    const [isSubListOpened, setIsSubListOpened] = useState(false);
    const [currentListIndex, setCurrentListIndex] = useState<number | null>(null);
    const lists = [favoriteMovies, favoriteTvSeries, favoriteActors, watchlist];


    useEffect(() => {
        router.refresh()
    }, [])

    const listCounts = {
        'Favorite Movies': favoriteMovies.length,
        'Favorite Tv-series': favoriteTvSeries.length,
        'Favorite Actors': favoriteActors.length,
        'Watchlist': watchlist.length,
    };

    const handleDeleteListItems = (tableName: string) => {
        deleteListItems(tableName);
    };

    const handleOpenSubList = (index: number) => {
        if (currentListIndex === index) {
            // Clicking on the same list item, toggle the sublist
            setIsSubListOpened(!isSubListOpened);
        } else {
            // Clicking on a different list item, close the previous sublist and open the new one
            setCurrentListIndex(index);
            setIsSubListOpened(true);
        }
    }

    return (
        <section className={s.lists}>
            <div className={s.header}>
                <h2 className={s.title} >Lists</h2>
                <div className={s.btns}>
                    <Tooltip tooltipText='Create new list'>
                        <button className={s.btn} onClick={openModal}><PiListPlusBold /></button>
                    </Tooltip>
                    <CreateNewListModal />
                    <Tooltip tooltipText='You can share, download and clear out default lists or create and delete your lists'>
                        <button className={s.btn}><PiInfo /></button>
                    </Tooltip>
                </div>
            </div>
            <ul className={s.list}>
                {listOfLists.map((list, index) => (
                    <li key={index} className={s.list_item} onClick={() => handleOpenSubList(index)} >
                        <div className={s.wrapper} >
                            <div className={s.icon_title_wrapper}>
                                <span className={s.list_item_icon}>{list.icon}</span>
                                <h3 className={s.list_item_title}>{list.title}</h3>
                                <span className={s.items_count}>{listCounts[list.title as keyof typeof listCounts]}</span>
                            </div>
                            <div className={s.btns} onClick={e => e.stopPropagation()}>
                                <Tooltip tooltipText='Share with other users'>
                                    <button className={s.btn}><PiShareLight /></button>
                                </Tooltip>
                                <Tooltip tooltipText='Download'>
                                    <button className={s.btn}><PiDownloadSimple /></button>
                                </Tooltip>
                                <Tooltip tooltipText='Remove items from list'>
                                    <button className={s.btn} onClick={() => handleDeleteListItems(list.title)}><MdOutlinePlaylistRemove /></button>
                                </Tooltip>
                            </div>
                        </div>
                        {isSubListOpened && currentListIndex === index ?
                            <Sublist /> : null}
                    </li>

                ))}
            </ul>
            <hr className={s.divider} />
        </section >
    )
}

export default ListOfLists