import React, { useEffect } from 'react';
import './css/style.scss';
import './css/additional-styles/theme.scss';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AOS from 'aos';
import Sticky from 'sticky-js';
import {MetaMaskProvider} from 'metamask-react';
import Dashboard from './pages/Dashboard';
import Stake from './pages/Stake';
import Home from './pages/Home';
function App() {

  return (
    <div className="App" >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <MetaMaskProvider>
            <Route path="/dashboard" exact  component={Dashboard} />
            <Route path="/stake" exact  component={Stake} />
          </MetaMaskProvider>
        </Switch>      
      </BrowserRouter>
    </div>
  );
}

export default App;