import React from 'react';
import TopBar from '../TopBar';

import Footer from '../Footer';
function Dashboard(){
    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    
                    <Footer />
                </div>
            </div>    
        </React.Fragment>
    )
}
export default Dashboard;