import React from 'react';
import Header from "./Header";
import ContentComponent from "./ContentComponent";


function Layout() {
    return (
        <React.Fragment>
            <Header/>
            {/* End hero unit */}

            <ContentComponent/>
        </React.Fragment>
    );
}

export default Layout;
