module.exports = (sequelize, DataTypes) => {
    const alias = 'Image';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'images'
    };
    const Image = sequelize.define(alias, cols, config);

    Image.associate = (models) => {
        Image.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'image_id'
        })
    };

    return Image;
}