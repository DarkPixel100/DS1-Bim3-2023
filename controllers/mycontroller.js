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
        res.redirect('/show')
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
    empregadosModel.update({
        nome: req.body.nome,
        sal_bruto: req.body.sal_bruto,
        departamento: req.body.departamento
    },
        {
            where: { id: id_param }
        }
    ).then(num => {
        if (!num) {
            req.status(400).send({ message: "n deu" })
        }
        res.redirect('/show')
    }).catch(err => {
        res.status(500).send({ message: "erro" + err.message })
    })
}

exports.showResult = (req, res) => {
    const ordem = req.params.ordem;
    empregadosModel.findAll(
        {
            order: [[ordem, 'ASC']]

        }).then(results => {
            res.render("myresult", { resultado: results });

        }).catch(err => {
            console.log("Error" + err)
            res.status(500).send({ message: "Error" + err.message })
        })

}

