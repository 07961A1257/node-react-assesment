const sortNames = (a, b) => {
  return a.name > b.name ? 1 : -1;
};

module.exports = { sortNames };
