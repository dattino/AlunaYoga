module.exports = (sequelize, dataTypes) => {
    let alias = "Talles";
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



    created_at:{
        type: dataTypes.DATE,
    },

    updated_at:{
        type: dataTypes.DATE,
    },

    logicDelete:{
        type: dataTypes.TINYINT,
    },

    };

    let config = {
        tableName : "talles",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Talle = sequelize.define(alias, cols, config);
       //  las asociaciones
       Talle.associate = function (models){
        Talle.hasMany(models.Products, {
            as: "products",
            foreignKey: "talle_id"
        });
    };
    return Talle;
}