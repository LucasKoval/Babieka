module.exports = (sequelize, DataTypes) => {
    const alias = 'Item';
    const cols = {
        user_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        model_name: {
            type: DataTypes.STRING
        },
        model_description: {
            type: DataTypes.STRING
        },
        model_image: {
            type: DataTypes.STRING
        },
        unit_price: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        subtotal: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        order_id: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'items'
    };
    const Item = sequelize.define(alias, cols, config);

    Item.associate = (models) => {
        Item.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });

        Item.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
        
        Item.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'order_id'
        });
    };
    
    return Item;
}