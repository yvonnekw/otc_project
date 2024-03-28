import React, { useState, useEffect, useContext } from 'react';
import { getAllInvoices, InvoiceData } from '../../services/InvoiceService';
import { AuthContext } from '../auth/AuthProvider';

interface InvoiceProps {}

const Invoice: React.FC<InvoiceProps> = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);

  const { role } = useContext(AuthContext);

  // Render the page only if the user has the admin role
  if (role !== "ADMIN") {
    return <div>You don't have permission to access this page.</div>;
  }

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoicesData: InvoiceData[] = await getAllInvoices(); // Call the function to fetch invoices
        setInvoices(invoicesData); // Update state with fetched invoices
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <header>
        <div>
          <h2>Invoicer</h2>
        </div>
        <div>
          <ul>
            <li>Print</li>
            <li>Download</li>
            <li>Send</li>
          </ul>
        </div>
      </header>
      <section>
        <h2>User firstname and lastname</h2>
        <p>Your Address</p>
      </section>
      <section>
        <h2> clicent User firstname and lastname</h2>
        <p>client Address</p>
      </section>
      <article>
        <ul>
          <li> Invoice Number: </li>
          <li> Invoice Date: </li>
          <li> Due date: </li>
        </ul>
      </article>
      {/*Table*/}

      {/*Notes*/}
      <section>
        {/*Textarea*/}
        <p>Notes to the client</p>
      </section>
    </>
  );
};

export default Invoice;

/*
const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoicesData = await getAllInvoices(); // Call the function to fetch invoices
        setInvoices(invoicesData); // Update state with fetched invoices
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <header>
        <div>
          <h2>Invoicer</h2>
        </div>
        <div>
          <ul>
            <li>Print</li>
            <li>Download</li>
            <li>Send</li>
          </ul>
        </div>
      </header>
      <section>
        <h2>User firstname and lastname</h2>
        <p>Your Address</p>
      </section>
      <section>
        <h2> clicent User firstname and lastname</h2>
        <p>client Address</p>
      </section>
      <article>
        <ul>
          <li> Invoice Number: </li>
          <li> Invoice Date: </li>
          <li> Due date: </li>
        </ul>
      </article>
      {/*Table*///}

      //{/*Notes*/}
      //<section>
       // {/*Textarea*/}
       // <p>Notes to the client</p>
     // </section>
    //</>

    /*
  <div>
    <h2>Invoices</h2>
    {invoices.length === 0 ? (
      <p>No invoices to display.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Call IDs</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceId}>
              <td>{invoice.invoiceId}</td>
              <td>
                {invoice.callIds.length === 0 ? (
                  "N/A"
                ) : (
                  invoice.callIds.join(", ")
                )}
              </td>
              <td>{invoice.amount}</td>
              <td>{invoice.invoiceDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
    
                */
 // );
  
//};

//export default Invoice;
