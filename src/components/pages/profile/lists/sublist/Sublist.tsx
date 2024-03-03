"use client"
import s from './sublist.module.scss'

interface iProps {
    list: any;
}

const Sublist = () => {
    return (
        <div className={s.sublist}>
            <table className={s.sublist_table}>
                <thead>
                    <tr>
                        <th className={s.columnHeader}>Title</th>
                        <th className={s.columnHeader}>My rating</th>
                        <th className={s.columnHeader}>Release date</th>
                        <th className={s.columnHeader}>Add date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={s.sublistItem}>in development</td>
                        <td className={s.sublistItem}>item2</td>
                        <td className={s.sublistItem}>item3</td>
                        <td className={s.sublistItem}>item4</td>
                    </tr>
                    <tr>
                        <td className={s.sublistItem}>in development</td>
                        <td className={s.sublistItem}>item2</td>
                        <td className={s.sublistItem}>item3</td>
                        <td className={s.sublistItem}>item4</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    )
}

export default Sublist