module.exports = (sequelize, DataTypes) => {
    const alias = "Order",
    const cols  = {
        user_id: {
            type: DataTypes.INTEGER
        },
        order_number: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.STRING
        }
    },

    const config = {
        tableName: "orders"
    }
    
    const orderModel = sequelize.define(alias, cols, config)
    return orderModel;
}