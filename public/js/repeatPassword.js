window.addEventListener('load', function() {
    const errorsElement = document.querySelector("#errors")
    const button = document.querySelector("#button")
    
    button.addEventListener('click', function(event) {
        const errors = [];
        errorsElement.innerHTML = '';

        const oldPassword = document.querySelector("#oldPassword")
        if (oldPassword.value == "") {
            errors.push('La constraseña debe existir')
        }

        const newPassword = document.querySelector("#newPassword")
        if (newPassword.value == "" || newPassword.value == oldPassword.value) {
            errors.push('La constraseña debe existir y ser distinta a la enterior')
        } else if (newPassword.value.length < 5 /* !newPassword.match(/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/) */) {
            errors.push('La constraseña debe contener como mínimo 8 caracteres')
        }

        const repeatNewPassword = document.querySelector('#repeatNewPassword')
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