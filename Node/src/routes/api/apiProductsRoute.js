//Require
const express = require('express');
const router = express.Router();
//Multer
const upload = require("../../middlewares/productsMulterMiddleware")

//Controller
const apiProductsController = require("../../controllers/api/apiProductsController");




//hola
//router.get('/', apiProductsController.hola);

// todos los productos
router.get('/', apiProductsController.list);

//un producto 
router.get('/detail/:id/', apiProductsController.detail); 

//carrito
// router.get('/cart', cartController.cartVista); 

//----------------Search Bar-------------------------
router.get("/search/", apiProductsController.search)

//---------------- Filtros -------------------------
router.post("/filter/", apiProductsController.filter)

//---------------- Category menu -------------------------
// router.post("/category/", apiProductsController.menuCategory)


//----------------------------------------------
//------------------CRUD------------------------
//----------------------------------------------

//------------------productos------------------------

// //crear producto
router.get('/create', apiProductsController.create); 
router.post('/create',upload.single("image"), apiProductsController.store); 

// //editar producto
 router.get('/edit/:id/', apiProductsController.edit);
 router.put('/edit/:id',upload.single('image'), apiProductsController.update); 

// //eliminar Producto
router.get('/delete/:id', apiProductsController.delete);
 router.delete('/delete/:id/', apiProductsController.destroy);
 //router.delete('/delete/img/:id', apiProductsController.destroyImg); 

//------------------categorias------------------------

// // crear/editar categoria

router.get('/categorys', apiProductsController.listCategory); 
router.post('/category/create', apiProductsController.storeCategory); 
router.put('/category/edit/:id', apiProductsController.updateCategory); 
//router.delete('/category/delete/:id/', apiProductsController.destroyCategory);
  
//------------------marcas------------------------

// //crear marca
//router.get('/marca/create', apiProductsController.createMarca); 
//router.post('/marca/create', apiProductsController.storeMarca); 

// //editar marca
 //router.get('/marca/edit/:id/', apiProductsController.editMarca);
 //router.put('/marca/edit/:id', apiProductsController.updateMarca); 

// //eliminar marca
//router.get('/marca/delete/:id', apiProductsController.deleteMarca);
// router.delete('/marca/delete/:id/', apiProductsController.destroyMarca);

//----------------------------------------------
//------------------CRUD FIN------------------------
//----------------------------------------------

 //-----------------Carrito----------------------

//agregar
//router.post('/cart/add', cartController.add); 

//borrar un prodcuto
// router.delete('/cart/delete/:id/', cartController.destroy);

//vaciar carrito
// router.delete('/cart/deleteAll/:id/', cartController.destroyAll);

//comprar
//pendiente

//export
module.exports = router;
