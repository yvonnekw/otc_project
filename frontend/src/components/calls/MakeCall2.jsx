/*

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Select from "react-select";
import {
  enterCall,
  getCallReceiversForUser,
  checkPhoneNumberExists,
} from "../../services/CallService";
import { loginUser, loginUser2, getUsername } from "../../services/UserService"; // Import loginUser and isLoggedIn from UserService
import CallReceiverSelector from "../common/CallReceiverSelector";
import AuthProvider, { AuthContext } from "../auth/AuthProvider";
import { getCallsByUsername } from "../../services/CallService";
import { invoice } from "../../services/InvoiceService";
import Payment from "../payment/Payment";

*/

/*

const MakeCall2= () => {
  const currentUser = localStorage.getItem("userId");
  // State for start and end times
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [callCost, setCallCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [netCost, setNetCost] = useState("");
  const [grossCost, setGrossCost] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [telephone, setTelephone] = useState("");
  const [callReceivers, setCallReceivers] = useState([]);
  const [telephones, setTelephones] = useState([]);
  const [selectedCallReceiver, setSelectedCallReceiver] = useState("");
  const [selectedTelephoneNumber, setSelectedTelephoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [calls, setCalls] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [selectedCallIds, setSelectedCallIds] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [invoiceId, setInvoiceId] = useState(""); // Example invoiceId

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [newCall, setNewCall] = useState({
    startTime: "",
    endTime: "",
    callCost: "",
    discount: "",
    totalCost: "",
    netCost: "",
    grossCost: "",
    taxAmount: "",
    telephone: "",
  });

  const [errors, setErrors] = useState({
    startTime: "",
    endTime: "",
    callCost: "",
    discount: "",
    totalCost: "",
    netCost: "",
    grossCost: "",
    taxAmount: "",
  });

  const calculateBill = () => {
    let billAmount = 0;
    calls.forEach((call) => {
      billAmount += parseFloat(call.netCost);
    });
    setTotalBill(billAmount.toFixed(2));

    createInvoice().then((invoiceId) => {
      // Update invoiceId state after creating the invoice
      setInvoiceId(invoiceId);

      // Calculate the total net cost based on the selected calls
      let totalNetCost = 0;
      calls.forEach((call) => {
        if (selectedCallIds.includes(call.id)) {
          totalNetCost += parseFloat(call.netCost);
        }
      });

      // Update the netCost state
      setNetCost(totalNetCost.toFixed(2));

      // Proceed to payment after updating necessary states
      //handleProceedToPayment();
    });
  };

  const selectedCallIdsMapped = selectedCallIds.map((callId) => ({
    callId: callId,
  }));

  console.log("selected ids new here : ", selectedCallIdsMapped);
    

  const handleProceedToPayment = () => {
    navigate(
      `/payment?userId=${userId}&netCost=${netCost}&invoiceId=${invoiceId}`
    );
  };

  const handleCallInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "telephone") {
      setSelectedTelephoneNumber(value);
    }
    if (name === "startTime") {
      if (!isNaN(value)) {
        value.parseTime(value);
      } else {
        value = "";
      }
    }
    if (name === "endTime") {
      if (!isNaN(value)) {
        value.parseTime(value);
      } else {
        value = "";
      }
    }
    if (name === "discount") {
      if (!isNaN(value)) {
        value.parseTime(value);
      } else {
        value = "";
      }
    }
    setNewCall({ ...newCall, [name]: value });
  };

  const handleTelphoneNumberChange = (selectedOption) => {
    setSelectedTelephoneNumber(selectedOption);
    setNewCall({ ...newCall, telephone: selectedOption.value });
  };

  // Rate for the call cost per second
  const ratePerSecond = 0.001;

  // Tax rate
  const taxRate = 0.2;

  // Function to handle input change for start time
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  // Function to handle input change for end time
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // Function to handle input change for discount
  const handleDiscountInputChange = (event) => {
    setDiscount(event.target.value);
  };

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await getCallsByUsername(userId, token);
        setCalls(response);
        console.log("get calls ", calls);
      } catch (error) {
        console.error("Error fetching calls: ", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchCalls();
  }, [userId, token]);

  // Function to calculate total time, call cost, and total cost
  const calculateTotalTime = () => {
    const parseTime = (time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const startSeconds = parseTime(startTime);
    const endSeconds = parseTime(endTime);

    if (!isNaN(startSeconds) && !isNaN(endSeconds)) {
      const seconds = endSeconds - startSeconds;

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      // setTotalTime(`${hours} hours and ${minutes} minutes`);
      setTotalTime(`${hours}:${minutes}:${seconds % 60}`); // Format duration as HH:mm:ss

      const rawCallCost = seconds * ratePerSecond;

      let callCostWithDiscount = rawCallCost;
      if (discount !== "") {
        callCostWithDiscount -= rawCallCost * (parseFloat(discount) / 100);
      }

      const taxAmount = callCostWithDiscount * taxRate;
      const netCostValue = callCostWithDiscount;
      const grossCostValue = callCostWithDiscount + taxAmount;
      const totalCostValue = grossCostValue;

      setCallCost(callCostWithDiscount.toFixed(2));
      setNetCost(netCostValue.toFixed(2));
      setGrossCost(grossCostValue.toFixed(2));
      setTotalCost(totalCostValue.toFixed(2));
    } else {
      setTotalTime("Invalid time format");
      setCallCost(0);
      setNetCost(0);
      setGrossCost(0);
      setTotalCost(0);
    }
  };

  const navigate = useNavigate();
  /*
  const handleProceedToPayment = async () => {
    navigate(
      `/payment`
    );
  };*/
