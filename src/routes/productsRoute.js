//Require
const express = require('express');
const router = express.Router();
//Multer
const upload = require("../middlewares/productsMulterMiddleware")
//Controller
const productsController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");
//Middlewares
const authAdminMiddleware = require('../middlewares/authAdminMiddleware');
const validationsCreateProduct = require("../middlewares/productsCreateValidatorMiddleware");
const validationsEditProduct = require("../middlewares/productsCreateValidatorMiddleware");


router.get('/', productsController.list);

//un producto 
router.get('/detail/:id', productsController.detail); 

//carrito
router.get('/cart', cartController.cartView); 

//----------------Search Bar-------------------------
router.get("/search/", productsController.search);

//---------------- Filtros -------------------------
router.post("/filter/", productsController.filter);

//---------------- Category menu -------------------------
// router.post("/category/", productsController.menuCategory)


//----------------------------------------------
//------------------CRUD------------------------
//----------------------------------------------

//------------------productos------------------------
// lista
router.get('/list', productsController.productsList); 
// //crear producto
router.get('/create', authAdminMiddleware, productsController.create); 
router.post('/create',authAdminMiddleware, upload.single("image"), validationsCreateProduct, productsController.store); 

// //editar producto
 router.get('/edit/:id', authAdminMiddleware, productsController.edit);
 router.put('/edit/:id', upload.single('image'), validationsEditProduct, productsController.update); 

// //eliminar Producto
router.get('/delete/:id', authAdminMiddleware, productsController.delete);
router.put('/delete/:id', productsController.LogicDelete);

// restaurar producto
router.put('/restore/:id', authAdminMiddleware, productsController.restoreProduct);
// destruir porducto
 router.delete('/destroy/:id', productsController.destroy);
 //router.delete('/delete/img/:id', productsController.destroyImg); 


//------------------categorias------------------------

// // crear/editar categoria

router.get('/categorys', authAdminMiddleware, productsController.listCategorys); 
router.post('/categorys/create', productsController.storeCategory); 
router.put('/categorys/edit/:id', productsController.updateCategory); 
router.put('/categorys/delete/:id', productsController.LogicCategoryDelete);
router.put('/categorys/restore/:id', productsController.restoreCategory);  
//------------------marcas------------------------

// //crear editar eliminar marca
router.get('/marcas/', authAdminMiddleware, productsController.listMarcas); 
router.post('/marcas/create', productsController.storeMarca); 
router.put('/marcas/edit/:id', productsController.updateMarca); 
router.put('/marcas/delete/:id', productsController.LogicCategoryDelete);
router.put('/marcas/restore/:id', productsController.LogicCategoryDelete);

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
