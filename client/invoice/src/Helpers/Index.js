import { ethers } from "ethers";
import metadata from "../artifacts/Invoice.json";
let contract;
export async function loadContract() {
  console.log(process.env.REACT_APP_RPC_URL);
  var url = process.env.REACT_APP_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(url);
  var PrivateKey = process.env.REACT_APP_AccPrivateKey;
  let wallet = new ethers.Wallet(PrivateKey, provider);
  const contractAddress = process.env.REACT_APP_ContractAddress;
  //new ethers.Contract(contractAddress, metadata.abi, provider);
  contract = new ethers.Contract(contractAddress, metadata.abi, wallet);
  return contract;
}
export async function getContract() {
  await loadContract();
  return contract;
}
