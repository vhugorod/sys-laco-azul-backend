/* tslint:disable */
const validateDate = (date: string): boolean => {
  // tslint:disable-next-line
  const reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  return !!date.match(reg);
};

export default validateDate;
