import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { makePayment } from "../../services/PaymentService";
import { searchInvoiceById } from "../../services/InvoiceService";

const Payment: React.FC = () => {
  const navigateTo = useNavigate();
  const paymentDate = moment().format("DD/MM/YYYY");

  // State for form inputs
  const [fullName, setFullName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiringDate, setExpiringDate] = useState<string>("");
  const [issueNumber, setIssueNumber] = useState<string>("");
  const [securityNumber, setSecurityNumber] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [netCost, setNetCost] = useState<string>("");
  const [invoiceNotFound, setInvoiceNotFound] = useState<boolean>(false);

  const handleSearchInvoice = async () => {
    try {
      if (invoiceId) { // Check if invoiceId is not null
        // Call the searchInvoiceById service function
        const invoiceData = await searchInvoiceById(invoiceId); // Assuming this function returns invoice data
        // Update the component state with the retrieved invoice data
        setNetCost(invoiceData.amount);
        setSuccessMessage("Invoice Found.");
        setErrorMessage(" ");
        // Optionally, you can update other form inputs based on the retrieved data
      } else {
        setErrorMessage("Please enter an invoice ID.");
      }
    } catch (error) {
      console.error("Error searching for invoice: ", error);
      setNetCost(" ");
      setSuccessMessage(" ");
      setInvoiceNotFound(true);
      setErrorMessage("Invoice not found.");
    }
  };

  const handlePayment = async () => {
    const paymentBody = {
      amount: netCost,
      paymentDate: paymentDate,
      fullNameOnPaymentCard: fullName,
      cardNumber: cardNumber,
      expiringDate: expiringDate,
      issueNumber: issueNumber,
      securityNumber: securityNumber,
      invoice: {
        invoiceId: invoiceId,
      },
    };
    // Perform any payment logic here

    // Navigate to payment page with necessary parameters
    //navigateTo(`/payment?userId=${userId}&netCost=${netCost}&invoiceId=${invoiceId}`);
    try {
      // Call the payment service function
      const response = await makePayment(paymentBody);
      console.log("Payment response: ", response.data);
      setSuccessMessage("Payment successful!");

      // Handle success - navigate to payment page
      // navigateTo(`/payment?userId=${userId}&netCost=${netCost}&invoiceId=${invoiceId}`);
    } catch (error) {
      // Handle error - display error message
      console.error("Error making payment: ", error);
      setErrorMessage("Error making payment. Please try again later.");
    }
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Payment</h2>
          <div className="card-body">
            <div className="row">
              <div className="form-group mb-2">
                <label>Invoice ID:</label>
                <input
                  type="text"
                  className="form-control"
                  value={invoiceId || ''}
                  onChange={(e) => setInvoiceId(e.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={handleSearchInvoice}
                >
                  Search Invoice
                </button>
                {invoiceNotFound && <p>Invoice not found.</p>}
                {!invoiceNotFound &&
                  (<p> Invoice found. </p>) && (
                    <div>
                      <p>amount: {netCost}</p>
                      <p>Invoice ID: {invoiceId}</p>
                      <p>Payment Date: {paymentDate}</p>
                    </div>
                  )}
              </div>
              <div className="card-body"></div>
              <form>
                <div className="form-group mb-2">
                  <label>Full Name on Payment Card:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Card Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Expiring Date:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={expiringDate}
                    onChange={(e) => setExpiringDate(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Issue Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={issueNumber}
                    onChange={(e) => setIssueNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Security Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={securityNumber}
                    onChange={(e) => setSecurityNumber(e.target.value)}
                  />
                </div>
              </form>
              <div className="mb-3">
                <button className="btn btn-success" onClick={handlePayment}>
                  Proceed to Payment
                </button>
              </div>
              {errorMessage && (
                <p className="alert alert-danger">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="alert alert-success">{successMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;

/*
const Payment = () => {
  const navigateTo = useNavigate();
  const paymentDate = moment().format("DD/MM/YYYY");

  // State for form inputs
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [issueNumber, setIssueNumber] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [invoiceId, setInvoiceId] = useState(null);
  const [netCost, setNetCost] = useState("");
  const [invoiceNotFound, setInvoiceNotFound] = useState(false);

  const handleSearchInvoice = async () => {
    try {
      // Call the searchInvoiceById service function
      const invoiceData = await searchInvoiceById(invoiceId); // Assuming this function returns invoice data
      // Update the component state with the retrieved invoice data
      setNetCost(invoiceData.amount);
      setSuccessMessage("Invoice Found.");
      setErrorMessage(" ");
      // Optionally, you can update other form inputs based on the retrieved data
    } catch (error) {
      console.error("Error searching for invoice: ", error);
      setNetCost(" ");
      setSuccessMessage(" ");
      setInvoiceNotFound(true);
      setErrorMessage("Invoice not found.");
    }
  };

  const handlePayment = async () => {
    const paymentBody = {
      amount: netCost,
      paymentDate: paymentDate,
      fullNameOnPaymentCard: fullName,
      cardNumber: cardNumber,
      expiringDate: expiringDate,
      issueNumber: issueNumber,
      securityNumber: securityNumber,
      invoice: {
        invoiceId: invoiceId,
      },
    };
    // Perform any payment logic here

    // Navigate to payment page with necessary parameters
    //navigateTo(`/payment?userId=${userId}&netCost=${netCost}&invoiceId=${invoiceId}`);
    try {
      // Call the payment service function
      const response = await makePayment(paymentBody);
      console.log("Payment response: ", response.data);
      setSuccessMessage("Payment successful!");

      // Handle success - navigate to payment page
      // navigateTo(`/payment?userId=${userId}&netCost=${netCost}&invoiceId=${invoiceId}`);
    } catch (error) {
      // Handle error - display error message
      console.error("Error making payment: ", error);
      setErrorMessage("Error making payment. Please try again later.");
    }
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Payment</h2>
          <div className="card-body">
            <div className="row">
              <div className="form-group mb-2">
                <label>Invoice ID:</label>
                <input
                  type="text"
                  className="form-control"
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={handleSearchInvoice}
                >
                  Search Invoice
                </button>
                {invoiceNotFound && <p>Invoice not found.</p>}
                {!invoiceNotFound &&
                  (<p> Invoice found. </p>) &&(
                    <div>
                      <p>amount: {netCost}</p>
                      <p>Invoice ID: {invoiceId}</p>
                      <p>Payment Date: {paymentDate}</p>
                    </div>
                  )}
              </div>
              <div className="card-body"></div>
              <form>
                <div className="form-group mb-2">
                  <label>Full Name on Payment Card:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Card Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Expiring Date:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={expiringDate}
                    onChange={(e) => setExpiringDate(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Issue Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={issueNumber}
                    onChange={(e) => setIssueNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Security Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={securityNumber}
                    onChange={(e) => setSecurityNumber(e.target.value)}
                  />
                </div>
              </form>
              <div className="mb-3">
                <button className="btn btn-success" onClick={handlePayment}>
                  Proceed to Payment
                </button>
              </div>
              {errorMessage && (
                <p className="alert alert-danger">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="alert alert-success">{successMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
*/