const { sequelize, Sequelize } = require("../config/database");
const Op = Sequelize.Op;
const empregadoModel = require("../models/empregados.js")(sequelize, Sequelize);

exports.showForm = (req, res) => {
  res.render("myform", { layout: false });
};

exports.save = (req, res) => {
  const empregado = {
    nome: req.body.nome,
    sal_bruto: req.body.sal_bruto,
    departamento: req.body.departamento,
  };

  empregadoModel
    .create(empregado)
    .then((data) => {
      console.log("Data saved");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

exports.delete = (req, res) => {
  const id_param = req.params.id;
  empregadoModel
    .destroy({
      where: { id: id_param },
    })
    .then((result) => {
      if (!result) {
        req.status(400).send({ message: "Object not found" });
      }
      res.redirect("/show/");
    })
    .catch((err) => {
      res.status(500).send({ message: "Error" + err.message });
    });
};

exports.edit = (req, res) => {
  const id_param = req.params.id;
  empregadoModel
    .findByPk(id_param)
    .then((results) => {
      res.render("myformedit", {
        layout: false,
        id: id_param,
        resultado: results,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
      res.status(500).send({ message: "Error" + err.message });
    });
};

exports.update = (req, res) => {
  const id_param = req.params.id;
  let updateObj = {};
  if (req.body.nome) updateObj["nome"] = req.body.nome;
  if (req.body.sal_bruto) updateObj["sal_bruto"] = req.body.sal_bruto;
  if (req.body.departamento) updateObj["departamento"] = req.body.departamento;
  empregadoModel
    .update(updateObj, {
      where: { id: id_param },
    })
    .then((num) => {
      if (!num) {
        req.status(400).send({ message: "n deu" });
      }
      res.redirect("/show/");
    })
    .catch((err) => {
      res.status(500).send({ message: "erro" + err.message });
    });
};

exports.showResult = async (req, res) => {
  const minmax = {
    min: await empregadoModel.findOne({
      order: [["sal_bruto", "DESC"]],
    }),
    max: await empregadoModel.findOne({
      order: [["sal_bruto", "ASC"]],
    }),
  };

  const count = {
    admin: await empregadoModel.count({ where: { departamento: 1 } }),
    design: await empregadoModel.count({ where: { departamento: 2 } }),
    conta: await empregadoModel.count({ where: { departamento: 3 } }),
    fab: await empregadoModel.count({ where: { departamento: 4 } }),
  };

  let ordem = 'id', search = '';
  if (req.body) {
    if (req.body.ordem != undefined) ordem = req.body.ordem;
    if (req.body.nome != undefined) search = req.body.nome;
  }
  empregadoModel
    .findAll({
      where: {
        nome: {
          [Op.substring]: search,
        },
      },
      order: [[ordem, ordem != "sal_bruto" ? "ASC" : "DESC"]],
    })
    .then((results) => {
      res.render("myresult", { results, count, minmax });
    })
    .catch((err) => {
      console.log("Error" + err);
      res.status(500).send({ message: "Error" + err.message });
    });
};
