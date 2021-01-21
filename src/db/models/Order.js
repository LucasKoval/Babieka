module.exports = (sequelize, DataTypes) => {
    const alias = 'Order';
    const cols = {
        user_id: {
            type: DataTypes.INTEGER
        },
        order_number: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'orders'
    };
    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        
        Order.hasMany(models.Item, {
            as: 'items',
            foreignKey: 'order_id'
        });
    };

    return Order;
}