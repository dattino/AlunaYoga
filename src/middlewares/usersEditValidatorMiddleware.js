const path = require('path');
const { body } = require('express-validator');


//Validaciones
const editValidation = [
	body("nombre")
		.notEmpty().withMessage("Por favor complete con su nombre").bail()
		.isAlpha().withMessage("Por favor complete solo con letras sin espacios").bail()
		.isLength({ min: 2 }).withMessage("El Nombre debe tener al menos 2 caracteres")
	,

	body("apellido")
		.notEmpty().withMessage("Por favor complete con su nombre").bail()
		.isAlpha().withMessage("Por favor complete solo con letras sin espacios").bail()
		.isLength({ min: 2 }).withMessage("El Nombre debe tener al menos 2 caracteres")
	,

	body("fecha_de_nacimiento")
		.notEmpty().withMessage("Por favor complete con una fecha").bail()
		.isDate({ min: 1920 - 01 - 01 }).withMessage("Por favor ingrese una fecha mayor a 01/01/1920").bail()
		.isDate({ max: 2003 - 06 - 27 }).withMessage("Por favor ingrese una fecha menor a 27/06/2003")
	,


	body('imagenUsuario')
		.custom((value, { req }) => {
			let file = req.file;
			console.log(file);
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

module.exports = editValidation;