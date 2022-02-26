import { useState } from "react";

import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";

export default function Home() {
  const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [greeting, setGreetingValue] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== undefined) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue("");
      await transaction.wait();
      fetchGreeting();
    }
  }
  return (
    <>
      <div className="text-3xl"> Het</div>
      <button
        className="m-2 rounded-lg bg-gray-800 px-4 py-2 text-white"
        onClick={fetchGreeting}
      >
        Fetch Greeting
      </button>
      <button
        className="m-2 rounded-lg bg-gray-800 px-4 py-2 text-white"
        onClick={setGreeting}
      >
        Set Greeting
      </button>
      <div>
        <input
          className="m-2 rounded-lg border-2 border-black bg-gray-200 px-4 py-2 placeholder:text-black"
          type="text"
          value={greeting}
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set Greeting"
        />
      </div>
    </>
  );
}
