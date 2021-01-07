module.exports = (sequelize ,DataTypes) => {
    const alias = "Type";
    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    };

    const config = {
        tableName:"types"
    };
    
    const Type = sequelize.define(alias, cols, config);

    Type.associate = function(models) {
        Type.hasMany(models.Product,{
            as: "products",
            foreignKey: "type_id"

        })
    };

    return Type;
}