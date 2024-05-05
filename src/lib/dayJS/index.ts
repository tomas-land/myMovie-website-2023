import dayjs from 'dayjs';

const startOFMonthISO = dayjs().startOf('month').toISOString();
const startOFYearISO = dayjs().startOf('year').toISOString();
const startOFPreviousMonthISO = dayjs().subtract(1, 'month').startOf('month').toISOString();
const endOFPreviousMonthISO = dayjs().subtract(1, 'month').endOf('month').toISOString();
const startOFMonth = dayjs().startOf('month').format('YYYY-MM-DD');
const startOFYear = dayjs().startOf('year').format('YYYY-MM-DD');
const endOFYear = dayjs().endOf('year').format('YYYY-MM');
const currentYear = dayjs().format('YYYY');
const currentMonth = dayjs().format('YYYY-MM');
const currentDate = dayjs().format('YYYY-MM-DD');
const yearMonthDayFormat = dayjs().format('YYYY-MM-DD');
const last30days = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
const periodOFLast6months = dayjs().subtract(6, 'month').format('YYYY-MM-DD');
const TwoMonthsBeforeDate = dayjs().subtract(2, 'month').format('YYYY-MM-DD');

const formateDate = (date: string) => {
  const formatedDate = dayjs(date).format('YYYY MM-DD');
  return formatedDate;
};

export {yearMonthDayFormat, periodOFLast6months, last30days, currentDate, currentYear, TwoMonthsBeforeDate, startOFYear, startOFYearISO, endOFYear, currentMonth, formateDate, startOFMonth, startOFPreviousMonthISO, endOFPreviousMonthISO };
