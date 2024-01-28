import PersonDetails from '@/components/pages/details/person/person_details/PersonDetails';
import BackdropImage from '@/components/shared/backdrop_image/BackdropImage';
import { sortMovieCreditsByReleaseDate } from '@/lib/helpers/movies/sortMovieCreditsByReleaseDate';
import { getPersonById, getPersonMovieCreditsById } from '@/lib/requests/persons';

interface iProps {
  params: {
    id: string;
  };
}

const PersonPage = async ({ params }: iProps) => {
  const { id } = params;
  const person = await getPersonById(id);
  const personMovieCredits = sortMovieCreditsByReleaseDate(await getPersonMovieCreditsById(id));
  return (
    <div>
      <BackdropImage person={person} />
      <PersonDetails person={person} personMovieCredits={personMovieCredits} />
    </div>
  );
};

export default PersonPage;
