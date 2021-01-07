module.exports = (sequelize, DataTypes) => {
    const alias = "Image",
    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    },

    const config = {
        tableName: "images"
    }
    
    const imageModel = sequelize.define(alias, cols, config)
    return imageModel;
}