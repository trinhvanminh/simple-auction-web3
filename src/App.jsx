import React, { useState } from "react";
import Web3 from "web3";
import { ContractABI } from "./ContractABI";

import "./App.css";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0x1559348869e11944Afa1f02c8335be94f138eA74"
);

function App() {
  const [message, setMessage] = useState("");

  const setData = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const gas = await RemixContract.methods.endAuction().estimateGas();
    const result = await RemixContract.methods
      .endAuction()
      .send({ from: account, gas });
    console.log(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={setData}>
          <label>
            Set Message:
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <input type="submit" value="Set Message" />
        </form>
        <br />
      </header>
    </div>
  );
}

export default App;
