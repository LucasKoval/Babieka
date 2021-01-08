module.exports = (sequelize, DataTypes) => {
    const alias = 'Size';
    const cols = {
        number: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'sizes',
        timestamps: false
    };
    const Size = sequelize.define(alias, cols, config);

    Size.associate = (models) => {
        Size.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'size_id'
        })
    };

    return Size;
}