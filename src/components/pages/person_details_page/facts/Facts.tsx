import s from './facts.module.scss';
import { iPerson } from '@/lib/interfaces/person';
import { getAge } from '@/lib/helpers/person/getAge';
import { getLifespan } from '@/lib/helpers/person/getLifeSpan';

interface iFactProps {
  label: string;
  children: React.ReactNode;
}

const Fact = ({ label, children }: iFactProps) => {
  return (
    <div className={s.fact}>
      <p>
        <strong>{label}</strong>
      </p>
      <p>{children}</p>
    </div>
  );
};

interface iFactsProps {
  person: iPerson;
}

const Facts = ({ person }: iFactsProps) => {
  const age = getAge(person.birthday);
  const lifespan = getLifespan(person.birthday, person.deathday);
  return (
    <div>
      <div className={s.facts}>
        {person.birthday ? <Fact label="Age">{person.deathday ? `Died at ${lifespan}` : age}</Fact> : null}
        {person.gender !== null && person.gender !== 0 ? <Fact label="Gender">{person.gender === 2 ? 'Male' : 'Female'}</Fact> : null}
        {person.known_for_department ? <Fact label="Known for">{person.known_for_department}</Fact> : null}
        {person.birthday ? <Fact label="Birthday">{person.birthday}</Fact> : null}
        {person.deathday ? <Fact label="Deathday">{person.deathday}</Fact> : null}
        {person.place_of_birth ? <Fact label="Birth place">{person.place_of_birth}</Fact> : null}
      </div>
    </div>
  );
};

export default Facts;
