import './App.css';
import Dashboard from './pages/Dashboard';
import { MetaMaskProvider, useMetaMask } from "metamask-react";
function App() {
  return (
    <div className="App">
          <MetaMaskProvider><Dashboard/></MetaMaskProvider>
      
    </div>
  );
}

export default App;
