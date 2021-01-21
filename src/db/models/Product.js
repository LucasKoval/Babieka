module.exports = (sequelize, DataTypes) => {
    const alias = 'Product';
    const cols = {
        model_id: {
            type: DataTypes.INTEGER
        },
        size_id: {
            type: DataTypes.INTEGER
        },
        discount_id: {
            type: DataTypes.INTEGER
        },
        stock: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'products'
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.hasMany(models.Item, {
            as: 'items',
            foreignKey: 'product_id'
        });
        
        Product.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'model_id'
        });

        Product.belongsTo(models.Size, {
            as: 'size',
            foreignKey: 'size_id'
        });

        Product.belongsTo(models.Discount, {
            as: 'discount',
            foreignKey: 'discount_id'
        });
 
    };

    return Product;
}