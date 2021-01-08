module.exports = (sequelize ,DataTypes) =>{
    const alias = 'Model';
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
        tableName: 'models',
        timestamps: false
    };
    const Model = sequelize.define(alias, cols, config);

    Model.associate = (models) => {
        Model.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'model_id'
        })
    };

    return Model;
}