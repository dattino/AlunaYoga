window.onload = function(){
    //------------------------------------
    //--------------header----------------
    //------------------------------------
   
    //meun desplegable
    const menuHeaderButton = document.querySelector("#menuHeaderButton")
   
    menuHeaderButton.addEventListener('click', (e) => {
        const menuHeader = document.querySelector("#menuHeader")
        console.log("a la grande le puse kuka")
        if (menuHeader.style.display == "none") {
            menuHeader.style.display = "flex";
            menuHeader.classList.add("menuDesplegable") 
        }else{
           menuHeader.style.display = "none"
        }
    });
   
    //Search bar
    const searchButton = document.querySelector("#searchButton ");   
    searchButton.addEventListener('click', (e) => { 
        if(searchButton.display != "none"){
        e.preventDefault()
const searchBar = document.querySelector("header .SearchBar input")
console.log("que no toque nada??? VOY A TOCARLO TODO!!!!")

    searchBar.style.display = "block";
    searchBar.classList.add("movilSearchBar") 
        }else{
            searchButton.addEventListener('click', (e) => { })
        }
    })
  
    //------------------------------------
    //--------------header fin------------
    //------------------------------------

        
    
    //add carrito
    let prodcuto = document.querySelector(' #product')
    let botonComprar = document.querySelector(' #comprar')
    console.log("Script running")
    prodcuto.addEventListener('submit', (e) => {
        e.preventDefault;
        console.log('Estoy comprando')
    })




    //------------------------------------------------------
    //------------------ filter button  --------------------
    //------------------------------------------------------

    const filter = document.querySelector("#filter");

    filterButton.addEventListener('click', (e) => {

        const button = document.querySelector("filtro-button")

        const filterButton = document.querySelector("#filterButton");
       
        if (filter.style.display === "none") {
            filter.style.display = "flex";
            filter.style.position = "fixed"
            filterButton.style.left = "70%"
        }
        else {
            filter.style.display = "none";
            filterButton.style.left = "0"
        }
    })
    //------------------------------------------------------
    //--------------- filter button FIN --------------------
    //------------------------------------------------------


    //------------------------------------------------------
    //--------------- carrusel ofertas----------------------
    //------------------------------------------------------
   
    // todos los productos
    fetch('http://localhost:3420/api/v1/products')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let products = data.allProducts;
    
      //array de porductos
    let carrusel=  products.filter(data => data.discount >0);
    console.log(carrusel)


      //elementos llamados
     const image = document.querySelector("#image");
     const name = document.querySelector("#name");
     const finalPrice = document.querySelector("#finalPrice");
     const discount = document.querySelector("#discount");
     const category = document.querySelector("#category");
     const edit = document.querySelector("#edit")

     //variables  funcion carrusel
     const TIEMPO_INTERVALO_MILESIMAS_SEG = 4000;
     let posicionActual = 0;
     let $botonRetroceder = document.querySelector('#retroceder');
     let $botonAvanzar = document.querySelector('#avanzar');
     let $botonPlay = document.querySelector('#play');
     let $botonStop = document.querySelector('#stop');
     let intervalo;
    

    //-funciones

    //Funcion que cambia la foto en la siguiente posicion
    function pasarContenedor() {
        if(posicionActual >= carrusel.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarContenedor();
    };
    //Funcion que cambia la foto en la anterior posicion
    function retrocederContenedor() {
        if(posicionActual <= 0) {
            posicionActual = carrusel.length - 1;
        } else {
            posicionActual--;
        }
        renderizarContenedor();
    };
    //Funcion que actualiza elcontenedor dependiendo de posicionActual
    function renderizarContenedor () {
    //datos del contenedor
    image.setAttribute("src", "/images/products/"+carrusel[posicionActual].image );
    name.textContent = carrusel[posicionActual].name;
    finalPrice.textContent = "¡Oferta! $ "+carrusel[posicionActual].finalPrice;    
    discount.textContent = carrusel[posicionActual].discount+" % OFF";
    category.textContent = "Categoria: "+ carrusel[posicionActual].categorys.nombre;    
    edit.setAttribute("href", "/products/detail/"+carrusel[posicionActual].id ); 
    };

    function playIntervalo() {
        intervalo = setInterval(pasarContenedor, TIEMPO_INTERVALO_MILESIMAS_SEG);
 
    };
    function stopIntervalo() {
        clearInterval(intervalo);
        $botonAvanzar.removeAttribute('disabled');
        $botonRetroceder.removeAttribute('disabled');
        $botonPlay.removeAttribute('disabled');
        $botonStop.setAttribute('disabled', true);
    }


 // Eventos
 $botonAvanzar.addEventListener('click', pasarContenedor);
 $botonRetroceder.addEventListener('click', retrocederContenedor);
 renderizarContenedor();
playIntervalo();
      })
     
    //------------------------------------------------------
    //--------------- carrusel ofertas FIN -----------------
    //------------------------------------------------------
}