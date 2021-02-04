window.addEventListener('load', function() {
    //-> Variables Globales
    const showErrors = document.querySelector("#errors")
    const button = document.querySelector("#button")

    button.addEventListener('click', function(event) {
        //-> Variables Locales 
        const firstName = document.querySelector("#first_name").value;
        const lastName = document.querySelector("#last_name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const repeatpassword = document.querySelector("#repeatpassword").value;
        const image = document.querySelector("#image").value;
        const imageExt = image.split('.')[1];
        const validExt = ['jpg', 'jpeg', 'png', 'gif'];
        const msgFirstName = document.querySelector(".err-first_name")
        const msgLastName = document.querySelector(".err-last_name")
        const msgEmail = document.querySelector(".err-email")
        const msgPass = document.querySelector(".err-pass")
        const msgImage = document.querySelector(".err-image")
        const errors = [];
        const errorLog = [];
        showErrors.innerHTML = '';
        
        //-> Expresiones Regulares
        const RegExpPass = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;   //Passwords
        const RegExpEmail = /\S+@\S+\.\S+/;   //E-mails

        //-> Validación del Nombre
        if (firstName == "") {
            errors.firstName = {
                msg: '<i class="fas fa-exclamation-circle"></i> Debe ingresar su nombre.'
            }
            errorLog.push('error')
            msgFirstName.innerHTML = errors.firstName.msg
        } else if (firstName.length < 2) {
            errors.firstName = {
                msg: '<i class="fas fa-exclamation-circle"></i> El nombre debe tener como mínimo 2 letras.'
            }
            errorLog.push('error')
            msgFirstName.innerHTML = errors.firstName.msg
        } else {
            msgFirstName.innerHTML = ''
        }


        //-> Validación del Apellido
        if (lastName == "") {
            errors.lastName = {
                msg: '<i class="fas fa-exclamation-circle"></i> Debe ingresar su apellido.'
            }
            errorLog.push('error')
            msgLastName.innerHTML = errors.lastName.msg
        } else if (lastName.length < 2) {
            errors.lastName = {
                msg: '<i class="fas fa-exclamation-circle"></i> El apellido debe tener como mínimo 2 letras.'
            }
            errorLog.push('error')
            msgLastName.innerHTML = errors.lastName.msg
        } else {
            msgLastName.innerHTML = ''
        }


        //-> Validación del E-mail
        if (email == "") {
            errors.email = {
                msg: '<i class="fas fa-exclamation-circle"></i> Debe ingresar su dirección de e-mail.'
            }
            errorLog.push('error')
            msgEmail.innerHTML = errors.email.msg
        } else if (!RegExpEmail.test(email)) {
            errors.email = {
                msg: '<i class="fas fa-exclamation-circle"></i> La dirección de e-mail no es válida.'
            }
            errorLog.push('error')
            msgEmail.innerHTML = errors.email.msg
        } else {
            msgEmail.innerHTML = ''
        }
        
      
        //Consumo de api para chequear si el mail ya se encuentra registrado
        fetch("http://localhost:3000/api/usuario/listado")
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(userInformation){
            userInformation.data.users.forEach( user => {
                if (user.email == email){
                    errors.email = {
                        msg: '<i class="fas fa-exclamation-circle"></i> El e-mail ya se encuentra registrado.'
                    }
                    errorLog.push('error')
                    msgEmail.innerHTML = errors.email.msg
                }
            });
        })
        

        //-> Validación de la Contraseña
        if (password == "") {
            errors.password = {
                msg: '<i class="fas fa-exclamation-circle"></i> Debe ingresar una constraseña.'
            }
            errorLog.push('error')
            msgPass.innerHTML = errors.password.msg
        } else if (password.length < 8) {
            errors.password = {
                msg: '<i class="fas fa-exclamation-circle"></i> La constraseña debe tener como mínimo 8 caracteres.'
            }
            errorLog.push('error')
            msgPass.innerHTML = errors.password.msg
            } else if (!RegExpPass.test(password)) {
                errors.password = {
                    msg: '<i class="fas fa-exclamation-circle"></i> La constraseña debe contener mayúscula, minúscula, un número y un caracter especial.'
                }
                errorLog.push('error')
                msgPass.innerHTML = errors.password.msg
                } else if (repeatpassword != password) {
                    errors.password = {
                        msg: '<i class="fas fa-exclamation-circle"></i> Las constraseñas no coinciden.'
                    }
                    errorLog.push('error')
                    msgPass.innerHTML = errors.password.msg
                    } else {
                        msgPass.innerHTML = ''
                    }


        //-> Validación de la Imagen
        if (imageExt == undefined) {
            errors.image = {
                msg: '<i class="fas fa-exclamation-circle"></i> Debe cargar una imagen con uno de los siguientes formatos: JPG, JPEG, PNG, GIF.'
            }
            errorLog.push('error')
            msgImage.innerHTML = errors.image.msg
        } else if (!(validExt.includes(imageExt.toLowerCase()))) {
            errors.image = {
                msg: '<i class="fas fa-exclamation-circle"></i> Formato de imagen invalido. [Permitidos: JPG, JPEG, PNG, GIF].'
            }
            errorLog.push('error')
            msgImage.innerHTML = errors.image.msg
            } else {
                msgImage.innerHTML = ''
            }


        //-> Comprobación y envio de Errores
        if (errorLog.length > 0) {
            event.preventDefault()
        }         
    })
})