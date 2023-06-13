import { isAddress } from "ethers/lib/utils";
import Web3 from "web3";

//ABI
import STANDARD_TOKEN_ABI from "../config/abi/Token/standard/standard.token.json";
// BYTECODE

export const getWeb3Contract = (provider, ABI, address) => {
  //   if (!isAddress(address)) {
  //     throw Error("Address is not a valid");
  //   }
  let web3_ = new Web3(provider);
  return new web3_.eth.Contract(ABI, address);
};

export const web3DeployContract = (provider, ABI) => {
  let web3_ = new Web3(provider);
  return new web3_.eth.Contract(ABI)
}
