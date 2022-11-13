//Express
const fs = require('fs');
const path = require('path');
//datos JSON
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const estilos = {
    productos: '/stylesheets/productos-style.css',
    detalleProducto:'/stylesheets/detail-style.css',
    crearProducto:'/stylesheets/product-create-style.css'
    
};


const controlador = { 
    //todos los productos
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products/products',{products:products, title: 'Productos', estilo: estilos.productos });
    },
    //detalla de un producto
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const idProduct = req.params.id;
        const product = products.find( item => item.id == idProduct)
        res.render('products/detail', { product ,title: 'DetalleDeProductos', estilo: estilos.detalleProducto});
    },

    //crear producto
    create: (req, res) => {
        res.render('products/product-create', {title: 'CrearProducto', estilo: estilos.crearProducto});
    },
    
    store: (req, res) => {
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //crear nuevo producto
        const newProduct = req.body;
        //new id
        newProduct.id = products.length + 1;
        // agragar imagen
        if(req.file){
			newProduct.image = req.file.filename;
		}else{
			newProduct.image = "default-image.png";
		}
        //agregar nuevo porducto a DATA JSON
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/')
    },
    //editar un producto
    edit: (req, res) => {
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //buscamos la id del prodcuto a editar
        const idProduct = req.params.id;
        const productEdit = products.find( item => item.id == idProduct)
        //renderisamos la vista
        res.render('products/product-edit',{productEdit, title: 'Editanado Prodcuto: ', estilo: estilos.crearProducto});
    },
    update: (req, res) =>{
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //buscamos la id del prodcuto a editar
        const idProduct = req.params.id;
        // agregamos el/los nuevos parametros del producto a editar
        const productEdit = req.body;
        //edtiamos los parametros
        products.forEach(product => {
            if (idProduct == product.id){
                product.name = productEdit.name;
				product.price = productEdit.price;
				product.discount = productEdit.discount;
				product.category = productEdit.category;
                product.subCategory = productEdit.subCategory;
                product.quality = productEdit.quality;
				product.description = productEdit.description;
                if(req.file){
					product.image = req.file.filename;
				}
            }
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
    },
    destroy: (req, res) =>{
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //buscamos la id del prodcuto a eliminar
        const idProduct = req.params.id;
        //buscamos la imagen y la eliminamos
        products.forEach(product => {
            if(idProduct == product.id){
                if(product.image && product.image != "default-image.png" ){
                    const imagePath = path.join(__dirname, '../../public/images/products', product.image);
					fs.unlinkSync(imagePath)
                }
            }
        })
        //flitramos al idproduct para dejarlo afuera del nuevo database
        const productsList = products.filter(item => item.id != idProduct ) 
        fs.writeFileSync(productsFilePath, JSON.stringify(productsList, null, ' '));
		res.redirect('/products')
    },
    destroyImg: (req, res) =>{
         //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
         //buscamos la id del prodcuto a eliminar
        const idProduct = req.params.id; 
        //buscamos la imagen y la eliminamos
        products.forEach(product => {
            if(idProduct == product.id){
                if(product.image && product.image != "default-image.png" ){
                    const imagePath = path.join(__dirname, '../../public/images/products', product.image);
					fs.unlinkSync(imagePath)
                }
            } product.image = "default-image.png";	
        })
        res.redirect('/products')
    },
}


module.exports = controlador;