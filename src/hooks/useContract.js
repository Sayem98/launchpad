import React from "react";

import {useWeb3React} from "@web3-react/core";
import Web3 from "web3";
import {isAddress} from "ethers/lib/utils";
import {getWeb3Contract} from "../utils/contractHelper";

import STANDARD_TOKEN_ABI from "../config/abi/Token/standard/standard.token.json";
import MULTISENDER_ABI from "../config/abi/multisender.abi.json";
import {DEFAULT_NETWORK} from "../config/constant/constant";

import LAUNCHPAD_ICO_ABI from "../config/abi/Launchpad/ico.abi.json";
import FACTORY_ICO_ABI from "../config/abi/Launchpad/factory.abi.json";

import AIRDROP_ABI from "../config/abi/Airdrop/airdrop.abi.json";
import AIRDROP_FACTORY_ABI from "../config/abi/Airdrop/factory.abi.json";

import STAKING_FACTORY_ABI from "../config/abi/Staking/factory.abi.json";
import STAKING_ABI from "../config/abi/Staking/staking.abi.json";

import PRIVATE_SALE_FACTORY_ABI from "../config/abi/PrivateSale/factory.abi.json";
import PRIVATE_SALE_ABI from "../config/abi/PrivateSale/privateSale.abi.json";

import {ChainsInfo} from "../config/config.chain";

// function useContract() {
//   const { library, account } = useWeb3React();

//   const deployContract = (bytecode, arg, address) => {
//     return deploy({ data: bytecode, argument: arg }).send({
//       from: address,
//     });
//   };
//   return { deployContract };
// }

