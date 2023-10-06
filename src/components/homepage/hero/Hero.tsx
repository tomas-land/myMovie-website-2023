import React from 'react';
import Image from 'next/image';

import s from './hero.module.scss';

import Input from '@/components/shared/input/Input';
import Button from '@/components/shared/button/Button';

const Hero = () => {
  return (
    <section className={s.hero}>
      <Image className={s.hero_image} src="/hero_blur_edges.png" priority={true}  alt="picture of a movie" width={0} height={0} sizes="100vw" style={{ width: '250%', height: '150%' }} />
      <div className={s.hero_overlay}>
        <div className={s.hero_content}>
          <div className={s.hero_title_wrapper}>
            <h1 className={s.hero_title}>Discover </h1>
            <h1 className={s.hero_title}>Collect </h1>
            <h1 className={s.hero_title}>Recall</h1>
          </div>
          {/* <p className={s.hero_subtitle}>MyMovie is a place where you can discover new movies, collect your favorites and recall them whenever you want.</p> */}
          <p className={s.hero_subtitle}>Make your movies collection great again</p>
          <div className={s.search}>
            <Input placeholder="Search for a movie..." maxLength={40} />
            <Button label="Search" position="absolute" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
