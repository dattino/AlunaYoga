module.exports = (sequelize, dataTypes) => {
    let alias = "Marcas";
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
        tableName : "marcas",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }


    const Marca = sequelize.define(alias, cols, config);
    //  las asociaciones
    Marca.associate = function (models){
        Marca.hasMany(models.Products, {
            as: "products",
            foreignKey: "marca_id"
        });
    };
    return Marca;
}