export const useTokenContract = () => {
  const {library, account, chainId} = useWeb3React();
  var RPC_URL = library
    ? library.provider
    : ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].RPC_PROVIDER_URL;
  const getStandartTokenContract = () => {
    return getWeb3Contract(RPC_URL, STANDARD_TOKEN_ABI, account);
  };

  const getApproveTokenContract = (tokenaddress, approveSpender, amount) => {
    return getWeb3Contract(
      library.provider,
      STANDARD_TOKEN_ABI,
      tokenaddress
    ).methods.approve(
      approveSpender,
      new Web3().utils.toWei(amount.toString(), "ether")
    );
  };

  const getAllowenceTokenContract = (tokenaddress, approveSpender) => {
    return getWeb3Contract(
      RPC_URL,
      STANDARD_TOKEN_ABI,
      tokenaddress
    ).methods.allowance(account, approveSpender);
  };
  const getLaunchpadICOContract = () => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, account);
  };
  const getTokenName = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, STANDARD_TOKEN_ABI, tokenAddress)
      .methods.name()
      .call();
  };

  const getTokenBalance = (tokenaddress) => {
    return getWeb3Contract(RPC_URL, STANDARD_TOKEN_ABI, tokenaddress)
      .methods.balanceOf(account)
      .call();
  };
  const getTokenSymbol = (tokenaddress) => {
    return getWeb3Contract(RPC_URL, STANDARD_TOKEN_ABI, tokenaddress)
      .methods.symbol()
      .call();
  };
  const getTokenDecimal = (tokenaddress) => {
    return getWeb3Contract(RPC_URL, STANDARD_TOKEN_ABI, tokenaddress)
      .methods.decimals()
      .call();
  };
  const getTokenContractBalance = (tokenaddress, address) => {
    return getWeb3Contract(RPC_URL, STANDARD_TOKEN_ABI, tokenaddress)
      .methods.balanceOf(address)
      .call();
  };
  const setMultiSender = () => {
    return getWeb3Contract(
      library.provider,
      MULTISENDER_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].MULTISENDER_ADDRESS
    );
  };

  //Factory Contract Function
  const getICOCounter = () => {
    return getWeb3Contract(
      // RPC_URL
      RPC_URL,
      FACTORY_ICO_ABI,

      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].LAUNCHPAD_FC_ADDRESS
    )
      .methods.idoCounter()
      .call();
  };
  const getAllIcoDetails = () => {
    return getWeb3Contract(
      // RPC_URL,

      RPC_URL,
      FACTORY_ICO_ABI,

      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].LAUNCHPAD_FC_ADDRESS
    )
      .methods.getAllIntractionDetails()
      .call();
  };
  // ICO Function

  const balanceOfIdoToken = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.balanceOfIdoToken(tokenAddress)
      .call();
  };
  const getTokenomics = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.getTokenomics()
      .call();
  };
  const getSocialMediaData = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.getSocialMediaData()
      .call();
  };
  const setInvestInIco = (tokenAddress, amount) => {
    return getWeb3Contract(
      RPC_URL,
      LAUNCHPAD_ICO_ABI,
      tokenAddress
    ).methods.saleIDOToken(amount);
  };
  const getInvestDataTrack = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.SellTrackDataset(account)
      .call();
  };

  const getAllTradeInfo = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.showAllTrade()
      .call();
  };
  const getIsSaleEnded = (tokenAddress) => {
    console.log(tokenAddress);
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.isSaleEnded()
      .call();
  };
  const setClaimToken = (tokenAddress) => {
    return getWeb3Contract(
      RPC_URL,
      LAUNCHPAD_ICO_ABI,
      tokenAddress
    ).methods.claimToken();
  };

  const getClaimableToken = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.getClaimableToken(account)
      .call();
  };

  const isHardCapReach = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.isHardCapReach()
      .call();
  };

  const getIDOSaleStatus = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.setIDOSaleStatus()
      .call();
  };

  const getUserInvestmentLimitLeft = (tokenAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, tokenAddress)
      .methods.getUserInvestmentLimitLeft()
      .call();
  };

  const checkOwner = (launchpadAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, launchpadAddress)
      .methods.owner()
      .call();
  };

  const loadFundStatus = (launchpadAddress) => {
    return getWeb3Contract(RPC_URL, LAUNCHPAD_ICO_ABI, launchpadAddress)
      .methods.loadFund()
      .call();
  };

  const sendFund = (launchpadAddress, tokenAddress) => {
    return getWeb3Contract(
      RPC_URL,
      LAUNCHPAD_ICO_ABI,
      launchpadAddress
    ).methods.LoadFund(tokenAddress);
  };

  return {
    getStandartTokenContract,
    getApproveTokenContract,
    getAllowenceTokenContract,
    getLaunchpadICOContract,
    setMultiSender,
    getTokenSymbol,
    getTokenBalance,
    getTokenDecimal,
    getTokenName,
    getTokenContractBalance,
    //Factory ICO
    getAllIcoDetails,
    getICOCounter,
    //ICO Details
    balanceOfIdoToken,
    getTokenomics,
    getSocialMediaData,
    setInvestInIco,
    getInvestDataTrack,
    getAllTradeInfo,
    getIsSaleEnded,
    setClaimToken,
    getClaimableToken,
    isHardCapReach,
    getIDOSaleStatus,
    checkOwner,
    getUserInvestmentLimitLeft,
    sendFund,
    loadFundStatus,
  };
};

