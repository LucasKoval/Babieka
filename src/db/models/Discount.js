module.exports = (sequelize, DataTypes) => {
    const alias = 'Discount';
    const cols = {
        number: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'discounts',
        timestamps: false
    };
    const Discount = sequelize.define(alias, cols, config);

    Discount.associate = (models) => {
        Discount.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'discount_id'

        })
    };

    return Discount;
}