import { useEffect, useState } from "react";
import chai from "./contract/Chai.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const connectWallet = async () => {
    // const provider = detectEthereumProvider();
    const contracAddress = "0xb4d6244025b078ef28dEA51615B32F7b6EFF391C";
    const contractAbi = chai.abi;
    // console.log(provider.getSigner());
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setAccount(accounts[0]);

        window.ethereum.on("accountsChanged", () => {
          window.location.reload;
        });

        window.ethereum.on("chainChanged", () => {
          window.location.reload;
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contracAddress,
          contractAbi,
          signer
        );
        setState({ provider, signer, contract });
        console.log(provider, signer, contract);
      } else {
        alert("Install metamask");
      }
    } catch (error) {
      console.log("error", error);
    }
    // const provi = new ethers.providers.Web3Provider(provider);
    // console.log(provi.getSigner());
  };

  return (
    <div>
      <h1>Connected account : {account}</h1>
      <button onClick={connectWallet}>click me</button>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
