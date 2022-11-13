const path = require('path');
//-----------Validator--------------
const { validationResult } = require('express-validator');
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

// .Promesas



const controller = {
    //---------------------------------GUESTS-------------------------------------
    //todos los productos
    list: (req, res) => {
        let promCategorys = categorys.findAll({ where: { logicDelete: 1 } })
        let promMarcas = marcas.findAll({ where: { logicDelete: 1 } })
        let promProducts = products.findAll({
            where: { logicDelete: 1 },
            include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }]
        })
        Promise.all([promProducts, promCategorys, promMarcas])
            .then(([products, allCategorys, allMarcas]) => {

                res.render('products/products', { products, allCategorys, allMarcas });
            })
            .catch(error => res.send(error))
    },
    //detalle de un producto
    detail: (req, res) => {
        products.findByPk(req.params.id, {
            include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }]
        })
            .then((product) => {
                res.render("products/detail", { product })
            })
            .catch(error => res.send(error))
    },
    //Buscar prodcutos
    search: (req, res) => {
        let search = req.query.search
        let promCategorys = categorys.findAll()
        let promMarcas = marcas.findAll()
        let promProducts = products.findAll({
            where: { name: { [Op.like]: '%' + `${search}` + '%' } },
            include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }]
        })
        Promise.all([promProducts, promCategorys, promMarcas])
            .then(([products, allCategorys, allMarcas]) => {
                res.render('products/products', { products, allCategorys, allMarcas });
            })
            .catch(error => res.send(error))


    },
    //---------------------------- Menu----------------------------------
    // menuCategory: (req, res)=>{
    //     let promCategorys = categorys.findAll()
    //     let promMarcas = marcas.findAll()
    //     let promProducts = products.findAll({
    //         where:{ category_id:{  [Op.eq] : req.body.category} },
    //         include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
    //     })
    //     Promise.all([promProducts, promCategorys, promMarcas])
    //     .then(([products, allCategorys, allMarcas])=>{
    //         res.render('products/products',{ products, allCategorys, allMarcas});
    //     })
    //     .catch(error => res.send(error))
    // },
    //---------------------------- Filro----------------------------------
    filter: (req, res) => {
        //---------categoria-------------
        let categoria = req.body.category;
        //---------marca-------------
        let marca = req.body.marca;
        //-----------------------condicional where------------------
        let whereIf = {};
        if (categoria && !marca) { whereIf = { category_id: categoria } }
        else if (!categoria && marca) { whereIf = { marca_id: marca } }
        else if (categoria && marca) { whereIf = [{ category_id: categoria }, { marca_id: marca }] }
        //-----------------------------orden------------
        //-------precio------------
        let orderPrice = req.body.orderPrice;
        let price = "";
        if (orderPrice == 1) { price = ["finalPrice"] } else { price = ["finalPrice", "DESC"] };
        //----------nombre---------
        let orderAlfa = req.body.orderAlfa;
        let alfa = "";
        if (orderAlfa == 1) { alfa = ["name"] } else { alfa = ["name", "DESC"] };
        //-------fecha------
        let orderDate = req.body.orderDate;
        if (orderDate) { ordeDateIf = ["created_at"] };
        // condicional Order
        let orderIf = "";
        if (orderPrice && !orderAlfa && !orderDate) { orderIf = [price] }
        else if (orderPrice && orderAlfa && !orderDate) { orderIf = [price, alfa] }
        else if (orderPrice && orderAlfa && orderDate) { orderIf = [price, alfa, "created_at"] }
        else if (!orderPrice && orderAlfa && !orderDate) { orderIf = [alfa] }
        else if (!orderPrice && orderAlfa && orderDate) { orderIf = [alfa, "created_at"] }
        else if (!orderPrice && !orderAlfa && orderDate) { orderIf = ["created_at"] };
        //-----------promesas---------------
        let promCategorys = categorys.findAll()
        let promMarcas = marcas.findAll()
        let promProducts = products.findAll({
            where: whereIf,
            order: orderIf,
            include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }]
        })
        Promise.all([promProducts, promCategorys, promMarcas])
            .then(([products, allCategorys, allMarcas]) => {
                console.log(orderIf)


                res.render('products/products', { products, allCategorys, allMarcas });
            })
            .catch(error => res.send(error))


    },
    //---------------------------------USERS--------------------------------------
    // comprar ---------- en construccion
    buy: (req, res) => {
        // cantidades
        let cant = 1;
        //arrays de ids o de id de prodcutos
        let productsIdCart = [];
        //ver si es un All o un ByPk
        products.findByPk({
            where: productsIdCart,
        })
            .then(product => {
                return product.decrement('stock', { by: cant })
            }).then(product => {
                res.redirect("/")
                // Postgres will return the updated user by default (unless disabled by setting { returning: false })
                // In other dialects, you'll want to call user.reload() to get the updated instance...
            })
            .catch(error => res.send(error))
    },
    //---------------------------------ADMINS / CRUD-----------------------------------------------
    //---------------------------- Products----------------------------------
    //lista        
    productsList: (req, res) => {

        products.findAll({
            // where:{logicDelete: 1 },
            include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }]
        })
            .then((allProducts) => {
                res.render('products/list', { allProducts });
            })
            .catch(error => res.send(error))
    },
    //detalle de un producto
    detail: (req, res) => {
        products.findByPk(req.params.id, {
            include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }]
        })
            .then((product) => {
                res.render("products/detail", { product })
            })
    },

    //crear Producto

    create: async (req, res) => {
        try {
            //-------------promesas-----------
            const allCategorys = await categorys.findAll({ where: { logicDelete: 1 } })
            const allMarcas = await marcas.findAll({ where: { logicDelete: 1 } })
            const allTalles = await talles.findAll()
            res.render('products/product-create', { allCategorys, allMarcas, allTalles })

        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In productController create!!!');
            console.log(error);
            res.send("Error de proceso")
        }
    },

    store: async (req, res) => {
        try {
            //validaciones
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                let allCategorys = await categorys.findAll({ where: { logicDelete: 1 } });
                let allMarcas = await marcas.findAll({ where: { logicDelete: 1 } });
                let allTalles = await talles.findAll();

                return res.render('products/product-create', { 
                    allCategorys, 
                    allMarcas, 
                    allTalles,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                })
            };
            //si no hay errores --->

            //--------------fecha----------------
            let date = new Date();

            // -----------descuento--------
            let discount = req.body.discount;

            //---Precio Final -----
            let price = req.body.price;
            let finalPrice = price;
            if (discount != 0) {
                finalPrice = (price - (price * discount / 100))
            } else {
                discount = 0
            }

            //----- imagen------
            let imagen = "";
            if (!req.file) { imagen = "default.jpg" }
            else {
                imagen = req.file.filename
            }

            let product = {
                name: req.body.name,
                category_id: req.body.category_id,
                price: req.body.price,
                discount: req.body.discount,
                finalPrice: finalPrice,
                description: req.body.description,
                talle_id: req.body.talle_id,
                marca_id: req.body.marca_id,
                stock: req.body.stock,
                image: imagen,
                created_at: date
            }
            // promesas
            await products.create(product);
            return res.redirect("/");

        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In productController store!!!');
            console.log(error);
            res.send("Error de proceso")
        }

    },
    //editar productos
    edit: async (req, res) => {
        try {
            let product = await products.findByPk(req.params.id, { include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }] })
            let allCategorys = await categorys.findAll()
            let allMarcas = await marcas.findAll()
            let allTalles = await talles.findAll()
            res.render('products/product-edit', { product, allCategorys, allMarcas, allTalles });
        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In productController update!!!');
            console.log(error);
            res.send("Error de proceso")
        }
    },

    update: async (req, res) => {
        try {
            id = req.body.id
            // validaciones
            const resultEditValidation = validationResult(req);

            if (resultEditValidation.errors.length > 0) {
                let product = await products.findByPk(id, { include: [{ association: "categorys" }, { association: "marcas" }, { association: "talles" }] })
                let allCategorys = await categorys.findAll()
                let allMarcas = await marcas.findAll()
                let allTalles = await talles.findAll()
                return res.render('products/product-edit', { product, allCategorys, allMarcas, allTalles, 
                    errors: resultEditValidation.mapped(),
                    oldData: req.body,
                })
            };

            //--------------fecha----------------
            let date = new Date();
            
            //---Precio Final -----
            let price = req.body.price;
            let discount = req.body.discount;
            let finalPrice = price;
            if (discount != 0) { finalPrice = (price - (price * discount / 100)) }
            
            // -----Imagen----
            let editProduct = {
                name: req.body.name,
                category_id: req.body.category_id,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description,
                marca_id: req.body.marca_id,
                stock: req.body.stock,
                finalPrice: finalPrice,
                updated_at: date,
            }
            if (req.file) { 
                editProduct.image = req.file.filename 
            }
            if (req.body.talle_id) { 
                editProduct.talle_id = req.body.talle_id 
            }

            // promesas
            await products.update(editProduct, {
                where: {
                    id: id
                }
            })
            
                
            return res.redirect(`/products/detail/${id}`)
                
        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In productController update!!!');
            console.log(error);
            res.send("Error de proceso")
        }
    },

    //borrar productos
    delete: (req, res) => {
        products.findByPk(req.params.id)
            .then((product) => {
                console.log(product);
                res.render('products/product-delete', { product });
            })
            .catch(error => res.send(error))
    },
    destroy: (req, res) => {
        products.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/products');
    },
    LogicDelete: (req, res) => {
        let logicDeleteProduct = {
            logicDelete: 0
        }
        products.update(
            logicDeleteProduct
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((products) => {

                res.redirect("/products")
            })
    },
    restoreProduct: (req, res) => {
        let productRestored = {
            logicDelete: 1
        }
        products.update(
            productRestored
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((products) => {

                res.redirect("/products")
            })
    },
    //---------------------------- Category----------------------------------
    //lista
    listCategorys: (req, res) => {
        categorys.findAll()
            .then((allCategorys) => {
                res.render('products/categorys/list', { allCategorys });
            })
            .catch(error => res.send(error))
    },
    // crear
    storeCategory: (req, res) => {
        let date = new Date();
        categorys.create({
            nombre: req.body.nombre,
            created_at: date
        })
            .then((category) => {
                res.redirect("/products/categorys");
            })
    },
    // editar
    updateCategory: (req, res) => {
        let date = new Date();
        let editCategory = {
            nombre: req.body.nombre,
            updated_at: date
        }
        categorys.update(
            editCategory
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((category) => {

                res.redirect("/products/categorys")
            })
    },

    //borrar 
    LogicCategoryDelete: (req, res) => {
        let logicDeleteCategory = {
            logicDelete: 0
        }
        categorys.update(
            logicDeleteCategory
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((allCategorys) => {

                res.redirect("/products/categorys")
            })
    },
    restoreCategory: (req, res) => {
        let categoryRestored = {
            logicDelete: 1
        }
        categorys.update(
            categoryRestored
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((allCategorys) => {

                res.redirect("/products/categorys")
            })
    },
    destroyCategory: (req, res) => {
        categorys.destroy({
            where: { id: req.params.id }
        });
        res.redirect("/products/categorys");
    },

    //---------------------------- Marcas----------------------------------

    //lista
    listMarcas: (req, res) => {
        marcas.findAll()
            .then((allMarcas) => {
                res.render('products/marcas/list', { allMarcas });
            })
            .catch(error => res.send(error))
    },
    // crear
    storeMarca: (req, res) => {
        let date = new Date();
        marcas.create({
            nombre: req.body.nombre,
            created_at: date
        })
            .then((marca) => {
                res.redirect("/products/marcas");
            })
    },
    // editar
    updateMarca: (req, res) => {
        let date = new Date();
        let editMarca = {
            nombre: req.body.nombre,
            updated_at: date
        }
        marcas.update(
            editMarca
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((marca) => {

                res.redirect("/products/marcas")
            })
    },

    //borrar 
    LogicMarcaDelete: (req, res) => {
        let logicDeleteMarca = {
            logicDelete: 0
        }
        marcas.update(
            logicDeleteMarca
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((allMarcas) => {

                res.redirect("/products/marcas")
            })
    },
    restoreMarca: (req, res) => {
        let marcaRestored = {
            logicDelete: 1
        }
        marcas.update(
            marcaRestored
            , {
                where: {
                    id: req.params.id
                }
            })
            .then((allMarcas) => {

                res.redirect("/products/marcas")
            })
    },
    destroyMarca: (req, res) => {
        marcas.destroy({
            where: { id: req.params.id }
        });
        res.redirect("/products/marcas");
    },
}


module.exports = controller;
