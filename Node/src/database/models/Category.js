module.exports = (sequelize, dataTypes) => {
    let alias = "Categorys";
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
    }

    };

    let config = {
        tableName : "categorys",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Category = sequelize.define(alias, cols, config);
    //  las asociaciones
    Category.associate = function (models){
        Category.hasMany(models.Products, {
            as: "products",
            foreignKey: "category_id"
        });
    };
    return Category;
}