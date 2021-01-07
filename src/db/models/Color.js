module.exports = (sequelize, DataTypes) => {
    const alias = "Color",
    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    },

    const config = {
        tableName: "colors"
    }
    
    const colorModel = sequelize.define(alias, cols, config)
    return colorModel;
}