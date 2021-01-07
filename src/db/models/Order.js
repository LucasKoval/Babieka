module.exports = (sequelize, DataTypes) => {
    const alias = "Order";
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
    };

    const config = {
        tableName: "orders"
    };
    
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models){

        Order.belongsTo(models.User,{
            as: "user",
            foreignKey: "user_id"
    
        });
        
        Order.hasMany(models.Item,{
            as: "items",
            foreignKey: "order_id"

        });
    

    };

    return Order;
}