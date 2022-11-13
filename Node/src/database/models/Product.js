module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols ={

    id: {
    autoIncrement: true,
    primaryKey: true,
    type:dataTypes.INTEGER
    },

    name: {
        type: dataTypes.STRING(100),
        allowNull: false
    },

    category_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },

    price:{
        type: dataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discount:{
        type: dataTypes.DECIMAL(2),
        allowNull: false
    },
    finalPrice:{
        type: dataTypes.DECIMAL(10, 2),
    },
    description:{
        type: dataTypes.TEXT,
    },

    talle_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },

    marca_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },

    stock:{
        type: dataTypes.INTEGER,
    },

    image:{
        type: dataTypes.STRING(500),
        
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
        tableName : "products",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Product = sequelize.define(alias, cols, config);
    //asociaciones
    Product.associate = function(models){
        Product.belongsTo(models.Categorys, {
            as: "categorys",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Marcas, {
            as: "marcas",
            foreignKey: "marca_id"
        });
        Product.belongsTo(models.Talles, {
            as: "talles",
            foreignKey: "talle_id"
        });
    };

    return Product;
}