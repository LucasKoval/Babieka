module.exports = (sequelize, DataTypes) => {
    const alias = "Size",
    const cols  = {
        number: {
            type: DataTypes.INTEGER
        }
    },

    const config = {
        tableName: "sizes"
    }
    
    const sizeModel = sequelize.define(alias, cols, config)
    return sizeModel;
}