# DAILY/WEEKLY - Sprint 5
<br>
<P>

## * 12/12:
- Elaboración grupal retro.md.
- Actualización tablero de trabajo.
- Definimos qué rutas van a requerir al usuario loguearse.
- Verificamos la estructura de directorios y archivos de usuarios, están finalizadas.
- Definimos cronograma de trabajo para organizarnos y llegar con todos los requisitos.
- Asignamos las tareas a realizar por cada integrante y cuáles serán resueltas de modo grupal. 
- Agregamos en nuestro trello tareas y aspectos importantes a mejorar no contemplados en el pdf del sprint (autenticaciones, botones desplegables).
- Definimos cómo mostrar en el header los datos del usuario logueado. 
</P>
<br>
<P>

## * 16/12:
- Analizamos grupalmente el feedback para saber qué cosas debemos arreglar para el próximo sprint.
- Acordamos intentar aplicar los botones de borrar y editar productos para que lo vean solo los administradores.
- Definimos terminar primero el trabajo de middlewares para después poder aplicarlo a nuestro repositorio. 
</P>
<br>
<P> 

## * 17/12:
- Terminamos el trabajo integrador de middlewares y acordamos cómo nos vamos a organizar para implementarlo en babieka.
- Acordamos juntarnos nuevamente a la noche para poder pasar lo que hicimos al repositorio y comprobar su correcto funcionamiento realizando las adaptaciones necesarias. 
</P>
<br>
<P>

## * 18/12:
- Nos reunimos para crear la carpeta middlewares, implementamos los archivos y las lógicas de cada uno.
- Arreglamos los métodos del controlador y las rutas para adecuarse a los nuevos middlewares y los requerimos e implementamos en las rutas correspondientes.
- Modificamos el menú de usuario para mostrarlo de manera distinta si hay un usuario logueado (cerrar sesión / mi perfil).
</P>
<br>
<P>

## * 21/12:
- Nos reunimos para comentar los cambios realizados el fin de semana por cada uno y definir lo que falta arreglar.
- Lucas  modificó las vistas para responder a los middlewares, session y cookies, creó botones de eliminar/editar para usuarios y editar y eliminar productos en detalle si el usuario es admin, modificó el git ignore y arregló los métodos de edición de usuario que tenían fallas en el controlador.
- Julieta arregló el método put de usuarios y productos para que no rompa si no hay imagen, conservando el usuario la anterior si no se ingresa una nueva, y para que si el usuario no es admin no espere una nueva categoría ni se muestre el imput, sacó el banner e imagen de inicio en las vistas de listado de producto y de usuarios, finalizó las correcciones y aplicación de middlewares, creó la visualización de errores en vistas de login y registro y arregló en vistas registro y edit user el maquetado para que no se distorsionen las imágenes al modificar el tamaño de la pantalla.
- Federico modifica el tamaño de imágenes para que se vean todas del mismo modo en la vista y el detalle y mejora la apariencia de la vista detalle agregando divs para que las imágenes respeten la proporción y no se distorsionen. 
- De manera grupal realizamos la creación e implementación admin middlewares, chequeamos y finalizamos el ruteo con los middlewares correspondientes a cada ruta y se arregla el error en formulario de edición que provocaba que al no completar la contraseña se guardara como campo vacio, ahora guarda la contraseña que ya tenía si la misma no se modifica.
</P>
<br>
<P>

## * 22/12:
- Nos reunimos para terminar de comprobar el funcionamiento de todas las implementaciones del sprint y poder realizar la entrega.
- Lucas modularizó las funciones de multer, arregló el maquetado del listado de usuarios y mejoró los nombres de los middlewares.
- Julieta implementó la persistencia de datos al registrarse en caso de cometer errores al rellenar el formulario, se conserva el value ingresado de los campos rellenados correctamente y agrega toLowerCase al analizar la extensión de las imágenes.
- Se corrige de forma grupal el middleware de acceso al registro, para permitir que los admin puedan crear un usuario y un error en el listado de usuarios al nombrar una variable, la cual sobrescribía el valor de la misma que se usaba en la vista registro, haciendo que se auto rellenaran los campos con los datos del último usuario registrado. 
</P>