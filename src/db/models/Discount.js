module.exports = (sequelize, DataTypes) => {
    const alias = "Discount";
    const cols  = {
        number: {
            type: DataTypes.STRING
        }
    };

    const config = {
        tableName: "discounts"
    };
    
    const Discount = sequelize.define(alias, cols, config);

    Discount.associate = function(models) {
        Discount.hasMany(models.Product,{
            as: "products",
            foreignKey: "discount_id"

        })
    };

    return Discount;
}