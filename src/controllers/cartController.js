const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const controlador ={
    // cartAdd:(req, res)=>{
    //     db.user.update(req.params.id)
    //     .then((addProduct)=>{
    //         db.user.cart =[];  // no va a funcionar es la idea, buscar manera de hacerlo
    //         cart.push(addproduct)
    //         return db.user.cart
    //         res.render('products/cart',{addProduct});
    //         })
    // },
    // //borrar producto del carrito
    // cartDestroy:(req, res)=>{
    //     db.user.update(req.params.id)
    //     .then((deleteProduct)=>{
    //         db.user.cart =[];  // no va a funcionar es la idea, buscar manera de hacerlo
    //         cart.pop(deleteProduct)
    //         return db.user.cart
    //         res.render('products/cart',{deleteProduct});
    //         })
    // }, 
   
    // //vaciar carrito
    //    cartDestroyAll:(req, res)=>{
    //     db.user.cart.delete(req.params.id)
    //     .then((deleteAllProducts)=>{
    //           // no va a funcionar es la idea, buscar manera de hacerlo
            
    //         res.render('products/cart',{deleteAllProducts});
    //         })
    // },
    cartView:(req,res)=>{
        db.Users
        db.Products.findAll({
            include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
        })
        .then((product)=>{
        res.render('products/cart', {product})
        })
        .catch(error => res.send(error))
    },
}
module.exports = controlador;
