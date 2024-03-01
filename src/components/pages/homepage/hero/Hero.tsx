"use client"
import Image from 'next/image';
import HeroImage from '/public/hero_blur_edges.png';
import s from './hero.module.scss';
import MovingText from 'react-moving-text'


const Hero = () => {
  return (
    <section className={s.hero}>
      <Image className={s.hero_image} src={HeroImage} alt="picture of a movie" priority placeholder="blur" fill quality={100} />
      <div className={s.hero_overlay}>
        <div className={s.hero_content}>
          <div className={s.hero_title_wrapper}>
            <MovingText
              type="fadeIn"
              duration="3000ms"
              delay="0s"
              direction="normal"
              timing="ease-in-out"
              iteration="1"
              fillMode="none">
              <h1 className={s.hero_title}>Discover Collect Review </h1>
            </MovingText>
            <MovingText
              type="fadeInFromBottom"
              duration="3000ms"
              delay="0s"
              direction="normal"
              timing="ease-in-out"
              iteration="1"
              fillMode="none">
              <p className={s.hero_subtitle}>Make your movies collection great again</p>
            </MovingText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
