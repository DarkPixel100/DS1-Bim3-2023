const { sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  var empregados = sequelize.define(
    "empregado",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
      },
      sal_bruto: {
        type: DataTypes.DOUBLE,
      },
      sal_liquido: {
        type: DataTypes.VIRTUAL,
        get() {
          const INSS = this.sal_bruto * 0.11;
          let IRRF = 0;
          let baseIRRF = this.sal_bruto - INSS;
          for (const limite of [
            [4668.68, 0.275],
            [3751.06, 0.225],
            [2826.65, 0.15],
            [1903.98, 0.075],
          ]) {
            if (baseIRRF > limite[0]) {
              IRRF += (baseIRRF - limite[0]) * limite[1];
              baseIRRF = limite[0];
            }
          }
          const sal_liquido = this.sal_bruto - INSS - IRRF;
          return sal_liquido.toFixed(2);
        },
      },
      departamento: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  return empregados;
};
