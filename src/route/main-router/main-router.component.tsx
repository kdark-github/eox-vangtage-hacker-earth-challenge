import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import AppBar from '../../components/app-bar/app-bar.component';
import Homepage from '../../pages/homepage/homepage.component';
import Publisher from '../../pages/publisher/publisher.component';

interface MainRouterProps {
}


const MainRouter: React.FC<MainRouterProps> = (props) => {


    return (
        <>
            <Router>
                <AppBar />

                <Route exact path="/">
                    <Redirect to="/homepage" />
                </Route>
                <Route path='/homepage' component={Homepage} />
                <Route path='/publisher/:publisherName' component={Publisher} />
            </Router>
        </>
    );
};

export default MainRouter;

