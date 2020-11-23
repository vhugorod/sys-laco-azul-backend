const convertDateToDbDate = (date: string): string => {
  return date.replace('T', ' ').replace('Z', '');
};
export default convertDateToDbDate;
