import { useState } from 'react';
import moment from 'moment'; // Make sure to import moment if you haven't already
import { invoice } from '../../services/InvoiceService'; // Import your API function for creating invoices

const createInvoice = async (totalBill: number, calls: any[]) => {
    const invoiceBody = {
        invoiceDate: moment().format("DD/MM/YYYY"),
        amount: totalBill,
        calls: calls.map((call) => ({ callId: call.callId })),
    };

    console.log("invoiceBody: ", invoiceBody);

    try {
        const response = await invoice(invoiceBody);
        console.log("Invoice data: ", response);
        const invoiceId = response.invoiceId;
        console.log("The new invoiceId: " + invoiceId);
        return invoiceId;
    } catch (error) {
        console.error("Error creating invoice: ", error);
        throw error;
    }
};



export default createInvoice;





