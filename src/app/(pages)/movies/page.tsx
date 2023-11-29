import React from 'react';
import s from '@/components/shared/logo/logo.module.scss';
import Image from 'next/image';

const MoviesPage = () => {
    return (
        <div style={{ height: '100vh', textAlign: 'center' }}>
            <h1 style={{ marginTop: '8rem', color: '#854d6c' }}>🎬 Sorry... still in progress 🎬</h1>
            <Image className={s.image} src="/6.svg" alt="logo" fill/>
        </div>
    );
}

export default MoviesPage;
