import s from './person_details.module.scss';
import { iPerson, iPersonMovieCredit } from '@/lib/interfaces/person';
import ImageFrame from '@/components/shared/image_frame/ImageFrame';
import { IoPerson } from 'react-icons/io5';
import Facts from '../facts/Facts';
import Bio from '../bio/Bio';
import Credits from '../credits/Credits';

interface iProps {
  person: iPerson;
  personMovieCredits: iPersonMovieCredit[];
}

const PersonDetails = ({ person, personMovieCredits }: iProps) => {
  return (
    <div className={s.person_details}>
      <div className={s.backdrop}></div>
      <div className={s.left_column}>
        <div className={s.poster_wrapper}>
          <ImageFrame imagePath={person.profile_path} alt={person.name} icon={<IoPerson />} width={256} height={384} />
        </div>
        <Facts person={person} />
      </div>
      <div className={s.right_column}>
        <Bio person={person} />
        <Credits person={person} personMovieCredits={personMovieCredits} />
      </div>
    </div>
  );
};

export default PersonDetails;
