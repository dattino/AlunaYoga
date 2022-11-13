module.exports = (sequelize, dataTypes) => {
    let alias = "Admins";
    let cols ={

    id: {
    autoIncrement: true,
    primaryKey: true, 
    type:dataTypes.INTEGER
    },
    
    nombre: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: dataTypes.STRING(100),
        allowNull: false
    },
    // created_at:{
    //     type: dataTypes.DATE,
    // },

    // updated_at:{
    //     type: dataTypes.DATE,
    // },

    logicDelete:{
        type: dataTypes.TINYINT,
    }

    };

    let config = {
        tableName : "admins",
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        deletedAt: false
    }

    const Admin = sequelize.define(alias, cols, config);
    //  las asociaciones
 
    return Admin;
}