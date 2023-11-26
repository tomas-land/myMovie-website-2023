'use client';
import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import s from './rating_popup.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toastError, toastSuccess } from '@/lib/toasts';
import SecondaryButton from '../../buttons/secondaty_button/SecondaryButton';


interface iProps {
    handleSetIsRatingOpened: (value: boolean) => void;
    movieId: string;
    isRated: boolean;
    setIsRated: (value: boolean) => void;
}

const RatingPopup = ({ handleSetIsRatingOpened, movieId, isRated, setIsRated }: iProps) => {
    const [selectedRating, setSelectedRating] = useState<string | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (selectedRating !== null) {
            rateMovie();
        }
    }, [selectedRating]);

    const handleStarClick = (rating: string) => {
        setSelectedRating(rating);
    }
    // save rating to db, or update if already rated 
    const { mutate: rateMovie } = useMutation({
        mutationFn: async () => await axios.post(`/api/ratings/save_rating`, { movie_id: movieId, rating: selectedRating }),
        onSuccess: () => {
            const message = isRated ? 'Rating updated' : 'Thank you for your rating';
            toastSuccess(message);
            queryClient.invalidateQueries({ queryKey: ['ratings'] });
            handleSetIsRatingOpened(false);
        },
        onError: () => {
            toastError('Something went wrong');
            handleSetIsRatingOpened(false);
        },
    });
    // delete rating from db and mutate cache
    const { mutate: deleteRating } = useMutation({
        mutationFn: async () => await axios.delete(`/api/ratings/delete_rating?movie_id=${movieId}`),
        onMutate: async () => {
            queryClient.cancelQueries({ queryKey: ['ratings'] });
            const previousRatings = queryClient.getQueryData(['ratings']);
            queryClient.setQueryData(['ratings'], (old: any) => [...old, { contentId: movieId }]);
            return { previousRatings };
        },
        onSuccess: () => {
            toastSuccess('Rating deleted');
            queryClient.invalidateQueries({ queryKey: ['ratings'] });
            handleSetIsRatingOpened(false);
            setIsRated(false);

        },
        onError: () => {
            toastError('Something went wrong');
            handleSetIsRatingOpened(false);
        },
    });

    const handleDeleteRating = () => deleteRating()

    return (
        <div className={s.rating_popup}>
            <div className={s.rating_popup_wrapper}>
                <div className={s.rating_popup_header}>
                    <h2 className={s.title}>How would you rate it?</h2>
                </div>
                <div className={s.rating_popup_content}>
                    <div className={s.rating_popup_stars}>
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className={s.star_wrapper} onClick={() => handleStarClick((index + 1).toString())}>
                                <FiStar className={s.star}
                                    size={35}
                                    fill={selectedRating !== null && index < Number(selectedRating) ? '#3eada6' : '#16423f'}
                                    onClick={() => handleStarClick((index + 1).toString())}
                                />
                                <span className={s.star_number}>{index + 1}</span>
                            </div>
                        ))}
                    </div>
                    {isRated ? <SecondaryButton label="unrate" handleClick={handleDeleteRating} /> : null}
                </div>
            </div>
        </div>
    )
};

export default RatingPopup;
