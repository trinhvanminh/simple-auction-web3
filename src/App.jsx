import React, { useState } from "react";
import Web3 from "web3";
import { ContractABI } from "./ContractABI";

import "./App.css";

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

const AuctionContract = new web3.eth.Contract(
  ContractABI,
  "0x37566FccB0C2C9e5ee2d6fC5940b918aB8d92076"
);

const itemStyle = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "16px",
};

const buttonStyle = { marginRight: "16px" };

function App() {
  const [totalSupply, setTotalSupply] = useState(0);
  const [decimals, setDecimals] = useState("-");
  const [balance, setBalance] = useState("-");
  const [account, setAccount] = useState();

  const getTotalSupply = async (e) => {
    e.preventDefault();
    const result = await AuctionContract.methods.totalSupply().call();
    setTotalSupply(result);
  };

  const getDecimals = async (e) => {
    e.preventDefault();
    const result = await AuctionContract.methods.decimals().call();
    setDecimals(result);
  };

  const getBalance = async (e) => {
    e.preventDefault();
    const result = await AuctionContract.methods.balanceOf(account).call();
    setBalance(result);
  };

  const handleConnectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setAccount(account);
    } else {
      alert("install metamask extension!!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          See all <b style={{ color: "pink" }}>AUC</b> contract methods{" "}
          <a
            href="https://testnet.bscscan.com/address/0x37566fccb0c2c9e5ee2d6fc5940b918ab8d92076#readContract"
            target="_blank"
          >
            here
          </a>
        </h1>
        <div style={itemStyle}>
          <button
            onClick={handleConnectAccount}
            style={{ ...buttonStyle, backgroundColor: "green" }}
          >
            Connect Account
          </button>
          <p>{account}</p>
        </div>
        <div style={itemStyle}>
          <button onClick={getTotalSupply} style={buttonStyle}>
            get AUC total supply
          </button>
          <p>{new Intl.NumberFormat().format(totalSupply)}</p>
        </div>
        <div style={itemStyle}>
          <button onClick={getDecimals} style={buttonStyle}>
            get AUC Decimals
          </button>
          <p>{decimals}</p>
        </div>
        <div style={itemStyle}>
          <button onClick={getBalance} style={buttonStyle}>
            get your Balance
          </button>
          <p>{balance}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
