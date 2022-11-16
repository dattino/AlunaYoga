import React from 'react';


import Categorys from './Categorys';
import LastProductInDb from './LastProductInDb';
import LastUserInDb from './LastUserInDb';

function ContentRowCenter(){
    return (
        <div className="row">
            
           
            <LastProductInDb />
            <LastUserInDb />
       

            <Categorys />

        </div>
    )
}

export default ContentRowCenter;