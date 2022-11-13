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

  
    //------------------------------------
    //--------------header fin------------
    //------------------------------------
    
    //-----------------------------------
    //-------------validaciones----------
    //-----------------------------------
    const formulario = document.querySelector("#form")
    formulario.onsubmit = (e) =>{
     
        console.log("estoy andando?")
        //----------elementos---------
        //errores
        let errores = [];
        let ulErrores = document.querySelector(".errores ul");
        // inputs
        let inputName = document.querySelector("#name");
        let inputDescription = document.querySelector("#description");
        let inputPrice = document.querySelector("#price");
        let inputDiscount = document.querySelector("#discount");
        let inputCategory = document.querySelector("#category_id")
        let inputTalle = document.querySelector("#talle_id");
        let inputMarca = document.querySelector("#marca_id");
        let inputStock = document.querySelector("#stock");
        let inputImage = document.querySelector("#image");

        // condiciones
        //name
        if( inputName.value == ""){
           errores.push("el campo nombre no puede estar vacío")
        }
        if( inputName.value.length < 5 ){
            errores.push("el campo nombre debe tener por lo menos 5 caracteres")
        }
         // description
        if( inputDescription.value == ""){
            errores.push("el campo descripcion no puede estar vacío")
         }
         if( inputDescription.value.length < 20 ){
            errores.push("el campo descripcion debe tener por lo menos 20 caracteres")
         }
         //price
         if( inputPrice.value == ""){
            errores.push("* el campo precio no puede estar vacío")
         }
        //category
        if( inputCategory.value == ""){
            errores.push("debe elejir un tipo de categoria")
         }
           //marca
        if( inputMarca.value == ""){
            errores.push("debe elejir una marca")
         }
           //Stock
        if( inputCategory.value <=0){
            errores.push("el stock debe ser mayor a 0")
         }
         //errores
       if(errores.length > 0){
        e.preventDefault();
       for (let i = 0; i<errores.length ; i++){
            ulErrores.innerHTML +=  "<li>"+ errores[i]+"</li>"
        }
       
       }
        }
        //IMAGEN
        let inputImage = document.querySelector("#image");
        inputImage.addEventListener('change', function () {
        
            var filePath = this.value;
            var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if(!allowedExtensions.exec(filePath)){
                alert('Extensión no permitida. Utiliza: .jpeg/.jpg/.png/.gif.');
                fileInput.value = '';
                return false;
            }
        
        });
    //-----------------------------------
    //-----------validaciones FIN-------
    //-----------------------------------
}








    
