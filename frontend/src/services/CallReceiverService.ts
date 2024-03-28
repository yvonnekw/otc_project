import { AxiosResponse } from 'axios';
import { basicHeader, REST_API_BASE_URL, api } from './ApiUtils';

// Function to add a receiver
export async function addReceiver(
  telephone: string,
  username: string
): Promise<boolean> {
  try {
    const response: AxiosResponse = await api.post(
      `/callreceiver/add/reciever`,
      {
        telephone: telephone,
        username: username,
      },
      { headers: basicHeader }
    );

    return response.status === 200;
  } catch (error) {
    console.error("Error adding new receiver:", error);
    throw new Error("Error adding new receiver");
  }
}
    
// Function to get telephone numbers
export async function getTelephoneNumbers(username: string): Promise<string[]> {
  try {
    const response: AxiosResponse = await api.get(
      `/callreceiver/phone-numbers?username=${username}`,
      {
        headers: basicHeader, // Assuming headers is defined somewhere
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error getting telephone numbers:", error);
    return []; // Return an empty array in case of error
  }
}

/*
  export async function addReceiver(telephone, username) {
      try {
        const response = await api.post(
          `/callreceiver/add/reciever`,
          {
            telephone: telephone,
            username: username,
          },
          { headers: basicHeader }
        );
        if (response.status === 200) {
          return true;
        } else {
          // If the response status is not 200, log an error and return false
          console.error(
            "Error adding new receiver - Unexpected response status:",
            response.status
          );
          return false;
        }
      } catch (error) {
        console.error("Error adding new receiver:", error);
        throw new Error("Error adding new receiver");
      }
  }
    
  export async function getTelephoneNumbers(username) {

    try {
      // const response = await api.get("/phone-numbers");
      const response = await api.get(
        `/callreceiver/phone-numbers?username=${username}`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting telephone numbers:", error);
      return []; // Return an empty array in case of error
    }
}
*/
