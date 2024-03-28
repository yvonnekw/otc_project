import axios from "axios";
import { basicHeader, REST_API_BASE_URL, api, getLoginHeader } from './ApiUtils'

export const makePayment = async (paymentBody: any) => {
  try {
    const response = await api.post(
      `${REST_API_BASE_URL}/payments/payment`,
      paymentBody,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error making payment: ${error.message}`);
  }
};


export const getPayments = () =>
  api.get(REST_API_BASE_URL + "/payments/get-all-payents", {
    headers: getLoginHeader(),
  });



