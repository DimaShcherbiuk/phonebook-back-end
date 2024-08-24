const parseCategory = (value) => {
  const categorys = ["books", "electronics", "clothing", "other"];
  if (categorys.includes(value)) {
    return value;
  }
};

const parseFloatNumber = (number) => {
  if (typeof number !== "string") return;
  const parsedFloat = Number.parseFloat(number);
  if (Number.isNaN(parsedFloat)) return;
  return parsedFloat;
};

export const parseFilters = (query) => {
  return {
    category: parseCategory(query.category),
    minPrice: parseFloatNumber(query.minPrice),
    maxPrice: parseFloatNumber(query.maxPrice),
  };
};
