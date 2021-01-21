module.exports = (sequelize ,DataTypes) =>{
    const alias = 'Model';
    const cols = {
        category_id: {
            type: DataTypes.INTEGER
        },
        type_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        color_id: {
            type: DataTypes.INTEGER
        },
        image_id: {
            type: DataTypes.INTEGER
        },
        base: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'models'
    };
    const Model = sequelize.define(alias, cols, config);

    Model.associate = (models) => {
        Model.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'model_id'
        });

        Model.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });

        Model.belongsTo(models.Type, {
            as: 'type',
            foreignKey: 'type_id'
        });

        Model.belongsTo(models.Color, {
            as: 'color',
            foreignKey: 'color_id'
        });

        Model.belongsTo(models.Image, {
            as: 'image',
            foreignKey: 'image_id'
        });
    };

    return Model;
}