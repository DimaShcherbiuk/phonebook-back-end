export const createPaginationInfo = (page, perPage, totalItems) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
