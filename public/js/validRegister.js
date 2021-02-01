window.addEventListener('load', function() {
    //-> Variables Globales
    const showErrors = document.querySelector("#errors")
    const button = document.querySelector("#button")

    button.addEventListener('click', function(event) {
        //-> Variables Locales 
        const first_name = document.querySelector("#first_name").value;
        const last_name = document.querySelector("#last_name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const repeatpassword = document.querySelector("#repeatpassword").value;
        const image = document.querySelector("#image").value;
        const imageExt = image.split('.')[1];
        const validExt = ['jpg', 'jpeg', 'png', 'gif'];
        const errors = [];
        showErrors.innerHTML = '';
        
        //-> Expresiones Regulares
        const RegExpPass = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;   //Passwords
        const RegExpEmail = /\S+@\S+\.\S+/;   //E-mails

        //-> Validación del Nombre
        if (first_name == "") {
            errors.push('Debe ingresar su nombre.')
        } else if (first_name.length < 2) {
            errors.push('El nombre debe tener como mínimo 2 letras.')
        }

        //-> Validación del Apellido
        if (last_name == "") {
            errors.push('Debe ingresar su apellido.')
        } else if (last_name.length < 2) {
            errors.push('El apellido debe tener como mínimo 2 letras.')
        }

        //-> Validación del E-mail
        if (email == "") {
            errors.push('Debe ingresar su dirección de e-mail.')
        } else if (!RegExpEmail.test(email)) {
            errors.push('La dirección de e-mail no es válida.')
            }/*  else if (email == "") {
                errors.push('El e-mail ya se encuentra registrado')  REVISAR!!
            } */   

        //-> Validación de la Contraseña
        if (password == "") {
            errors.push('Debe ingresar una constraseña.')
        } else if (password.length < 8) {
            errors.push('La constraseña debe tener como mínimo 8 caracteres.')
            } else if (!RegExpPass.test(password)) {
                errors.push('La constraseña debe contener mayúscula, minúscula, un número y un caracter especial.')
                } else if (repeatpassword != password) {
                    errors.push('Las constraseñas no coinciden.')
                }

        //-> Validación de la Imagen
        if (imageExt == undefined) {
            errors.push('Debe cargar una imagen con uno de los siguientes formatos: JPG, JPEG, PNG, GIF.') ;
        } else {
            if (!(validExt.includes(imageExt.toLowerCase()))) {
                errors.push('Formato de imagen invalido. [Permitidos: JPG, JPEG, PNG, GIF]')
            }
        }
        
        //-> Comprobación y envio de Errores
        if (errors.length > 0) {
            errors.forEach(error => {
                showErrors.innerHTML += `<li><i class="fas fa-exclamation-circle"></i> ${error}</li>`
            })
            event.preventDefault()
        }
    })
})