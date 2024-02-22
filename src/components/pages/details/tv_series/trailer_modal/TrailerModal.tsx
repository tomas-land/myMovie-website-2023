'use client';
import { iMovieVideo } from '@/lib/interfaces/movie';
import s from './trailer_modal.module.scss';
import { useModalContext } from '@/context/ModalContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

interface iProps {
  movieVideos: iMovieVideo[];
}

const TrailerModal = ({ movieVideos }: iProps) => {
  const { closeModal } = useModalContext();

  const handleModalContentClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Prevent the modal from closing when clicking on the modal content
    e.stopPropagation();
  };

  return (
    <div className={s.trailer_modal} onClick={closeModal}>
      <div className={s.modal_content} onClick={handleModalContentClick}>
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
          {movieVideos.map((video) => (
            <SwiperSlide className={s.slide} key={video.key} onClick={closeModal}>
              <iframe className={s.video} src={`https://www.youtube.com/embed/${video.key}`} allowFullScreen allow="autoplay"></iframe>
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
