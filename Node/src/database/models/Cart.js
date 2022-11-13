module.exports = (sequelize, dataTypes) => {
    let alias = "Carts";
    let cols = {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },

        // email: {
        //     type: dataTypes.STRING(100),
        //     allowNull: false
        //     },

        user_id: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        product_id: {
            type: dataTypes.STRING(100),
            allowNull: false
        },


        created_at: {
            type: dataTypes.DATE,
        },

        edited_at: {
            type: dataTypes.DATE,
        },

        available: {
            type: dataTypes.TINYINT,
        },
    };

    let config = {
        tableName: "carts",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Cart = sequelize.define(alias, cols, config);
    // Cart.associate = (models) => {
    //     Cart.hasMany(models.Users, {
    //         as: "users",
    //         foreignKey: "user_id"
    //     });
    // }
    return Cart;
}