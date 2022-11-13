const path = require('path');
const { body } = require ( 'express-validator' );

//Validaciones
const createProductValidation = [
	body("name")
		.notEmpty().withMessage("Por favor complete este campo").bail()
		.isLength( {min: 5} ).withMessage("El Nombre debe tener al menos 5 caracteres")
    ,
	
	body("category_id")
		.notEmpty().withMessage("Por favor elija una categoria")
    ,
    
    body("price")
        .notEmpty().withMessage("Por favor complete este campo").bail()
		.isDecimal().withMessage("Por favor ingrese números")
    ,

	body("discount")
        .notEmpty().withMessage("Por favor complete este campo").bail()
		.isInt().withMessage("Por favor ingrese números enteros")
    ,

	body("description")
		.notEmpty().withMessage("Por favor complete una descripcion").bail()
		.isLength( {min: 20} ).withMessage("La descripcion debe tener al menos 20 caracteres").bail()
		.isLength( {max: 500} ).withMessage("La descripcion debe tener un maximo 500 caracteres")
    ,

	body("marca_id")
		.notEmpty().withMessage("Por favor elija una marca")
    ,   

	body("stock")
		.notEmpty().withMessage("Por favor complete este campo").bail()
		.isNumeric(). withMessage("Por favor ingrese solo numeros para indicar el stock")
	,

	body('image')
		.custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

			if (!file) {
				return true
			} else {
				let fileExtension = path.extname(file.originalname);
				if (!acceptedExtensions.includes(fileExtension)) {
					throw new Error('Las tipos de archivos permitidos son: ' + `${ acceptedExtensions.join( ', ' ) }`);
				}
				return true;
			}
		})	
	,
];

module.exports = createProductValidation;