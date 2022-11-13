window.onload = function(){
        //------------------------------------
    //--------------header----------------
    //------------------------------------
   console.log("funca")
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

  
    //------------------------------------
    //--------------header fin------------
    //------------------------------------

  //------------------------------------
    //--------------carrito ------------
    //------------------------------------
    
    //add carrito
console.log(localStorage)
    let carrito = [];
    let botonComprar = document.querySelector(".cart")
    console.log(carrito)
    botonComprar.addEventListener('click', (e) => {
        let item = e.target.id 
        console.log(item)
        if (localStorage.getItem('carrito')){
            const carrito = JSON.parse(localStorage.getItem('carrito'))
            if (!carrito.find((id) => id.id == item)){
                carrito.push({ id:item, cantidad:1})
                console.log("se agrgo al carrito")
                localStorage.setItem("carrito", JSON.stringify(carrito))
            }
        }
        else{
            carrito.push({ id:item, cantidad:1})
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }
        console.log(localStorage)
    })
    
    //------------------------------------
        //--------------carrito fin------------
        //------------------------------------
    

    
}

