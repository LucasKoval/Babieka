module.exports = (sequelize, DataTypes) => {
    const alias = 'Image';
    const cols = {
        name: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'images'
    };
    const Image = sequelize.define(alias, cols, config);

    Image.associate = (models) => {
        Image.hasMany(models.Model, {
            as: 'models',
            foreignKey: 'image_id'
        });
    };

    return Image;
}