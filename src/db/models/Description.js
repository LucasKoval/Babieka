module.exports = (sequelize, DataTypes) => {
    const alias = 'Description';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'descriptions'
    };
    const Description = sequelize.define(alias, cols, config);

    Description.associate = (models) => {
        Description.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'description_id'
        })
    };

    return Description;
}