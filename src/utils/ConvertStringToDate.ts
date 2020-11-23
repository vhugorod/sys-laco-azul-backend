import { parseISO } from 'date-fns';

const convertStringToDate = (date: string): Date => {
  const [day, month, year] = date.split('/');

  const formattedDate = parseISO(`${year}-${month}-${day}`);

  return formattedDate;
};

export default convertStringToDate;
