const express = require('express');
const router = express.Router();

/* Controlador*/
const apiUsersController = require('../../controllers/api/apiUsersController');

/* Middlewares */
// const uploadFile = require('../../middlewares/userMulterMiddleware');
// const validations = require("../../middlewares/usersRegValidatorMiddleware");
// const validationsEdit = require("../../middlewares/usersEditValidatorMiddleware");
// const guestMiddleware = require('../../middlewares/guestMiddleware');
// const authMiddleware = require('../middlewares/authMiddleware');
// const authAdminMiddleware = require('../middlewares/authAdminMiddleware');

/* Lista Usuarios*/
router.get('/', apiUsersController.vistaLista);
router.get('/detail/:id', apiUsersController.detail);


module.exports = router;
