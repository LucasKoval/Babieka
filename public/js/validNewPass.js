window.addEventListener('load', function() {
    const errorsElement = document.querySelector("#errors")
    const button = document.querySelector("#button")
    const oldPassword = document.querySelector("#oldPassword");
    const newPassword = document.querySelector("#newPassword");
    const repeatNewPassword = document.querySelector('#repeatNewPassword');
    
    button.addEventListener('click', function(event) {
        const errors = [];
        errorsElement.innerHTML = '';
        const RegExpPass = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/; // Exprecion regular

        //Validacion de viejo contraseña
        
        if (oldPassword.value == "") {
            errors.push('Debe ingresar su contraseña actual');
        }

        //Validacion de la nueva contraseña 
        
        if (newPassword.value == "") {
            errors.push('Debe ingresar una nueva constraseña.');
            } else if(newPassword.value == oldPassword.value){
                errors.push('La constraseña debe ser distinta a la enterior');
                    } else if(newPassword.length < 8) {
                        errors.push('La constraseña debe tener como mínimo 8 caracteres.');
                            } else if (!RegExpPass.test(newPassword.value)) {
                                errors.push('La constraseña debe contener mayúscula, minúscula, un número y un caracter especial.');
                            }   

        //Validacion de la repeticion de la nueva contraseña
        
        if (repeatNewPassword.value == "") {
            errors.push('Escriba la nueva contraseña nuevamente');
        }

        if(repeatNewPassword.value != newPassword.value){
            errors.push('La constraseña ingresada deben coincidir con la nueva contraseña')
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                errorsElement.innerHTML += `<li><i class="fas fa-exclamation-circle"></i> ${error}</li>`
            })
            event.preventDefault()
        }
    })
})