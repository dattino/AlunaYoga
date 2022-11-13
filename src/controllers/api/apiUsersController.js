//Requerir Express-Validator
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");

const controlador = {

    vistaLista: (req, res) => {
        db.Users.findAll()
            .then((users) => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: users.length,
                        url: 'api/v1/users'
                    },
                users
            })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({mensaje: 'Error de conexion'})
    });
},
detail:(req, res) => {
    db.Users.findByPk(req.params.id)
    .then((user)=>{
        return res.status(200).json({
            meta: {
                status: 200,
                url: 'api/v1/users/detail'
            },
           user
        })
    })            
    .catch(error => {
        console.log(error)
        res.status(500).json({mensaje: 'Error de conexion'})
    });

}
}
module.exports = controlador;