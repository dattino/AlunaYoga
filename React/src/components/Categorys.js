import React from "react";
import CategorysRow from "./CategorysRow"
import { useState, useEffect } from "react"



function Categorys() {
  const [categorys, setCategorys] = useState([{ nombre: "Indumentaria" }, { nombre: "Clases" }])
  // const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3420/api/v1/products')
      .then(res => res.json())
      .then(data => {
        setCategorys([...data.allCategorys]);
        // setProducts([...data.allProducts]);
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorias
          </h5>
        </div>
        <div className="card-body">
          <div className="row">

          {/* categorias.map((item, i) => {
      if (item.id === (i + 1)) {
        let categoria = productos.filter(item => item.category_id === (i + 1))
        console.log(item.nombre, categoria.length)
      } */}
            {
              categorys.map((row, i) => {
              
                
                return <CategorysRow {...row } key={i} />
              })
            }










          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorys;
