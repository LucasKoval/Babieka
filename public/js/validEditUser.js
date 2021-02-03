window.addEventListener('load', function() {

    //-> Variables Globales
    const errorsElement = document.querySelector("#frontErrors");
    const button = document.querySelector("#ueButton");

    //-> Expresiones Regulares
    const RegExpEmail = /\S+@\S+\.\S+/;  
    
    button.addEventListener('click', function(event) {
        const errors = [];
        errorsElement.innerHTML = '';

        const firstName = document.querySelector("#first_name")
        if (firstName.value == "") {
            errors.push('Debe ingresar su nombre')
        } else if(firstName.value.length < 2) {
            errors.push("Su nombre debe tener al menos dos caractéres")
        }

        const lastName = document.querySelector("#last_name")
        if (lastName.value == "") {
            errors.push('Debe ingresar su apellido')
        } else if(lastName.value.length < 2) {
            errors.push("Su apellido debe tener al menos dos caractéres")
        }

        fetch("http://localhost:3000/api/usuario/listado")
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(userInformation){
            console.log(userInformation.data)
        })

        const email = document.querySelector("#email")
        if (email.value == "") {
            errors.push('Debe ingresar un e-mail')
        } else if(!RegExpEmail.test(email.value)){
            errors.push('La dirección de e-mail no es válida.')
        } 


        //Validación rol si usuario es admin?

        //Validación imágen
        const image = document.querySelector("#image").value;
        const imageExt = image.split('.')[1];
        const validExt = ['jpg', 'jpeg', 'png', 'gif'];
        if (imageExt == undefined) {
            errors.push('Debe cargar una imagen con uno de los siguientes formatos: JPG, JPEG, PNG, GIF.') ;
        } else {
            if (!(validExt.includes(imageExt.toLowerCase()))) {
                errors.push('Formato de imagen invalido. [Permitidos: JPG, JPEG, PNG, GIF]')
            }
        }

        //Validación contraseña correcta
        const password = document.querySelector("#password");
        if (password.value == "") {
            errors.push('Debe ingresar su contraseña')
        }


        //Se comprueba si hay errores en la carga del formulario, se muestran si los hay.
        if (errors.length > 0) {
            errors.forEach(error => {
                errorsElement.innerHTML += `<li><i class="fas fa-exclamation-circle"></i> ${error}</li>`
            })
            event.preventDefault()
        }
    })
})