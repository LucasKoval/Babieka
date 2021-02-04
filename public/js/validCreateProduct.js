window.addEventListener('load', function() {
    //-> Variables Globales
    const errorsElement = document.querySelector("#frontErrors");
    const button = document.querySelector("#button");

    button.addEventListener('click', function(event) {
        const errors = [];
        errorsElement.innerHTML = '';

        //Validación nombre del modelo
        const modelName = document.querySelector("#name")
        if (modelName.value == "") {
            errors.push('Debe ingresar el nombre del artículo')
        } else if(modelName.value.length < 5) {
            errors.push("El nombre del artículo debe tener al menos cinco caractéres")
        }

        //Validación de la descripción
        const description = document.querySelector("#description")
        if (description.value == "") {
            errors.push('Debe ingresar una descripción del artículo')
        } else if(description.value.length < 20) {
            errors.push("La descripción debe tener al menos veinte caractéres")
        }

        //Validación imagen
        const image = document.querySelector("#image").value;
        const imageExt = image.split('.')[1];
        const validExt = ['jpg', 'jpeg', 'png', 'gif'];
        if (imageExt == undefined) {
            errors.push('Debe cargar una imagen con uno de los siguientes formatos: JPG, JPEG, PNG, GIF.') ;
        } else {
            if (!(validExt.includes(imageExt.toLowerCase()))) {
                errors.push('Formato de imagen invalido. [Permitidos: JPG, JPEG, PNG, GIF]')
            }
        }

        //Validación del stock
        const stock = document.querySelector("#stock")
        if (stock.value == "") {
            errors.push('Debe ingresar el stock del artículo')
        }

        //Validación del precio 
        const price = document.querySelector("#price")
        if (price.value == "") {
            errors.push('Debe ingresar el precio del artículo')
        }

        //Se comprueba si hay errores en la carga del formulario, se muestran si los hay.
        if (errors.length > 0) {
            errors.forEach(error => {
                errorsElement.innerHTML += `<li><i class="fas fa-exclamation-circle"></i> ${error}</li>`
            })
            event.preventDefault()
        }
    })
})