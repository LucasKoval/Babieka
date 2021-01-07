module.exports = (sequelize ,DataTypes) =>{
    const alias = "Model";
    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    };

    const config = {
        tableName: "models"
    };
    
    const Model = sequelize.define(alias, cols, config);

    Model.associate = function(models) {
        Model.hasMany(models.Product,{
            as: "products",
            foreignKey: "model_id"

        })
    };

    return Model;
}