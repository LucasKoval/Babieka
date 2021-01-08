module.exports = (sequelize, DataTypes) => {
    const alias = 'Category';
    const cols = {
        name: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'categories',
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        })
    };
    
    return Category;
}

