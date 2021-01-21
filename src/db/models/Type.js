module.exports = (sequelize ,DataTypes) => {
    const alias = 'Type';
    const cols = {
        name: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName:'types'
    };
    const Type = sequelize.define(alias, cols, config);

    Type.associate = (models) => {
        Type.hasMany(models.Model, {
            as: 'models',
            foreignKey: 'type_id'
        });
    };

    return Type;
}