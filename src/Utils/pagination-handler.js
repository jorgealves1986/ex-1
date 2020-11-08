const paginationHandler = ({ order, sort, per_page, page }, data) => {
  let numberOfPages = !per_page ? 1 : Math.ceil(data.length / per_page);

  if (order && sort) {
    // if we have both order and sort, we sort by that order
    data.sort((a, b) => {
      if (a[order] < b[order]) {
        return sort === 'asc' ? -1 : 1;
      }
      if (a[order] > b[order]) {
        return sort === 'desc' ? -1 : 1;
      }
      return 0;
    });
  } else if (sort) {
    // if we only have sort, we sort by id
    data.sort((a, b) => (sort === 'asc' ? a.id - b.id : b.id - a.id));
  } else if (order) {
    // if we only have order, we sort asc
    data.sort((a, b) => {
      if (a[order] < b[order]) {
        return -1;
      }
      if (a[order] > b[order]) {
        return 1;
      }
      return 0;
    });
  }

  if (!per_page || per_page >= data.length) {
    return data;
  }

  page = !page || page > numberOfPages ? 1 : page;

  return data.slice(0 + per_page * (page - 1), per_page * page);
};

module.exports = { paginationHandler };
