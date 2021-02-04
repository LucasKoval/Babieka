window.addEventListener('load', function() {
    //-> Variables Globales
    const showErrors = document.querySelector("#errors");
    const button = document.querySelector("#button");
    
    button.addEventListener('click', function(event) {
        //-> Variables Locales 
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const msgEmail = document.querySelector(".err-email")
        const msgPass = document.querySelector(".err-pass")
        const errors = [];
        const errorLog = [];
        showErrors.innerHTML = '';

        //-> Expresiones Regulares
        const RegExpEmail = /\S+@\S+\.\S+/;   //E-mails

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
            } else {
                msgPass.innerHTML = ''
            }

        //-> Comprobación y envio de Errores
        if (errorLog.length > 0) {
            event.preventDefault()
        }
    })
})