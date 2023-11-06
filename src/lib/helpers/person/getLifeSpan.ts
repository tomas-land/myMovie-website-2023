import dayjs from 'dayjs';

export function getLifespan(birthDate: string | null, deathDate?: string | null) {
  const birthYear = dayjs(birthDate).format('YYYY');
  const deathYear = dayjs(deathDate).format('YYYY');
  const lifespan = Number(deathYear) - Number(birthYear);
  return lifespan;
}
