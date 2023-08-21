const { sequelize, Sequelize } = require('../config/database')

const empregadosModel = require('../models/empregados')(sequelize, Sequelize)

exports.showForm = (req, res) => {
    res.render("myform", { layout: false });
}

exports.save = (req, res) => {
    const empregado = {
        nome: req.body.nome,
        sal_bruto: req.body.sal_bruto,
        departamento: req.body.departamento
    };

    empregadosModel.create(empregado).then(data => {
        console.log('Data saved');
        res.redirect('/')
    }).catch(err => {
        console.log("Error" + err)
    })

}

exports.delete = (req, res) => {
    const id_param = req.params.id;
    empregadosModel.destroy({
        where: { id: id_param }
    }).then((result) => {
        if (!result) {
            req.status(400).send({ message: "Object not found" })
        }
        res.redirect('/show/id')
    }).catch((err) => {
        res.status(500).send({ message: "Error" + err.message })
    })
}

exports.edit = (req, res) => {
    const id_param = req.params.id;
    empregadosModel.findByPk(id_param).then(results => {
        res.render("myformedit", { layout: false, id: id_param, resultado: results })
    }).catch(err => {
        console.log("Error" + err)
        res.status(500).send({ message: "Error" + err.message })
    })
}

exports.update = (req, res) => {
    const id_param = req.params.id
    let updateObj = {}
    if (req.body.nome) updateObj["nome"] = req.body.nome;
    if (req.body.sal_bruto) updateObj["sal_bruto"] = req.body.sal_bruto;
    if (req.body.departamento) updateObj["departamento"] = req.body.departamento;
    empregadosModel.update(updateObj,
        {
            where: { id: id_param }
        }
    ).then(num => {
        if (!num) {
            req.status(400).send({ message: "n deu" })
        }
        res.redirect('/show/id')
    }).catch(err => {
        res.status(500).send({ message: "erro" + err.message })
    })
}

exports.showResult = async (req, res) => {
    const ordem = req.params.ordem;
    const count = {
        admin: await empregadosModel.count({ where: { departamento: 1 } }),
        design: await empregadosModel.count({ where: { departamento: 2 } }),
        conta: await empregadosModel.count({ where: { departamento: 3 } }),
        fab: await empregadosModel.count({ where: { departamento: 4 } }),
    }
    const minmax = {
        min: await empregadosModel.findOne(
            {
                order : ['sal_bruto', 'DESC']
            }
        ),
        max: await empregadosModel.findOne(
            {
                order : ['sal_bruto', 'ASC']
            }
        ),
    }
    empregadosModel.findAll(
        {
            order: [[ordem, ordem != "sal_bruto" ? 'ASC' : 'DESC']]

        }).then(results => {
            res.render("myresult", { resultado: results, contagens: count , minmax: minmax});

        }).catch(err => {
            console.log("Error" + err)
            res.status(500).send({ message: "Error" + err.message })
        })

}

