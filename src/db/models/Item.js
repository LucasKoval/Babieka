module.exports = (sequelize, DataTypes) => {
    const alias = "Item",
    const cols  = {
        user_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        unit_price: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        subTotal: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        order_id: {
            type: DataTypes.INTEGER
        }
    },

    const config = {
        tableName: "items"
    }
    
    const itemModel = sequelize.define(alias, cols, config)
    return itemModel;
}