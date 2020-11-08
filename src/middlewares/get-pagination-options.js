const getPaginationOptions = (req, res, next) => {
  const { per_page, page, order, sort } = req.query;

  req.paginationOptions = {
    per_page: per_page > 0 ? per_page : null,
    page: page > 0 ? page : null,
    order:
      order &&
      (order.toLowerCase() === 'name' ||
        order.toLowerCase() === 'id' ||
        order.toLowerCase() === 'country')
        ? order.toLowerCase()
        : null,
    sort:
      sort && (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')
        ? sort.toLowerCase()
        : null
  };

  next();
};

module.exports = { getPaginationOptions };
