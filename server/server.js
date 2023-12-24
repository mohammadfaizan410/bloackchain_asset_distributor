const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
require('dotenv').config();


const {Web3} = require('web3');
const web3 = new Web3('http://localhost:7545');
web3.eth.getAccounts().then(console.log);
const AssetDistibutor = new web3.eth.Contract(JSON.parse(process.env.ABI), process.env.CONTRACT_ADDRESS);

app.get('/', async (req, res) => {
    await AssetDistibutor.methods.checkContractBalance().call().then((result) => {
        res.send(result.toString());
    }).catch((err) => {
        console.log(err);
    });
  });

  app.get('/api/v1/contract', async (req, res) => {
    res.send(JSON.parse(process.env.ABI));
  });
// app.post('/register', async (req, res) => {
//   let username = req.body.username;
//   let email = req.body.email;
//   let password = req.body.password;
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });