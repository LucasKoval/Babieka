module.exports = (sequelize, DataTypes) => {
    const alias = "User",
    const cols  = {
        role_id: {
            type: DataTypes.INTEGER
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
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
    },

    const config = {
        tableName: "users"
    }
    
    const userModel = sequelize.define(alias, cols, config)

   
    return userModel;
}