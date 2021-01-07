module.exports = (sequelize, DataTypes) => {
    const alias = "Category";

    const cols  = {
        name: {
            type: DataTypes.STRING
        }
    };

    const config = {
        tableName:"categories"
    };

    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function(models) {
        Category.hasMany(models.Product,{
            as: "products",
            foreignKey: "category_id"

        })
    };
    
    
    return Category;

}

