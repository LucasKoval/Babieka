module.exports = (sequelize, DataTypes) => {
    const alias = "Discount",
    const cols  = {
        number: {
            type: DataTypes.STRING
        }
    },

    const config = {
        tableName: "discounts"
    }
    
    const discountModel = sequelize.define(alias, cols, config)
    return discountModel;
}