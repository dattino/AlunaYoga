const express = require('express');
const router = express.Router();

/* Controlador*/
const userControllerSql = require('../controllers/UserControllerSql');

/* Middlewares */
const uploadFile = require('../middlewares/userMulterMiddleware');
const validationsReg = require("../middlewares/usersRegValidatorMiddleware");
const validationsEdit = require("../middlewares/usersEditValidatorMiddleware");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const authAdminMiddleware = require('../middlewares/authAdminMiddleware');

/* Crear Usuario */
router.get('/register', guestMiddleware, userControllerSql.vistaRegister); 
router.post('/register', uploadFile.single('imagenUsuario'), validationsReg, userControllerSql.registro);

/* Lista Usuarios*/
router.get('/list', authAdminMiddleware, userControllerSql.vistaLista);
router.get('/detail/:id', authAdminMiddleware,userControllerSql.vistaDetalle);
router.put('/detail/:id', userControllerSql.editar);

/* Eliminar Usuario */
router.get('/delete/:id', authAdminMiddleware, userControllerSql.vistaDelete);
router.delete('/delete/:id', userControllerSql.eliminar);

/* Editar Usuario */
router.get('/profile/:id', authMiddleware, userControllerSql.vistaProfile);
router.put('/profile/:id', uploadFile.single('imagenUsuario'), validationsEdit, userControllerSql.editar);
router.get('/profile/delete/:id', authMiddleware, userControllerSql.vistaLogicDelete);
router.delete('/profile/delete/:id', userControllerSql.logicDelete);



/* Login*/
router.get('/login', guestMiddleware, userControllerSql.vistaLogin);
router.post('/login', userControllerSql.login);
router.get('/logout', authMiddleware, userControllerSql.logout);

module.exports = router;