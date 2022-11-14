import React from 'react';
import LastMovieInDb from './LastMovieInDb';

import Categorys from './Categorys';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <Categorys />

        </div>
    )
}

export default ContentRowCenter;