module.exports = (sequelize, DataTypes) => {
    const alias = 'Color';
    const cols = {
        name: {
            type: DataTypes.STRING
        },
        hex: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'colors'
    };
    const Color = sequelize.define(alias, cols, config);

    Color.associate = (models) => {
        Color.hasMany(models.Model, {
            as: 'models',
            foreignKey: 'color_id'
        });
    };

    return Color;
}