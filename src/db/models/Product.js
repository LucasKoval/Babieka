module.exports = (sequelize, DataTypes) => {
    const alias = 'Product';
    const cols = {
        category_id: {
            type: DataTypes.INTEGER
        },
        type_id: {
            type: DataTypes.INTEGER
        },
        model_id: {
            type: DataTypes.INTEGER
        },
        description_id: {
            type: DataTypes.INTEGER
        },
        size_id: {
            type: DataTypes.INTEGER
        },
        color_id: {
            type: DataTypes.INTEGER
        },
        image_id: {
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
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });

        Product.belongsTo(models.Color, {
            as: 'color',
            foreignKey: 'color_id'
        });

        Product.belongsTo(models.Description, {
            as: 'description',
            foreignKey: 'description_id'
        });

        Product.belongsTo(models.Discount, {
            as: 'discount',
            foreignKey: 'discount_id'
        });

        Product.belongsTo(models.Image, {
            as: 'image',
            foreignKey: 'image_id'
        });

        Product.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'model_id'
        });

        Product.belongsTo(models.Size, {
            as: 'size',
            foreignKey: 'size_id'
        });

        Product.belongsTo(models.Type, {
            as: 'type',
            foreignKey: 'type_id'
        });
    };

    return Product;
}