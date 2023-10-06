import Web3 from "web3";
import SafeABI from "./ABI/SafeContract.json";

let selectedAccount;
let safeContract;
let isInitialized = false;
let safeContractAddress = "0x680Df9d9583EF294DFF357DAA51CFd13008908dA";

export const init = async () => {
  // Configure contract
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  window.ethereum.on("accountChanged", function (accounts) {
    selectedAccount = accounts[0];
  });

  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();

  safeContract = new web3.eth.Contract(SafeABI.abi, safeContractAddress);

  isInitialized = true;
};

export const getUserAddress = async () => {
  if (!isInitialized) {
    await init();
  }
  return selectedAccount;
};

// Execute Functions

export const setOwner = async (newOwner) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await safeContract.methods
    .setOwner(newOwner.toLowerCase())
    .send({ from: selectedAccount });
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const register = async (name, surname) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await safeContract.methods
    .addUser(name, surname)
    .send({ from: selectedAccount });
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const lock = async (value, lockTime) => {
  if (!isInitialized) {
    await init();
  }
  let send_value = Web3.utils.toWei(value, "ether");
  try {
    let res = await safeContract.methods
    .lock(lockTime)
    .send({ from: selectedAccount, value: send_value });
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const unlock = async (value) => {
  if (!isInitialized) {
    await init();
  }
  let send_value = Web3.utils.toWei(value, "ether");
  try {
    let res = await safeContract.methods
    .unlock()
    .send({ from: selectedAccount, value: send_value });
    return res;
  } catch(e) {
    console.error(e);
  }
};


// Query functions

export const getOwner = async () => {
  if (!isInitialized) {
    await init();
  }
  let res = await safeContract.methods.getOwner().call();
  return res.toString();
};

export const login = async () => {
  if (!isInitialized) {
    await init();
  }
  let res = await safeContract.methods.getUser({ from: selectedAccount }).call();
  return res;
};

export const getReward = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await safeContract.methods.getReward().call();
    return res;
  } catch(e) {
    console.error(e);
  }
};
