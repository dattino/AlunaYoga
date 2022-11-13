const db = require ('./database/models');

db.Products
    .findAll( {
        include: [{ association: 'categorys' }]
    })
    .then ( users => {
        
            console.log (users)
        }
    // .then ( users => {
    //   for (let user of users) {
    //      console.log (user.id, user.category_id, user.categorys.n)
    //   }
    )


    for(i=0; i < carrito.length; i++) { 
         acumulador = 0 
         acumulador + product[i].finalPrice 
        return acumulador }