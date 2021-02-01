window.addEventListener('load', function() {
    //-> Variables Globales
    const showErrors = document.querySelector("#errors");
    const button = document.querySelector("#button");
    
    button.addEventListener('click', function(event) {
        //-> Variables Locales 
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const errors = [];
        showErrors.innerHTML = '';

        //-> Expresiones Regulares
        const RegExpEmail = /\S+@\S+\.\S+/;   //E-mails

        //-> Validación del Nombre
        if (email == "") {
            errors.push('Debe ingresar su dirección de e-mail.')
        } else if (!RegExpEmail.test(email)) {
            errors.push('La dirección de e-mail no es válida.')
        }

        //-> Validación del Nombre
        if (password == "") {
            errors.push('Debe ingresar su constraseña.')
        } else if (password.length < 8) {
            errors.push('La constraseña debe tener como mínimo 8 caracteres.')
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