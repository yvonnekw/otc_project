import axios, { AxiosResponse } from "axios";
import { basicHeader, REST_API_BASE_URL, api, getLoginHeader } from "./ApiUtils";


// Define the user interface
interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
  telephone: string;
  password: string;
  authorities: string[]; // Assuming authorities is an array of strings
}


export async function registerUser(user: any): Promise<any> {
  try {
    const response = await axios.post(
      REST_API_BASE_URL + "/auth/register",
      user,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

export async function loginUser2(user: any): Promise<any> {
  try {
    const response = await axios.post(
      REST_API_BASE_URL + "/auth/login",
      user,
      {
        headers: basicHeader,
      }
    );
    if (response.status >= 200 && response.status < 300) {
      const token = response?.data?.token;
      const username = response?.data?.username;
      console.log("The token:", token);
      console.log("The username data :", response?.data);
      console.log(
        "success username authorities " + response?.data?.user
      );
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUserProfile(username: string, tokcen: string): Promise<any> {
  try {
    const response = await axios.post(
      REST_API_BASE_URL + `/users/profile/${username}`,
      {
        headers: getLoginHeader(),
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(userId: string, token: string): Promise<any> {
  try {
    const response = await api.get(REST_API_BASE_URL + `/user/${userId}`, {
      headers: getLoginHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function getAllUsers(): Promise<any> {
  try {
    const response = await api.get(REST_API_BASE_URL + `/user/all-users`, {
      headers: getLoginHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUsername2(): Promise<void> {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  console.log("The user token " + token);
}

export const loginUser = async (user: any): Promise<any> => {
  try {
    const response = await axios.post(REST_API_BASE_URL + "/auth/login", user, {
      headers: basicHeader,
    });
    console.log("Response data:", response.data); // Log the response data
    const token = response?.data?.token;
    const username = response?.data?.username;
    console.log("The token:", token);
    console.log("The username :", username);
    return response; // Return the entire response object
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getUsername = async (): Promise<any> => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  if (isLoggedIn()) {
    try {
      const response = await axios.get(REST_API_BASE_URL + "/auth/username", {
        headers: {
          ...basicHeader,
          Authorization: `Bearer ${token}`, // Attach token to request headers
        },
      });
      console.log("the getUsername " + response.data.username);
      return response.data.username;
    } catch (error) {
      console.error("Error fetching username:", error);
      throw error;
    }
  } else {
    console.error("token has expired!");
  }
};

export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists, false otherwise
};

export async function registerUser2(user: User) {
  try {
    const response = await axios.post(REST_API_BASE_URL + "/auth/register", user, {
      headers: basicHeader,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error: ${error.message}`);
    }
  }
}




/*
export const api = axios.create({
  baseURL: "http://localhost:8000",
});

const REST_API_BASE_URL = "http://localhost:8000";

export const getLoginHeader = () => {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`,
     "Content-Type": "application/json",
  }
}

//update this with a return message
export const registerUser = (user) =>
  axios.post(REST_API_BASE_URL + "/auth/register", user, {
    headers: basicHeader,
  });

export async function registerUser2(user) {
  try {
      const response = axios.post(REST_API_BASE_URL + "/auth/register", user, {
      headers: headers,
      })
    return (await response).data;
  } catch (error) {
    if (error.response && error.response.data) {
        throw new Error(error.response.data)
    } else {
      throw new Error(`User registration error : ${error.message}`)
      }

    return e;
  }
};

export async function loginUser2(user) {
  try {
      const response = await axios.post(REST_API_BASE_URL + "/auth/login", user, {
        headers: basicHeader,
      });
    if (response.status >= 200 && response.status < 300) {
      console.log("Response from user service " + response);
       //console.log("Response data:", response.data); // Log the response data
       const token = response?.data?.token;
       const username = response?.data?.username;
       console.log("The token:", token);
      console.log("The username data :", response?.data);
          console.log(
            "success username authorities " +
              response?.data?.user
          );
        // console.log("authority of authorities " + response?.data?.user.authorities[0].authority);
        return response.data
   
      } else {
        return null
      }
    } catch (e) {
      console.error(e)
      return null;
    }
}

export async function getUserProfile(username, tokcen) {
  try {
    const response = await axios.post(REST_API_BASE_URL +`/users/profile/${username}`, {
      headers: getLoginHeader()
    });
    
    return response.data
  } catch (error) {
    throw error
  
  }
}

export async function getUser(userId, token) {
  try {
     const response = await api.get(REST_API_BASE_URL + `/user/${userId}`, {
       headers: getLoginHeader(),
     });
    return response.data
 } catch (error) {
    throw error
  }
}

export async function getUsername2() {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  console.log("The user token " + token)
}

export const loginUser = async (user) => {
  try {
    const response = await axios.post(REST_API_BASE_URL + "/auth/login", user, {
      headers: headers,
    });
    console.log("Response data:", response.data); // Log the response data
    const token = response?.data?.token;
    const username = response?.data?.username;
    console.log("The token:", token);
    console.log("The username :", username);
    return response; // Return the entire response object
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getUsername = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  if (isLoggedIn) {
    //
    try {
      // Make a request to the backend to fetch the username
      const response = await axios.get(REST_API_BASE_URL + "/auth/username", {
        headers: {
          ...headers,
         //Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach token to request headers
          Authorization: `Bearer ${token}`, // Attach token to request headers
        },
      });
      // Extract and return the username from the response data

      console.log("the getUsername " + response.data.username);
      return response.data.username;
    } catch (error) {
      console.error("Error fetching username:", error);
      // Handle error
      throw error; // Rethrow error for the caller to handle
    }
  } else {
    console.error("token has expired!");
  }
};


/*
const headers = {
    'Content-Type': 'application/json'
  }
  

const REST_API_BASE_URL = "http://localhost:8000";

export const registerUser = (user) => axios.post(REST_API_BASE_URL+"/auth/register", user, {
    headers: headers
});

export const loginUser = (user) => axios.post(REST_API_BASE_URL+"/auth/login", user , {
    headers: headers
});

export const getUsername = () => {
  // Function implementation here
};

// UserService.js
//export const loginUser = async (userData) => {
  // Function implementation
//};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists, false otherwise
};
*/

