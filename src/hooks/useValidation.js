import React from "react";
import moment from "moment";
import Web3 from "web3";

export const checkSoftCap = async (formRef) => {
  const hardCapValue = formRef.current.getFieldValue("hardCap");
  const softCapValue = formRef.current.getFieldValue("softCap");
  if (hardCapValue) {
    if (softCapValue < hardCapValue * 0.5) {
      return Promise.reject(
        "Softcap must be greater than or equal to 50% of Hardcap"
      );
    } else if (parseFloat(softCapValue) > parseFloat(hardCapValue)) {
      console.log(softCapValue, hardCapValue);
      return Promise.reject("Softap must not be greater than Hardcap");
    } else {
      return null;
    }
  }
};

export const checkMinBuy = async (formRef) => {
  const minBuyValue = formRef.current.getFieldValue("minBuy");
  const maxBuyValue = formRef.current.getFieldValue("maxBuy");
  if (maxBuyValue) {
    if (minBuyValue > maxBuyValue * 0.5) {
      return Promise.reject("Min Buy value must be less than Max buy");
    }
  }
};

export const checkMaxBuy = async (formRef) => {
  const hardCapValue = formRef.current.getFieldValue("hardCap");
  const maxBuyValue = formRef.current.getFieldValue("maxBuy");
  if (maxBuyValue) {
    if (maxBuyValue > hardCapValue) {
      return Promise.reject("Max buy must be less than Hard Cap buy");
    }
  }
};

export const checkDates = async (formRef) => {
  var startDatetime = new Date(
    moment(formRef.current.getFieldValue("startDate"))
  ).getTime();
  var endDateTime = new Date(
    moment(formRef.current.getFieldValue("endDate"))
  ).getTime();
    console.log(startDatetime, endDateTime)
  if (startDatetime != null)
    if (endDateTime <= startDatetime) {
      return Promise.reject("Must be greater than Start Date");
    }
};

export const checkTokenAddress = async (tokenAddress) => {
  if (!new Web3().utils.isAddress(tokenAddress)) {
    return Promise.reject("Please enter valid token address!");
  }
};

export const validateField = (formRef, field) => {
  formRef.current.validateFields([field]);
};
