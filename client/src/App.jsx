import React, { useState, Component } from "react";
import {FileUpload} from './components/FileUpload';
import SiteName from './components/SiteName';
import TransactionAdd from './components/TransactionAdd';
import TransactionShow from './components/TransactionShow';
import TransactionInput from './components/TransactionInput';
import "./App.css";
import TransactionContract from "../src/contracts/Transaction.json"
import Web3 from 'web3';
import { useEffect } from "react";

// const App = () => {
//   const [fileUrl, setFileUrl] = useState("");

//   return (
//     <div>
//       <SiteName />
//       <TransactionInput></TransactionInput>

//       <FileUpload setUrl={setFileUrl} />
//       FileUrl :{" "}
//       <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//         {fileUrl}
//       </a>
//       <br></br>
//       <TransactionAdd>트랜잭션 추가</TransactionAdd>
//       <TransactionShow>트랜잭션 보기</TransactionShow>
//     </div>
//   );
// };

// export default App;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      account: null,
      transactionInstance: null,

      ttype: null,
      name: null,
      timestamp: null,
      ipfs_hash: null,
      registrant: null,
      responsible_manager: null,
      file_type: null,
      file_description: null
    };
  }

  // componentWillMount() {
  //   this.loadBlockchainData()
  // }

  // async loadBlockchainData() {
  //   const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  //   console.log(web3)
  //   const accounts = await web3.eth.getAccounts();
  //   console.log(accounts)
  //   this.setState({ account: accounts[0], web3: web3});
  //   console.log(this.state.account);
  //   console.log(this.state.web3);
  //   this.instantiateContract();
  // }

  // instantiateContract() {
  //   const contract = require("truffle-contract");
  //   const transaction = contract(TransactionContract);
  //   console.log(this.state.web3);
  //   transaction.setProvider(this.state.web3.currentProvider);

  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     if (!error){
  //       transaction.deployed().then(instance => {
  //         this.setState({transactionInstance: instance, account: accounts[0]});
  //         this.updateAllTransactions();
  //       })
  //     }
  //   })
  // }


  componentWillMount() {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    this.setState({
      web3: web3
    }, () => {
      this.instantiateContract();
    })
    console.log(web3)
  }

  instantiateContract(){
    const contract = require("truffle-contract");
    const transaction = contract(TransactionContract);
    console.log(this.state.web3);
    transaction.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts((error, accounts) => {
      if (!error){
        transaction.deployed().then(instance => {
          this.setState({transactionInstance: instance, account: accounts[0]});
          this.updateAllTransactions();
        })
      }
    })
  }





  sendTransaction() {
    this.state.transactionInstance.sendTransaction({
      from: this.state.account,
      gas: 900000
    })
  }

  //ttype에다가 일단 transaction 정보 다 넣기
  updateAllTransactions() {
    this.state.transactionInstance.updateAllTransactions.then(result => {
      this.setState ({ttype: result})
    })
  }

  // render() {
  //   return (
  //     <div className>
  //       <SiteName />
  //       <TransactionInput></TransactionInput>

  //       {/* <FileUpload setUrl={setFileUrl} />
  //       FileUrl :{" "}
  //       <a href={fileUrl} target="_blank" rel="noopener noreferrer">
  //         {fileUrl}
  //       </a> */}
  //       <p>Your account: {this.state.account}</p>
  //       <br></br>
  //       <TransactionAdd>트랜잭션 추가</TransactionAdd>
  //       <TransactionShow>트랜잭션 보기</TransactionShow>
  //     </div>
  // )};

  render() {
    return (
      <div>
        <input type="text" placeholder="Type"></input>
        <br></br>
        <input type="text" placeholder="Name"></input>
        <br></br>
        <input type="text" placeholder="Time"></input>
        <br></br>
        <input type="text" placeholder="IPFS Hash"></input>
        <br></br>
        <input type="text" placeholder="Registrant"></input>
        <br></br>
        <input type="text" placeholder="Responsible Manager"></input>
        <br></br>
        <input type="text" placeholder="File Type"></input>
        <br></br>
        <input type="text" placeholder="File Description"></input>
        <br></br>
        
        <p>Your account: {this.state.account}</p>
        <br></br>

        <button onClick={() => this.sendTransaction()}>
          트랜잭션 추가
        </button>
        <br></br>

        <p>all transactions:</p>
        <br></br>
        <p>{this.state.ttype}</p>
      </div>
    )
  }
}

export default App;






// class App extends Component {
//   componentWillMount() {
//     this.loadBlockchainData()
//   }

//   async loadBlockchainData() {
//     const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })
//   }

//   constructor(props) {
//     super(props)
//     this.state = { account: '' }
//   }

//   render() {
//     return (
//       <div>
//         <SiteName />
//         <TransactionInput></TransactionInput>

//         {/* <FileUpload setUrl={setFileUrl} />
//         FileUrl :{" "}
//         <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//           {fileUrl}
//         </a> */}
//         <p>Your account: {this.state.account}</p>
//         <br></br>
//         <TransactionAdd>트랜잭션 추가</TransactionAdd>
//         <TransactionShow>트랜잭션 보기</TransactionShow>
//       </div>
//   )};
// }

// export default App;
