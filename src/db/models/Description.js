module.exports = (sequelize, DataTypes) => {
    const alias = "Description",
    const cols  = {
        text: {
            type: DataTypes.STRING
        }
    },

    const config = {
        tableName: "descriptions"
    }
    
    const descriptionModel = sequelize.define(alias, cols, config)
    return descriptionModel;
}