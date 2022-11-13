module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart: {
            type: dataTypes.STRING(),
            defaultValue:'[{}]'
        },

        avatar: {
            type: dataTypes.STRING(100),
            defaultValue: "default-user.png"
        },

        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        password: {
            type: dataTypes.STRING(60),
            allowNull: false
        },

        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        lastName: {
            type: dataTypes.STRING(100),
        },

        birthdate: {
            type: dataTypes.STRING(10),
            allowNull: false
        },

        isAdmin: {
            type: dataTypes.BOOLEAN,
            defaultValue: 0,
        },

        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },

        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        },

        isActive: {
            type: dataTypes.BOOLEAN,
            defaultValue: 1,
        }

    };

    let config = {
        tableName: "users",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const User = sequelize.define(alias, cols, config);
    //  las asociaciones

    // User.associate = (models) => {
    //     User.belongsTo(models.Carts, {
    //         as: "carts",
    //         foreignKey: "user_id"
    //     });
    // }

    return User;
}