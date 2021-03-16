module.exports = (sequelize, DataTypes) => {
    const alias = 'Item';
    const cols = {
        name: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        price: {
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
        user_id: {
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

        Item.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'order_id'
        });
    };
    
    return Item;
}