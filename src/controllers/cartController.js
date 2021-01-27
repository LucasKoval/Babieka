//----------* REQUIRE'S *----------//
const helper = require('../helpers/helper');
const db = require('../db/models');


//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* MAIN CONTROLLER *----------//
const cartController = {
    // Agrega un articulo al Carrito.
    //-- Buscar el articulo a cargar en el carrito y guardar su "id".
    //-- A partir de su "id", obetener el modelo.
    //-- Almacenar del modelo su name, description e image.
    //-- Crear un nuevo item con el "id" del usuario en session y el "id" del producto a cargar.
    //-- Completar los campos del producto y del modelo con "status" = 0 y "order_id" = null.
    //-- Redireccionar a Coleccion o Carrito
    addToCart: async (req, res) => {
        const productToAdd = await db.Product.findByPk(req.params.id)
        const productImage = await db.Product.findByPk(productToAdd.model.image_id)

        await db.Item.create({
            user_id: req.session.user.id,
            product_id: req.params.id,
            model_name: productToAdd.model.name,
            model_description: productToAdd.model.description,
            model_image: productImage.name,
            unit_price: productToAdd.price,
            quantity: req.body.quantity,
            subtotal: productToAdd.price * req.body.quantity,
            status: 0,
            order_id: null
        },
        {include: [{
            all: true,
            nested: true
        }]});
        return res.redirect('/carrito');
    },

    // Renderiza la vista Carrito
    cart: (req, res) => {     
        const products = helper.getCartProducts();
		res.render('products/productCart', {
			cartProducts: products,
		}); 
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = cartController;