const helpers = {
  parseReal: (value) => {
    const BRL = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return BRL.format(value);
  },
  ifEqual: (value1, value2, options) => {
    if (value1 == value2) {
        return options.fn(this);
    }
}

};

module.exports = helpers;