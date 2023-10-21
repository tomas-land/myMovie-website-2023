'use client';
import { iMovieVideo } from '@/lib/interfaces';
import s from './trailer_modal.module.scss';
import { useModalContext } from '@/lib/context/ModalContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

interface iProps {
  movieVideo: iMovieVideo[];
}

const TrailerModal = ({ movieVideo }: iProps) => {
  const { closeModal } = useModalContext();

  const handleModalClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div className={s.trailer_modal} onClick={closeModal}>
      <div className={s.modal_content} onClick={handleModalClick}>
        <Swiper
          className={s.swiper}
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
            type: 'bullets',
            el: '.custom-pagination',
          }}
          navigation={{
            prevEl: '.custom-prev-button',
            nextEl: '.custom-next-button',
          }}
        >
          {movieVideo.map((video) => (
            <SwiperSlide className={s.slide} key={video.key}>
              <iframe className={s.video} src={`https://www.youtube.com/embed/${video.key}`} allowFullScreen allow='autoplay'></iframe>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={`${s.custom_pagination} custom-pagination`}>
          <span></span>
        </div>
        <div className={s.custom_navigation}>
          <button className={`${s.custom_button} custom-prev-button`}>
            <TfiAngleLeft size={30} />
          </button>
          <button className={`${s.custom_button} custom-next-button`}>
            <TfiAngleRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
{
  /* <iframe width="1268" height="713" src="https://www.youtube.com/embed/iPGXk-i-VYU" title="Nextjs Full stack course" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */
}
