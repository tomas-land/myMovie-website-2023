import React from 'react';
import s from './profile_header.module.scss';

interface iProfileHeaderProps {
    children: React.ReactNode;
    title: string;
}

const ProfileHeader = ({ children, title }: iProfileHeaderProps) => {
    return (
        <div className={s.profile_header}>
            <div className={s.wrapper}><h1 className={s.title}>{title}</h1></div>
            {children}
        </div>
    )
}

export default ProfileHeader
