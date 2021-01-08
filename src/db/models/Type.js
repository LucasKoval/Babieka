module.exports = (sequelize ,DataTypes) => {
    const alias = 'Type';
    const cols = {
        name: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName:'types',
        timestamps: false
    };
    const Type = sequelize.define(alias, cols, config);

    Type.associate = (models) => {
        Type.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'type_id'
        })
    };

    return Type;
}