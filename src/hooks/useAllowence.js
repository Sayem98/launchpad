import { useWeb3React } from "@web3-react/core";
import React from "react";
import { getWeb3Contract } from "../utils";

export function useAllowence() {
  const { account } = useWeb3React();
  const getApprove = (spenderAddress, ammount) => {
    getWeb3Contract()
      .methods.approve(spenderAddress, ammount)
      .send(account)
      .then((response) => {
        console.log(response);
        //   addTransaction(response, {
        //     summary: `Approve ${amountToApprove.currency.symbol}`,
        //     approval: { tokenAddress: token.address, spender },
        //     type: "approve",
        //   });
      })
      .catch((error) => {
        //   logError(error);
        console.error("Failed to approve token", error);
        //   if (error?.code !== 4001) {
        //     toastError(t("Error"), error.message);
        //   }
        //   throw error;
      });
  };

  return { getApprove };
}
