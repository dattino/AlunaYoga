import React from "react";
import CategorysRow from "./CategorysRow"
import { useState, useEffect } from "react"

let categorias = {
  nombre: 'Cargando Nombre Categoría...',
  total: 'Cargando Total...',
}

let cartProps = [categorias];



function Categorys() {
  const [categorias, setCategorias] = useState([{ nombre: "Indumentaria" }, { nombre: "Clases" }])
  const [productos, setProductos] = useState()
  useEffect(() => {
    fetch('http://localhost:3420/api/v1/products')
      .then(res => res.json())
      .then(data => {
        setProductos([...data.allProducts])
        setCategorias([...data.allCategorys])
      })
      .catch(error => console.log(error))
  }, [])

  if (productos) {
    cartProps = []
    categorias.map((item, i) => {
      if (item.id === (i + 1)) {
        let categoria = productos.filter(item => item.category_id === (i + 1))
        cartProps.push({
          nombre: item.nombre,
          total: categoria.length,
        })
      }
      return cartProps
    })
  }

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
            {
              cartProps.map((row, i) => {
                return <CategorysRow {...row} key={i} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorys;
