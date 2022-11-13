const path = require('path');
const { body } = require('express-validator');


//Validaciones
const registerValidation = [
	body("nombre")
		.notEmpty().withMessage("Por favor complete solo con su primer nombre").bail()
		.isAlpha().withMessage("Por favor complete solo con letras, sin espacios o caracteres especiales").bail()
		.isLength({ min: 2 }).withMessage("El Nombre debe tener al menos 2 caracteres").bail()
	,

	body("email")
		.notEmpty().withMessage("Por favor complete con su email").bail()
		.isEmail().withMessage("Por favor ingrese un email válido")
	,

	body("fecha_de_nacimiento")
		.notEmpty().withMessage("Por favor complete con una fecha").bail()
		.isDate({ min: 1920 - 01 - 01 }).withMessage("Por favor ingrese una fecha mayor a 01/01/1920").bail()
		.isDate({ max: 2003 - 06 - 27 }).withMessage("Por favor ingrese una fecha menor a 27/06/2003")
	,

	body("password")
		.notEmpty().withMessage("Por favor complete con una contraseña").bail()
		.isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 3 caracteres").bail()
		// .isStrongPassword().withMessage("La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial.")
	,

	body("comfirmPassword")
	    .notEmpty().withMessage("Ingrese nuevamente la contraseña")
	,


	body('imagenUsuario')
		.custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

			if (!file) {
				return true
			} else {
				let fileExtension = path.extname(file.originalname);
				if (!acceptedExtensions.includes(fileExtension)) {
					throw new Error('Las extensiones de archivos permitidas son: ' + `${ acceptedExtensions.join( ', ' ) }`);
				}
				return true;
			}
		})
];

module.exports = registerValidation;