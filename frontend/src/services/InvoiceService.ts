import axios from "axios";
import { basicHeader, REST_API_BASE_URL, api } from "./ApiUtils";

export interface InvoiceData {
  invoiceId: string;
  callIds: string[];
  amount: number;
  invoiceDate: string;
  // Add more properties as needed
}

export async function invoice(invoiceBody: any): Promise<any> {
  try {
    const response = await api.post(
      REST_API_BASE_URL + "/invoices/create-invoice",
      invoiceBody,
      {
        headers: basicHeader,
      }
    );
    console.log("invoice create from invoice service ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllInvoices(): Promise<InvoiceData[]> {
  try {
    const response = await api.get(
      REST_API_BASE_URL + "/invoices/get-all-invoice",
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function searchInvoiceById(invoiceId: string): Promise<any> {
  try {
    const response = await api.get(
      REST_API_BASE_URL + `/invoices/${invoiceId}`,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*
export async function invoice(invoiceBody) {
  try {
    const response = await api.post(
      REST_API_BASE_URL + "/invoices/create-invoice",
      invoiceBody,
      {
        headers: basicHeader,
      }
    )
    console.log("invoice create from invoice service ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export async function getAllInvoices() {
  try {
    const response = await api.get(
      REST_API_BASE_URL + "/invoices/get-all-invoice",
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function searchInvoiceById(invoiceId) {
  try {
    const response = await api.get(
      REST_API_BASE_URL + `/invoices/
      ${invoiceId}`,
      {
        headers: basicHeader,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


*/
