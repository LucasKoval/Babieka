module.exports = (sequelize ,DataTypes) => {
    const alias = "Role",
    const cols  = {
        
        value : {
            type :DataTypes.INTEGER
            
        },
        name : {
            type :DataTypes.STRING
        }
    },

    const config = {
        tableName : "roles"
    }

    const RoleModel = sequelize.define(alias ,cols ,config)
    return RoleModel;
}