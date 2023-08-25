const helpers = {
  parseReal: (value) => {
    const BRL = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return BRL.format(value);
  },
  ifEquals : (a, b) => {
    return a === b;
  }
};

module.exports = helpers;