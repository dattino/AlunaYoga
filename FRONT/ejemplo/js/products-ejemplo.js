window.onload = () => {
//elementos
const app = document.getElementById("root");
const container = document.createElement("div");
container.setAttribute("class", "container");
app.appendChild(container);
//eventos

//fetch-base de datos
fetch('http://localhost:3420/api/v1/products')
.then(response => response.json())
.then(data => {
  console.log(data);
  // todos los productos
  let products = data.allProducts;


  products.forEach((product) => {
    
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const h1 = document.createElement("h1");
    h1.textContent = product.name;
    const p = document.createElement("p");
    p.textContent = `Descripcion: ${product.description}`;

    


    const precio = document.createElement("p");
    precio.textContent = `Precio: ${product.finalPrice}`;
    //
    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);
    if (product.talle_id !== null) {
      const talle = document.createElement("p");
      talle.textContent = `Talle: ${product.talles.nombre}`;
      card.appendChild(talle);
    }
    card.appendChild(precio);





  });

});





}