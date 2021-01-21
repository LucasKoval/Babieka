module.exports = (sequelize, DataTypes) => {
    const alias = 'Discount';
    const cols = {
        number: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'discounts'
    };
    const Discount = sequelize.define(alias, cols, config);

    Discount.associate = (models) => {
        Discount.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'discount_id'
        });
    };

    return Discount;
}