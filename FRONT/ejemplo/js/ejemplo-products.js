window.onload = () => {

//raiz
const app = document.getElementById("root");

//fetch-base de datos
fetch('http://localhost:3420/api/v1/products')
.then(response => response.json())
.then(data => {
  console.log(data);
  // todos los productos
  let products = data.allProducts;


  products.forEach((product) => {
    //article
    const article =document.createElement("article")
article.setAttribute("class","contenedor-main-productos-articulos");

      //div img 
    const divImg = document.createElement("div");
    divImg.setAttribute("class", "contenedor-main-productos-articulos-imagen");
   
    
    const image = document.createElement("img")
    image.src="../../public/images/products/"+product.image
   

    // div detalles del producto
    const divProduct = document.createElement("div");
    divProduct.setAttribute("class", "contenedor-main-productos-articulos-detalles");
    
    //div name
    const divName = document.createElement("div");
    divName.setAttribute("class", "contenedor-main-productos-articulos-detalles");
   
    const name = document.createElement("h2");
    name.textContent = product.name;
    
   
   
  //categoria
  const divCategory = document.createElement("div");
  const category = document.createElement("h3");
    category.textContent = product.categorys.nombre;
   


  //lanzamiento
  const divCreate = document.createElement("div");
  const createdAt = document.createElement("h4");
    category.textContent = product.created_at;

    //boton detalle
    const divButtonDetail = document.createElement("div");
    divButtonDetail.setAttribute("class", "action-button edit");

    const detailButton = document.createElement("a");
    detailButton.textContent = "Detalles";
   

    //boton Add cart
    const divButtonAdd = document.createElement("div");
    divButtonAdd.setAttribute("class", "contenedor-main-productos-articulos-button ");
   

    const addButton = document.createElement("i");
    addButton.href = ""
   

    //appendChild
    app.appendChild(article);
    
      article.appendChild(divImg);
        divImg.appendChild(image)

      article.appendChild(divProduct); 
    
        divProduct.appendChild(divName); 
        divName.appendChild(name); 
  
         //div discount
    //  if (product.discount == "0"){
    //   const divDiscount = document.createElement("div");
     
      
      
    //   const price = document.createElement("h2"); 
    //   discount.textContent = "Precio Final: $"+ product.finalPrice;
      
      
    //   const discount = document.createElement("h2");
    //   discount.textContent = product.discount;
      
    //   divProduct.appendChild(divDiscount);
    //   divDiscount.appendChild(price);
    //   divDiscount.appendChild(discount); 
    //   } else{
    //     //precio
    //     const divPrice = document.createElement("div");
     
        
      
    //   const price = document.createElement("h2"); 
    //   discount.textContent = "$ "+product.finalPrice;
    //   divProduct.appendChild(divPrice);
    //   divPrice.appendChild(price);
    //   }
        divProduct.appendChild(divCategory); 
        divCategory.appendChild(category); 

        divProduct.appendChild(divCreate); 
        divCreate.appendChild(createdAt); 

        divProduct.appendChild(divButtonDetail);
        divButtonDetail.appendChild(detailButton); 

        divProduct.appendChild(divButtonAdd);
        divButtonAdd.appendChild(addButton); 
  });

});





}