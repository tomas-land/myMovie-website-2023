import dayjs from 'dayjs';

export function getAge(birthDate: string) {
  const currentYear = dayjs().format('YYYY');
  const birthYear = dayjs(birthDate).format('YYYY');
  const age = Number(currentYear) - Number(birthYear);
  return age;
}