/*
  const createInvoice = async () => {

    const invoiceBody = {
      invoiceDate: moment().format("DD/MM/YYYY"),
      amount: totalBill,
      // calls: selectedCallIds.map((callId) => ({ callId: callId })),
      calls: calls.map((call) => ({ callId: call.id })),
    };
    console.log("selected ids  ", selectedCallIds);
     console.log("call ids  ", calls);
    try {
      const response = await invoice(invoiceBody);
      console.log("Invoice data: ", response);
      let invoiceId = response.invoiceId;
      console.log("The new invoiceId " + invoiceId);
      setInvoiceId(invoiceId);
      return response.invoiceId;
    } catch (error) {
      console.error("Error creating invoice: ", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoggedIn()) {
      if (validateForm()) {
        calculateTotalTime();

        // console.log("duration ", duration)
        console.log("totalTime  " + totalTime);

        // setUsername('yodalpinky1')
        const call = {
          startTime: startTime,
          endTime: endTime,
          duration: totalTime,
          costPerMinute: ratePerSecond * 60, // Assuming cost is per minute
          discountForCalls: parseFloat(discount),
          // signUpDiscount: 0, // Placeholder, modify as needed
          vat: taxRate,
          netCost: parseFloat(netCost),
          grossCost: parseFloat(grossCost),
          totalCost: parseFloat(totalCost),
          username: currentUser, //'yodalpinky1',//username, //'yodalpinky1',//username,//'yodalpinky1',// await getUsername() ,//'yodalpinky1', // Replace with dynamic username from your app
          telephone: selectedTelephoneNumber, // "032456776580"//selectedTelephoneNumber //"032456776580"
        };

        console.log("duration  " + call.duration);
        try {
          console.log("Request data " + call.startTime);
          console.log("telephone number for the call " + call.telephone);
          console.log("username number for the call " + call.username);
          console.log(
            "telephone number for the call " +
              selectedTelephoneNumber.toString()
          );
          //const call = {startTime, endTime}
          const isValid = await checkPhoneNumberExists(
            currentUser,
            selectedTelephoneNumber
          ); //('yodalpinky1', selectedTelephoneNumber);
          console.log(isValid);
          const response = await enterCall(call);
          console.log(response.data);
          /*
          if (response !== undefined) {
            const newSelectedCallIds = [
              ...selectedCallIds,
              response.data.callId,
            ];*/
            /*
          console.log("call id  ", response.data.callId);
          if (response && response.data && response.data.callId) {
            // Add the new call ID to the selectedCallIds array
            //setSelectedCallIds([...selectedCallIds, response.data.callId]);
            // setSelectedCallIds(newSelectedCallIds);
            console.log("selected ids  " , selectedCallIds);
            setSelectedCallIds([...selectedCallIds, response.data.callId]);
            setSuccessMessage("A new call has been recorded in the database.");
            setNewCall({ startTime: null, callReceivers: "", endTime: "" });
            setStartTime("");
            setEndTime("");
            setDiscount(0);
            setErrorMessage("");
          } else {
            setErrorMessage("Error adding call to the database");
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 3000);
      }
    }
  };

  function validateForm() {
    let valid = true;
    //speard of data to copy object
    const errorsCopy = { ...errors };

    if (startTime.trim()) {
      errorsCopy.startTime = "";
    } else {
      errorsCopy.startTime = "Start time required";
      valid = false;
    }

    if (endTime.trim()) {
      errorsCopy.endTime = "";
    } else {
      errorsCopy.endTime = "End Time required";
      valid = false;
    }
    setErrors(errorsCopy);

    return valid;
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">New call</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Call Receiver phone number</label>
                <div>
                  <CallReceiverSelector
                    handleTelephoneNumberInputChange={handleCallInputChange}
                    newCall={newCall}
                  />
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Start Time</label>
                <input
                  type="text"
                  placeholder="Enter start time (HH:mm:ss)"
                  name="startTime"
                  value={startTime}
                  className={`form-control ${
                    errors.startTime ? "is-invalid" : ""
                  }`}
                  onChange={handleStartTimeChange} //{handleCallInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">End Time</label>
                <input
                  type="text"
                  placeholder="Enter end time (HH:mm:ss)"
                  name="endTime"
                  value={endTime}
                  className={`form-control ${
                    errors.endTime ? "is-invalid" : ""
                  }`}
                  onChange={handleEndTimeChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Discount (%)</label>
                <input
                  type="text"
                  placeholder="Enter discount"
                  name="discount"
                  value={discount}
                  className="form-control"
                  onChange={handleDiscountInputChange} //{handleCallInputChange}
                />
              </div>
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <br /> <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Current Calls</h2>
            <div className="card-body">
              {calls.length === 0 ? (
                <p>No calls to display.</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Call ID</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Duration</th>
                      <th>Cost Per Minute</th>
                      <th>Discount</th>
                      <th>Call Gross cost</th>
                      <th>VAT</th>
                      <th>Net Cost</th>

                      {/* Add more table headers if needed */
                      /*
                    </tr>
                  </thead>
                  <tbody>
                    {calls.map((call) => (
                      <tr key={call.id}>
                        <td>{call.callId}</td>
                        <td>{call.startTime}</td>
                        <td>{call.endTime}</td>
                        <td>{call.duration}</td>
                        <td>{call.costPerMinute}</td>
                        <td>{call.discountForCalls}</td>
                        <td>{call.grossCost}</td>
                        <td>{call.vat}</td>
                        <td>{call.netCost}</td>
                        {/* Add more table cells based on call properties */
                        /*
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div>Total Bill Amount: £{totalBill}</div>
              <button className="btn btn-success" onClick={calculateBill}>
                Calculate Bill
              </button>
              <div>
                <br></br>
              </div>
              <Link
                to="/payment"
                className="mb-2 md-mb-0"
                Payment
                userId={userId}
                netCost={totalBill}
                invoiceId={invoiceId}
              >
                Proceed To Payment
              </Link>
              <div>
                {/* Your component content */
                /*
                <button
                  className="btn btn-success"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
    
  );
};

export default MakeCall2;

*/
