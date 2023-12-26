import './App.css';
import React from 'react';
import Web3 from 'web3';
import ABI from "./abi.json";
import contract_address from './contract.json';
import Sidebar from './components/sidebar';
import Investment from './components/investment';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from './components/portfolio';
import Profile from './components/profile';
import Settings from './components/settings';
import { useSelector } from 'react-redux';
import Register from './components/register';
import Login from './components/login';

function App() {
  const [myBalance, setMyBalance] = React.useState(0);
  const abi = ABI;
  const contractAddress = contract_address;
  const [account, setAccount] = React.useState(undefined);

  React.useEffect(() => {
    if(account){
      showBalance();
    }
  }, [account]);

  const user = useSelector(state => state.user.user);
  console.log(user);
  
  return (
    user === undefined ?
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Register/>}/>
    <Route path='/login' element={<Login />}/>
    </Routes>
    </BrowserRouter>
    :
    <BrowserRouter>
    <div className="App">
            <div>
            <Sidebar/>
            <div className='main-content'>
            <Routes>
              <Route path='/' element={<Investment/>}/>
              <Route path='/portfolio' element={<Portfolio />}/>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/settings' element={<Settings />}/>
            </Routes>
              </div>
              </div>
    </div>
    </BrowserRouter>
  );
  

  function connectWalletAccount(){
    if(window.ethereum){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(accounts => {
        setInterval(() => {
          setAccount(accounts[0]);
        }, 1000);
      })
      .catch(err => console.log(err));
    }
  }

  function showBalance(){
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.showBalance(account).call().then(data => setMyBalance(web3.utils.fromWei(data.toString(), 'ether')));
  }

  function sendBalanceToContract(){
    console.log(account);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.checkContractBalance().call().then(data => console.log(data.toString()))
    contract.methods.addBalance(account).send({from: account, value: web3.utils.toWei('1', 'ether')})
    .then(receipt => console.log(receipt))
    .catch(err => console.log(err));
    contract.methods.checkContractBalance().call().then(data => console.log(web3.utils.fromWei(data.toString(), 'ether')))
  }
  
}



export default App;
