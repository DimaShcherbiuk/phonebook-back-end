const parseInt = (number, defaultNumber) => {
  if (typeof number !== "string") return defaultNumber;
  const parsedNumber = Number.parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultNumber;
  return parsedNumber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  return {
    page: parseInt(page, 1),
    perPage: parseInt(perPage, 5),
  };
};
