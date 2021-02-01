window.addEventListener('load', function() {
    const errorsElement = document.querySelector("#errors")
    const button = document.querySelector("#button")
    
    button.addEventListener('click', function(event) {
        const errors = [];
        errorsElement.innerHTML = '';
        const RegExpPass = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/; // Exprecion regular


        //Validacion de viejo contraseña
        const oldPassword = document.querySelector("#oldPassword");

        if (oldPassword.value == "") {
            errors.push('La constraseña debe existir');
        }


        //Validacion de la nueva contraseña 
        const newPassword = document.querySelector("#newPassword");
        
        if (newPassword == "") {
            errors.push('Debe ingresar una constraseña.');
            } else if(newPassword.value == oldPassword.value){
                errors.push('La constraseña debe ser distinta a la enterior');
                    } else if(newPassword.length < 8) {
                        errors.push('La constraseña debe tener como mínimo 8 caracteres.');
                            } else if (!RegExpPass.test(newPassword)) {
                                errors.push('La constraseña debe contener mayúscula, minúscula, un número y un caracter especial.');
                            } 


        //Validacion de la repeticion de la nueva contraseña
        const repeatNewPassword = document.querySelector('#repeatNewPassword');

        if(repeatNewPassword.value != newPassword.value){
            errors.push('Las constraseñas deben coincidir')
        }

        if (errors.length > 0) {
            errors.forEach(error => {
                errorsElement.innerHTML += `<li><i class="fas fa-exclamation-circle"></i> ${error}</li>`
            })
            event.preventDefault()
        }
    })
})