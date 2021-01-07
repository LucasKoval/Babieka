module.exports = (sequelize ,DataTypes) => {
    const alias = "Type",
    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    },

    const config = {
        tableName:"types"
    }
    
    const typeModel = sequelize.define(alias, cols, config)
    return typeModel;
}