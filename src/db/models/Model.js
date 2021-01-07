module.exports = (sequelize ,DataTypes) =>{
    const alias = "Model",
    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    },

    const config = {
        tableName: "models"
    }
    
    const modelModel = sequelize.define(alias, cols, config)
    return modelModel;
}