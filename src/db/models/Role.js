module.exports = (sequelize ,DataTypes) => {
    const alias = 'Role';
    const cols = {
        value: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'roles'
    };
    const Role = sequelize.define(alias, cols, config);

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            as: 'users',
            foreignKey: 'role_id'
        });
    };

    return Role;
}