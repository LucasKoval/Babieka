window.addEventListener('load', function() {
    const form = document.querySelector(".edituser-form");
    const errorsElement = document.querySelector("#errors")
    const button = document.querySelector("#button")
    

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
        } else if(firstName.value.length < 2) {
            errors.push("Su apellido debe tener al menos dos caractéres")
        }


        const email = document.querySelector("#email")
        if (email.value == "") {
            errors.push('Debe ingresar un e-mail')
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