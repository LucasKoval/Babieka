window.addEventListener('load', function() {
    //-> Variables Globales
    const showErrors = document.querySelector("#errorsFr")
    const button = document.querySelector("#button")

    button.addEventListener('click', function(event) {
        //-> Variables Locales
        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value;
        const stock = document.querySelector("#stock").value;
        const price = document.querySelector("#price").value;
        const image = document.querySelector("#image").value;
        const imageExt = image.split('.')[1];
        const validExt = ['jpg', 'jpeg', 'png', 'gif'];
        const errors = [];
        showErrors.innerHTML = '';

        //-> Validación del Nombre del Modelo
        if (name == "") {
            errors.push('Debe ingresar el nombre del modelo.')
        } else if (name.length < 5) {
            errors.push('El nombre debe tener como mínimo 5 letras.')
        }

        //-> Validación de la Descripción
        if (description == "") {
            errors.push('Debe ingresar una descripción para el artículo.')
        } else if (description.length < 20) {
            errors.push('Debe ingresar mas información sobre este artículo.')
        }

        //-> Validación de la Imagen
        if (imageExt == undefined) {
            errors.push('Debe cargar una imagen con uno de los siguientes formatos: JPG, JPEG, PNG, GIF.') ;
        } else {
            if (!(validExt.includes(imageExt.toLowerCase()))) {
                errors.push('Formato de imagen invalido. [Permitidos: JPG, JPEG, PNG, GIF]')
            }
        }
        
        //-> Validación del Stock
        if (stock < 1) {
            errors.push('Debe cargar el stock entrante.')
        } 

        //-> Validación del Precio
        if (price < 1) {
            errors.push('Debe ingresar el precio del artículo.')
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