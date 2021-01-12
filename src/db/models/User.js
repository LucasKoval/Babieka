module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        role_id: {
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'users'
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.Role, {
            as: 'role',
            foreignKey: 'role_id'
        });

        User.hasMany(models.Item, {
            as: 'items',
            foreignKey: 'user_id'
        });

        User.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'user_id'
        });
    };  

    return User;
}