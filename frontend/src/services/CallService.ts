import axios, { AxiosResponse } from "axios";
import { basicHeader, REST_API_BASE_URL, api } from "./ApiUtils";

interface Call {
  id: number;
  callId: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalTime: number;
  costPerMinute: number;
  discountForCalls: number;
  signUpDiscount: number;
  vat: number;
  netCost: number;
  grossCost: number;
  totalCost: number;
}


export async function getCallsByUsername(username: string): Promise<any> {
  try {
    const response = await api.get(
      REST_API_BASE_URL + `/calls?username=${username}`,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPaidCallsByUsername(username: string): Promise<any> {
  try {
    const response = await api.get(
      REST_API_BASE_URL + `/calls/paid?username=${username}`,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//update this
//create the postman test first
export async function getUnpaidCallsByUsername(username: string): Promise<any> {
  try {
    const response = await api.get(
      REST_API_BASE_URL + `/calls/unpaid?username=${username}`,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const enterCall = async (call: any): Promise<any> => {
  try {
    const response = await axios.post(
      REST_API_BASE_URL + "/calls/make/call",
      call,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCallReceiversForUser = async (
  username: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${REST_API_BASE_URL}/callreceiver/phone-numbers?username=${username}`,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkPhoneNumberExists = async (
  username: string,
  phoneNumber: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${REST_API_BASE_URL}/callreceiver/phone-numbers?username=${username}&telephone=${phoneNumber}`,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listCalls = (): Promise<AxiosResponse<Call[]>> => api.get(REST_API_BASE_URL + '/calls', {
  headers: basicHeader
});


/*
export async function getCallsByUsername  (username) {
   const response = await axios.get(
     REST_API_BASE_URL + `/calls?username=${username}`,
     {
       headers: basicHeader,
     }
   );
      return response.data;
}


export const makeCall = (call) => axios.post(REST_API_BASE_URL + "/calls/make/call", call, {
        headers: headers
});

// export const getCallReceiversForUser = (username) => axios.get
   // try {
  export const getCallReceiversForUser = (username) =>
    axios.get(
      `${REST_API_BASE_URL}/callreceiver/phone-numbers?username=${username}`,
      {
        headers: headers,
      }
    );
     // return response.data;
   // } catch (error) {
      //throw error; // You might want to handle errors more gracefully in your actual application
  //  }
 // },

  // ... other functions ...
//};

export const checkPhoneNumberExists = (username, phoneNumber) =>
  axios.get(
    `${REST_API_BASE_URL}/callreceiver/phone-numbers?username=${username}&telephone=${phoneNumber}`,
    {
      headers: headers,
    }
  );
*/

  

