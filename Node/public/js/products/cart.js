window.onload = () => {
    console.log("estoy en el archivo JS")
    const app = document.getElementById("root_section_added_products");
    const container = document.createElement("section");
    container.setAttribute("class","cart_products");
    app.appendChild(container);
    
    const warning = document.createElement("p");
    warning.setAttribute("class","purchase_warning");
    warning.textContent = "Los productos en el carrito no serán reservados hasta completar la compra";

    const emptyCartWarning = document.createElement("p");
    emptyCartWarning.setAttribute("class","empty_warning");
    emptyCartWarning.textContent = "No has añadido productos al carrito";

    let checkout = document.querySelector(".checkout");

    const addedProducts = JSON.parse(localStorage.getItem("carrito"));
    if(addedProducts != "" && (addedProducts) ){
        addedProducts.forEach(item => {
            fetch('http://localhost:3420/api/v1/products/detail/'+ item.id).then(response => response.json())
            .then(data => {
                // console.log(data.product)
                let product = data.product //Extrayendo solo la {data} del producto consultado.
                
              
                //Dibujando la data en front
                const addedProduct = document.createElement("div");
                addedProduct.setAttribute("class","added_product");

                const h3 = document.createElement("h3");
                h3.setAttribute("id",`${product.name}`);

                const img = document.createElement("img");
                img.setAttribute("src","/images/products/"+`${product.image}`); 
                img.setAttribute("alt",`${product.name}`);
                img.setAttribute("id",`${product.name}`);
                img.setAttribute("class","product_image");

                const productInfo = document.createElement("div");
                productInfo.setAttribute("class","product_info");

                // const productSize = document.createElement("p");
                // productSize.setAttribute("id","product_size");
                // productSize.textContent = "Talle = product.talles.nombre"
                
                const productPrice = document.createElement("p");
                productPrice.setAttribute("id","product_price");
                productPrice.textContent = `Precio = ${product.finalPrice}`

                const cant_form=document.createElement("form");
                cant_form.setAttribute("class","form_select_item_quantity");

                const productQuantity = document.createElement("select");
                productQuantity.setAttribute("class","select_item_quantity");

                

                container.appendChild(addedProduct);
                container.appendChild(warning);
                addedProduct.appendChild(h3);
                addedProduct.appendChild(img);
                addedProduct.appendChild(productInfo);
                // if(product.size){    
                    // productInfo.appendChild(productSize);
                    // }
                    
                    productInfo.appendChild(productQuantity);
                    
                    for (let i = 1; i <= product.stock ; i++){
                        let options = document.createElement("option");
                        options.setAttribute ("id","item_quantity")
                        options.setAttribute ("value",`${i}`)
                        options.textContent =  `${i}`
                        productQuantity.appendChild(options)
                    }
                    productInfo.appendChild(productPrice);
            })
        });
        
        const goToPay = document.querySelector("#go_to_pay")
        goToPay.addEventListener("click",(e)=>{
            console.log
            let carrito = []
            localStorage.setItem("carrito", JSON.stringify(carrito))
            window.location.reload()
        })
    }else{
        container.appendChild(emptyCartWarning);
        checkout.style.display = "none"
    }





}