export const useAirdropContract = () => {
  const {library, active, account, chainId} = useWeb3React();
  var RPC_URL = library
    ? library.provider
    : ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].RPC_PROVIDER_URL;
  const approveAirdrop = (airdropAddress, tokenAddress) => {
    const amount = "1000000000000000000000000000000";

    console.log(airdropAddress, tokenAddress);
    return getWeb3Contract(
      RPC_URL,
      STANDARD_TOKEN_ABI,
      tokenAddress
    ).methods.approve(
      airdropAddress,
      amount
      // new Web3().utils.toWei(amount.toString(), "ether")
    );
  };
  const setAirdropTransferOwnership = (airdropAddress, newOwnerAddress) => {
    return getWeb3Contract(
      library.provider,
      AIRDROP_ABI,
      airdropAddress
    ).methods.transferOwnership(newOwnerAddress);
  };
  const getAirdropDetails = (address) => {
    return getWeb3Contract(
      RPC_URL,
      AIRDROP_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].AIRDROP_FACTORY_CONTRACT
    ).methods.getStructByAddress(address);
  };
  const getAirdropTokenAddress = (airdropAddress) => {
    return getWeb3Contract(
      RPC_URL,
      AIRDROP_ABI,
      airdropAddress
    ).methods.tokenInstance();
  };
  const setStartAirdrop = (airdropAddress, time) => {
    return getWeb3Contract(
      library.provider,
      AIRDROP_ABI,
      airdropAddress
    ).methods.startAirdrop(time);
  };
  const setCancelAirdrop = (airdropAddress) => {
    return getWeb3Contract(
      library.provider,
      AIRDROP_ABI,
      airdropAddress
    ).methods.cancelAirdrop();
  };
  const claimAirdropToken = (airdropAddress) => {
    return getWeb3Contract(
      RPC_URL,
      AIRDROP_ABI,
      airdropAddress
    ).methods.calimToken();
  };
  const setAllocationAirdropToken = (
    airdropAddress,
    allocationAddresses,
    allocationAmount
  ) => {
    return getWeb3Contract(
      library.provider,
      AIRDROP_ABI,
      airdropAddress
    ).methods.setAllocations(allocationAddresses, allocationAmount);
  };

  const airdropCounter = () => {
    return getWeb3Contract(
      RPC_URL,
      AIRDROP_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].AIRDROP_FACTORY_CONTRACT
    )
      .methods.airdopCounter()
      .call();
  };

  const checkAirdropStarted = (airdropAddress) => {
    return getWeb3Contract(RPC_URL, AIRDROP_ABI, airdropAddress)
      .methods.isAirdropStart()
      .call();
  };

  const checkAirdropCancelled = (airdropAddress) => {
    return getWeb3Contract(RPC_URL, AIRDROP_ABI, airdropAddress)
      .methods.hasAirdropCancled()
      .call();
  };

  const getAllAirdrops = () => {
    return getWeb3Contract(
      RPC_URL,
      AIRDROP_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].AIRDROP_FACTORY_CONTRACT
    )
      .methods.getCompleteAirdopsDetails()
      .call();
  };

  const getAllAllocations = (airdropAddress) => {
    return getWeb3Contract(RPC_URL, AIRDROP_ABI, airdropAddress)
      .methods.getAllAllocations()
      .call();
  };

  const checkOwner = (airdropAddress) => {
    return getWeb3Contract(RPC_URL, AIRDROP_ABI, airdropAddress)
      .methods.owner()
      .call();
  };

  const userAllocation = (airdropAddress) => {
    return getWeb3Contract(RPC_URL, AIRDROP_ABI, airdropAddress)
      .methods.userAllocation(account)
      .call();
  };

  return {
    getAirdropTokenAddress,
    setStartAirdrop,
    setCancelAirdrop,
    claimAirdropToken,
    setAllocationAirdropToken,
    setAirdropTransferOwnership,
    getAirdropDetails,
    approveAirdrop,
    airdropCounter,
    getAllAirdrops,
    checkAirdropStarted,
    checkAirdropCancelled,
    checkOwner,
    getAllAllocations,
    userAllocation,
  };
};

