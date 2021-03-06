import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Upload from './pages/Upload';
import View from './pages/View';
import UserView from './pages/UserView';
import Error from './pages/Error';
import Header from './layouts/Header';
import Footer from './layouts/Footer';


function App(props) {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Upload} />
                    <Route exact path="/view-all" component={View} />
                    <Route exact path="/view-single-user" component={UserView} />
                    <Route path="*" component={Error} />
                </Switch>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
