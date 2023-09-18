import dayjs from 'dayjs';

const startOFMonthISO = dayjs().startOf('month').toISOString();
const startOFYearISO = dayjs().startOf('year').toISOString();
const startOFPreviousMonthISO = dayjs().subtract(1, 'month').startOf('month').toISOString();
const endOFPreviousMonthISO = dayjs().subtract(1, 'month').endOf('month').toISOString();
const startOFMonth = dayjs().startOf('month').format('YYYY-MM-DD');
const startOFYear = dayjs().startOf('year').format('YYYY-MM');
const endOFYear = dayjs().endOf('year').format('YYYY-MM');
const currentMonth = dayjs().format('YYYY-MM');
const currentDay = dayjs().format('YYYY-MM-DD');
const last30days = dayjs().subtract(30, 'day').format('YYYY-MM-DD');

const formateDate = (date: string) => {
  const formatedDate = dayjs(date).format('YYYY MM-DD');
  return formatedDate;
};



export {currentDay,last30days, startOFYear,startOFYearISO, endOFYear, currentMonth, formateDate, startOFMonth, startOFPreviousMonthISO, endOFPreviousMonthISO };
