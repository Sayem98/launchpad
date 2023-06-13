import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { toHex } from "./index";
const POOLING_INTERVAL = 1000;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [5, 97, 80001],
});

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.poolingInterval = POOLING_INTERVAL;
  return library;
};

export const switchNetwork = async (library, network) => {
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(network) }],
    });
    window.location.reload()
    return true;
  } catch (switchError) {
    // if (switchError.code === 4902) {
    //   try {
    //     await library.provider.request({
    //       method: "wallet_addEthereumChain",
    //       params: [networkParams[toHex(network)]],
    //     });
    //   } catch (error) {
    //     setError(error);
    //   }
    // }
    return false;
  }
};
