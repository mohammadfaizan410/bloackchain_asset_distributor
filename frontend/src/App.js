import './App.css';
import React from 'react';
import Web3 from 'web3';
import ABI from "./abi.json";
import contract_address from './contract.json';

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

  window.ethereum.on('accountsChanged', function (accounts) {
    setAccount(accounts[0]);
  });
  
  return (
    <div className="App">
      <div>
        {
          account ?
          <div className='investment-form'>
            <label>Investment Amount:</label>
            <input type='number' name='investmentAmount' placeholder='ETH'/>
            <button type='button' onClick={() =>{
                sendBalanceToContract(account, abi, contractAddress);
            }}>Invest</button>
            <h1>Your balance with us: {myBalance}</h1>
          </div>
          :
          <button className='metamask-connect' onClick={()=>connectMetaMaskAccount()}>
          Connect MetaMask
        </button>
        }
      </div>
    </div>
  );
  

  function connectMetaMaskAccount(){
    if(window.ethereum){
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(accounts => {
        setAccount(accounts[0]);
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
