module.exports = (sequelize, DataTypes) => {
    const alias = "Description";
    const cols  = {
        text: {
            type: DataTypes.STRING
        }
    };

    const config = {
        tableName: "descriptions"
    };
    
    const Description = sequelize.define(alias, cols, config);

    Description.associate = function(models) {
        Description.hasMany(models.Product,{
            as: "products",
            foreignKey: "description_id"

        })
    };

    return Description;
}