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

  console.log("soy vigo")
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
        let inputPassword = document.querySelector("#password");
        let inputConfirmPassword = document.querySelector("#confirmPassword");
        let inputFechaDeNacimiento = document.querySelector("#fecha_de_nacimiento");
        let inputEmail = document.querySelector("#email");
        let inputImage = document.querySelector("#imageUsuario");

        // condiciones
        //name
        if( inputName.value == ""){
           errores.push("el campo nombre no puede estar vacío")
        }
        if( inputName.value.length < 5 ){
            errores.push("el campo nombre debe tener por lo menos 5 caracteres")
        }
         // email
        if( inputEmail.value == ""){
            errores.push("el campo Email no puede estar vacío")
         }
      
         //fecha de nacimineto
         if( inputFechaDeNacimiento.value == ""){
            errores.push("el campo Fecha de nacimiento no puede estar vacío")
         }
        //password
        if( inputPassword.value == ""){
            errores.push("el campo Contraseña no puede estar vacío")
         }
           //confirm password
        if( inputConfirmPassword.value == ""){
            errores.push("el campo Confirmar Contraseña no puede estar vacío")
         }
         if( inputConfirmPassword.value !== inputPassword.value){
            errores.push("las contraseñas no son iguales")
         }
      
     
         //errores
       if(errores.length > 0){
        e.preventDefault();
       for (let i = 0; i<errores.length ; i++){
            ulErrores.innerHTML +=  "<li>"+ errores[i]+"</li>"
        }
       
       }
        }
  
    //-----------------------------------
    //-----------validaciones FIN-------
    //-----------------------------------


    
}