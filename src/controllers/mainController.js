const express = require("express");
//--------Sequelize----------
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");



//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Category, Product, etc} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const products = db.Products;
const categorys = db.Categorys;
const marcas = db.Marcas;
const talles = db.Talles;


const controlador = {
    vistaHome: (req, res) => {
        let promCategorys = categorys.findAll({ where: { logicDelete: 1 } })
        let promMarcas = marcas.findAll({ where: { logicDelete: 1 } })
        let promProducts = products.findAll({
            where: { logicDelete: 1, discount:{[Op.gt]:0} },
            limit:4,
            include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }]
        })
        Promise.all([promProducts, promCategorys, promMarcas])
            .then(([products, allCategorys, allMarcas]) => {

                res.render('home', { products, allCategorys, allMarcas });
            })
            .catch(error => res.send(error))
    },

    vistaAdmins: (req, res) => {
        res.render('admins', { title: 'Inicio', estilo: estilos.home });
    },
};

module.exports = controlador;