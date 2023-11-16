import React from 'react'
import { iUser } from '@/lib/interfaces/user'
import s from './user_info.module.scss'
import { FaUser } from 'react-icons/fa'
import Image from 'next/image'
import { iSession } from '@/lib/interfaces/session'
import dayjs from 'dayjs'

interface iUserInfo {
    user: iUser
    session: iSession
}

const UserInfo = ({ user, session }: iUserInfo) => {
    const image = user.image ?? session.user?.image  // if no user image, use session image
    const formattedDate = dayjs(user.createdAt).format('MMMM YYYY');
   
    return (
        <div className={s.user_info}>
            <div className={s.container}>
                <div className={s.image_wrapper}>
                    {image ? <Image src={image} alt="User Avatar" width={40} height={40} className={s.image} /> : <FaUser size={40} className={s.image} />}
                </div>
                <div className={s.info}>
                    <div className={s.name_email_wrapper}>
                        <h2 className={s.name}>{user.name || user.username || 'Anonymous'}</h2>
                        <p className={s.email}>{user.email}</p>
                    </div>
                    <p className={s.member}>member since {formattedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo