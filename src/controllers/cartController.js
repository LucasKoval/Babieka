//----------* REQUIRE'S *----------//
const helper = require('../helpers/helper');
const db = require('../db/models');



//----------* VARIABLE'S *----------//
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


//----------* MAIN CONTROLLER *----------//
const cartController = {
    // Agrega un articulo al Carrito.
    
    addItem:  async (req, res) => {
        //-- Buscar el articulo a cargar en el carrito por su "id" y guardarlo.
        const productToAdd = await db.Product.findByPk(req.params.id, {
            include: { 
                all: true, 
                nested: true}
            });
    
       
        let quantity = req.body.productsQuantity;
       
        //-- Crear un nuevo item con el "id" del usuario en session y los datos del producto a cargar.
        //-- Completar los campos "status" = 0 y "order_id" = null.
        await db.Item.create({
            name: productToAdd.model.name,
            description: productToAdd.model.description,
            image: productToAdd.model.image.name,
            price: productToAdd.price,
            quantity: quantity,
            subtotal: productToAdd.discount.number > 0 ? (productToAdd.price-((productToAdd.price*productToAdd.discount.number)/100)) * quantity : productToAdd.price * quantity,
            status: 0,
            user_id: req.session.user.id,
            order_id: null
        });

        //-- Redireccionar a Coleccion o Carrito
        return res.redirect('/carrito');
    },

    // Renderiza la vista Carrito
    cart: async (req, res) => {     
        //-- Busca los productos correspondientes al usuario en sesión 
        const cartItems =  await db.Item.findAll({where:{
            user_id: req.session.user.id,
            status: 0
        }})

		res.render('products/productCart', {cartItems}); 
    },

    // Elimina un item del carrito
    removeItem: async (req, res) => {
        await db.Item.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.redirect('/carrito')
    },

    // Procesa la commpra del artículo
    buyItem: async (req,res) => {
        const itemsToBuy =  await db.Item.findAll({where:{
            user_id: req.session.user.id,
            status: 0
        }})

        let totalPrice = 0;

        itemsToBuy.forEach(element => {
            totalPrice = totalPrice + element.subtotal
        });

        let newOrder = await db.Order.create({
            user_id: req.session.user.id,
            total: totalPrice
        })

        let orderId = newOrder.id

        await db.Item.update({
            status: 1,
            order_id: orderId
        },
        {where: {
            status: 0,
            user_id: req.session.user.id
        }})
        return res.redirect('/carrito/compra-finalizada')
    },

    // Renderiza la vista de la compra finalizada
    purchaseCompleted: (req,res) => {
        return res.render('products/purchaseCompleted')
    },

    myPurchases: async (req,res) => {
        purchasedItems= await db.Item.findAll({
            where: {
                status: 1,
                user_id: req.session.user.id
            }
        })
        return res.render('products/myPurchases' , {purchasedItems})
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = cartController;