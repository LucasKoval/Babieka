window.addEventListener('load', function() {
    const form = document.querySelector(".login-form");
    const errorsElement = document.querySelector("#errors")
    const button = document.querySelector("#button")
    
    button.addEventListener('click', function(event) {
        const errors = [];
        errorsElement.innerHTML = '';

        const email = document.querySelector("#email")
        if (email.value == "") {
            errors.push('Debe ingresar e-mail válido')
        }

        const password = document.querySelector("#password")
        if (password.value == "") {
            errors.push('La constraseña debe existir')
        } else if (password.value.length < 5) {
            errors.push('La constraseña debe contener como mínimo 8 caracteres')
        }

        if (errors.length > 0) {
            errors.forEach(error => {
                errorsElement.innerHTML += `<li><i class="fas fa-exclamation-circle"></i> ${error}</li>`
            })
            event.preventDefault()
        }
    })
})