import React from 'react';
import { IoPerson } from 'react-icons/io5';
import s from './image_frame.module.scss';
import Image from 'next/image';

interface iProps {
  imagePath: string;
  alt: string;
  icon: React.ReactNode;
  width?: number;
  height?: number;
}

const ImageFrame = ({ imagePath, alt, icon, width, height }: iProps) => {
  return <div className={s.frame}>{imagePath ? <Image className={s.image} src={`https://image.tmdb.org/t/p/original/${imagePath}`} alt={alt} width={width} height={height} /> : <div className={s.no_image}>{icon}</div>}</div>;
};

export default ImageFrame;
