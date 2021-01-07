module.exports = (sequelize, DataTypes) => {
    const alias = "Image";
    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    };

    const config = {
        tableName: "images"
    };
    
    const Image = sequelize.define(alias, cols, config);

    Image.associate = function(models) {
        Image.hasMany(models.Product,{
            as: "products",
            foreignKey: "image_id"

        })
    };

    return Image;
}