export const useStakingContract = () => {
  const {library, active, account, chainId} = useWeb3React();
  var RPC_URL = library
    ? library.provider
    : ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].RPC_PROVIDER_URL;

  const stakingCounter = () => {
    return getWeb3Contract(
      RPC_URL,
      STAKING_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].STAKING_FACTORY_CONTRACT
    )
      .methods.stakeingCounter()
      .call();
  };

  const getAllStakings = () => {
    return getWeb3Contract(
      RPC_URL,
      STAKING_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].STAKING_FACTORY_CONTRACT
    )
      .methods.getCompleteStakingDetails()
      .call();
  };

  const getStakingDetails = (address) => {
    return getWeb3Contract(
      RPC_URL,
      STAKING_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].STAKING_FACTORY_CONTRACT
    ).methods.getStructByAddress(address);
  };

  const getAlreadyStaked = (contract) => {
    return getWeb3Contract(RPC_URL, STAKING_ABI, contract)
      .methods.isAlreadyStaked(account)
      .call();
  };

  const poolStake = (contract, amount, duration) => {
    return getWeb3Contract(
      library.provider,
      STAKING_ABI,
      contract
    ).methods.poolStake(amount, duration);
  };

  const startUnstake = (contract) => {
    return getWeb3Contract(
      library.provider,
      STAKING_ABI,
      contract
    ).methods.unstake();
  };

  const isAlreadyStaked = (contract) => {
    return getWeb3Contract(library.provider, STAKING_ABI, contract)
      .methods.isAlreadyStaked(account)
      .call();
  };

  const stakersDataset = (contract) => {
    return getWeb3Contract(library.provider, STAKING_ABI, contract)
      .methods.stakersDataset(account)
      .call();
  };

  return {
    stakingCounter,
    getAllStakings,
    getStakingDetails,
    poolStake,
    getAlreadyStaked,
    startUnstake,
    isAlreadyStaked,
    stakersDataset,
  };
};

export const usePrivateSaleContract = () => {
  const {library, active, account, chainId} = useWeb3React();
  var RPC_URL = library
    ? library.provider
    : ChainsInfo[chainId ? chainId : DEFAULT_NETWORK].RPC_PROVIDER_URL;
  const getAllPrivateSale = () => {
    return getWeb3Contract(
      RPC_URL,
      PRIVATE_SALE_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK]
        .PRIVATE_SALE_FACTORY_CONTRACT
    )
      .methods.getCompleteAirdopsDetails()
      .call();
  };
  const getPrivateSaleDetails = (address) => {
    return getWeb3Contract(
      RPC_URL,
      PRIVATE_SALE_FACTORY_ABI,
      ChainsInfo[chainId ? chainId : DEFAULT_NETWORK]
        .PRIVATE_SALE_FACTORY_CONTRACT
    ).methods.getStructByAddress(address);
  };

  const buyPrivateSale = (amount, contractAddress) => {
    return getWeb3Contract(
      RPC_URL,
      PRIVATE_SALE_ABI,
      contractAddress
    ).methods.Buy(amount);
  };

  const getPrivateSaleTokenomics256 = (contractAddress) => {
    return getWeb3Contract(RPC_URL, PRIVATE_SALE_ABI, contractAddress)
      .methods.getTokenomics256()
      .call();
  };

  const getPrivateSaleTokenomics = (contractAddress) => {
    return getWeb3Contract(RPC_URL, PRIVATE_SALE_ABI, contractAddress)
      .methods.getTokenomics()
      .call();
  };

  const checkHardcapReached = (contractAddress) => {
    return getWeb3Contract(RPC_URL, PRIVATE_SALE_ABI, contractAddress)
      .methods.isHardCapReached()
      .call();
  };

  const claimPrivateSaleToken = (contractAddress) => {
    return getWeb3Contract(
      RPC_URL,
      PRIVATE_SALE_ABI,
      contractAddress
    ).methods.youCanClaim();
  };

  const checkSaleEnded = (contractAddress) => {
    return getWeb3Contract(RPC_URL, PRIVATE_SALE_ABI, contractAddress)
      .methods.isSaleEnd()
      .call();
  };
  const checkOwner = (launchpadAddress) => {
    return getWeb3Contract(RPC_URL, PRIVATE_SALE_ABI, launchpadAddress)
      .methods.owner()
      .call();
  };
  const finalizeSale = (contractAddress) => {
    return getWeb3Contract(
      RPC_URL,
      PRIVATE_SALE_ABI,
      contractAddress
    ).methods.Finalized();
  };

  return {
    getAllPrivateSale,
    getPrivateSaleDetails,
    buyPrivateSale,
    getPrivateSaleTokenomics,
    getPrivateSaleTokenomics256,
    checkHardcapReached,
    claimPrivateSaleToken,
    checkSaleEnded,
    checkOwner,
    finalizeSale,
  };
};
// export default useContract;
