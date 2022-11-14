import React from "react";
import CategorysRow from "./CategorysRow"
function Categorys() {
  const [categorys, setCategorys] = useState([{name:"Indumentaria"},]) 


  useEffect(() => {
      fetch('http://localhost:3420/api/v1/products')
          .then(res => res.json())
          .then(data =>{
              console.log(data.allCategorys)
              setCategorys ( [...data.allCategorys])
             
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


              {
                            categorys.map( ( row , i) => {
                                return <CategorysRow { ...row} key={i}/>
                            })
                            }
        
           
        
           
          
            
         
         
            
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorys;
