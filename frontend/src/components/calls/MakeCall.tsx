import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment"; // Assuming moment library is installed
import { getCallsByUsername, checkPhoneNumberExists, enterCall, getUnpaidCallsByUsername } from "../../services/CallService"; 
import { invoice } from "../../services/InvoiceService";
import createInvoice from "../invoice/CreateInvoice";
import CallReceiverSelector from "../common/CallReceiverSelector";
import { AuthContext } from "../auth/AuthProvider";
import CallCard from "./CallCard";

const MakeCall: React.FC = () => {
    const currentUser = localStorage.getItem("userId");
    // State for start and end times
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [callCost, setCallCost] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [netCost, setNetCost] = useState<number>(0);
    const [grossCost, setGrossCost] = useState<number>(0);
    const [taxAmount, setTaxAmount] = useState<number>(0);
    const [telephone, setTelephone] = useState<string>("");
    const [callReceivers, setCallReceivers] = useState<any[]>([]);
    const [telephones, setTelephones] = useState<any[]>([]);
    const [selectedCallReceiver, setSelectedCallReceiver] = useState<string>("");
    const [selectedTelephoneNumber, setSelectedTelephoneNumber] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [calls, setCalls] = useState<any[]>([]);
    const [totalBill, setTotalBill] = useState<number>(0);
    const [selectedCallIds, setSelectedCallIds] = useState<string[]>([]);
   // const { isLoggedIn } = useContext(AuthContext);
    const [invoiceId, setInvoiceId] = useState<string>(""); // Example invoiceId
    const [callDate, setCallDate] = useState(moment().format("DD/MM/YYYY"));
    const [invoiceDate, setInvoiceDate] = useState(moment().format("DD/MM/YYYY"));

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const { isLoggedIn } = useContext(AuthContext);

    const [newCall, setNewCall] = useState({
        startTime: "",
        endTime: "",
        duration: "", // Add duration property here
        callCost: "",
        discount: "",
        totalCost: "",
        netCost: "",
        grossCost: "",
        taxAmount: "",
        telephone: "",
        callDate: "",
    });

    const [errors, setErrors] = useState({
        startTime: "",
        endTime: "",
        duration: "", // Add duration property here
        callCost: "",
        discount: "",
        totalCost: "",
        netCost: "",
        grossCost: "",
        taxAmount: "",
        callDate: "",
    });

    const calculateBill = () => {
        console.log("totalbill from billAmount netcost : ", netCost)
        let billAmount = 0;
        calls.forEach((call) => {
            billAmount += parseFloat(call.netCost);
        });

        setTotalBill(parseFloat(billAmount.toFixed(2)));
        console.log("totalbill from billAmount: ",totalBill)

        //setInvoiceDate()

        createInvoice(totalBill, calls).then((invoiceId) => {
            // Update invoiceId state after creating the invoice
            setInvoiceId(invoiceId);

            // Calculate the total net cost based on the selected calls
            let totalNetCost = 0;
            calls.forEach((call) => {
                if (selectedCallIds.includes(call.callId)) {
                    totalNetCost += parseFloat(call.netCost);
                }
            });

            // Update the netCost state
            setNetCost(parseFloat(totalNetCost.toFixed(2)));

            // Proceed to payment after updating necessary states
            //handleProceedToPayment();
        });
    };


    function parseTime(value: string): string {
        const parts = value.split(":").map(Number);
        const hours = parts[0];
        const minutes = parts[1];
        const seconds = parts[2];

        // Validate the parts
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            throw new Error("Invalid time format");
        }

        // Format the time string
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return formattedTime;
    }


    const selectedCallIdsMapped = selectedCallIds.map((callId) => ({
        callId: callId,
    }));

    console.log("selected ids new here : ", selectedCallIdsMapped);

    const navigate = useNavigate();

    const handleProceedToPayment = () => {
        navigate(`/payment?userId=${userId}&netCost=${netCost}&invoiceId=${invoiceId}`);
    };

    const handleCallInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "telephone") {
            setSelectedTelephoneNumber(value);
        }
        if (name === "startTime" || name === "endTime" || name === "discount") {
            if (!isNaN(parseFloat(value))) {
                // Assuming parseTime function is defined somewhere
                value = parseTime(value);
            } else {
                value = "";
            }
        }
        setNewCall({ ...newCall, [name]: value });
    };


    const handleTelephoneNumberInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setSelectedTelephoneNumber(value);
        setNewCall({ ...newCall, [name]: value });
    };


    /*
    const handleTelphoneNumberChange = (selectedOption: any) => {
        setSelectedTelephoneNumber(selectedOption.value); // Assuming 'value' holds the telephone number
        setNewCall({ ...newCall, telephone: selectedOption.value }); // Assuming 'value' holds the telephone number
    };
    */
/*
    const handleTelphoneNumberChange = (selectedOption: any) => {
        setSelectedTelephoneNumber(selectedOption);
        setNewCall({ ...newCall, telephone: selectedOption.value });
    };

    /*/
    // Rate for the call cost per second
    const ratePerSecond = 0.01;

    // Tax rate
    const taxRate = 0.2;

    // Function to handle input change for start time
    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(event.target.value);
    };

    // Function to handle input change for end time
    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(event.target.value);
    };

    // Function to handle input change for discount
    const handleDiscountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscount(parseFloat(event.target.value));
    };

    /*
    const handleCallDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCallDate(value);
    };*/


    const handleCallDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCallDate(e.target.value);
    };




/*
    useEffect(() => {
        const fetchCalls = async () => {
            try {
                const response = await getCallsByUsername(currentUser?? '');
                setCalls(response);
                console.log("get calls ", calls);
            } catch (error) {
                console.error("Error fetching calls: ", error.message);
                setErrorMessage(error.message);
            }
        };

        fetchCalls();
    }, [currentUser]);

    useEffect(() => {
        const fetchCalls = async () => {
            try {
                const response = await getUnpaidCallsByUsername(currentUser?? ''); // Fetch only unpaid calls
                setCalls(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCalls();
    }, [userId]);

    */
    /*
    useEffect(() => {
        const fetchCalls = async () => {
            try {
                // Fetch calls for the current user
                const userCallsResponse = await getCallsByUsername(currentUser ?? '');
                setCalls(userCallsResponse);

                // Fetch unpaid calls for the current user
                const unpaidCallsResponse = await getUnpaidCallsByUsername(currentUser ?? '');
                // Combine existing calls with the new unpaid calls
                setCalls(existingCalls => [...existingCalls, ...unpaidCallsResponse.data]);
            } catch (error) {
                console.error("Error fetching calls: ", error.message);
                setErrorMessage(error.message);
            }
        };

        fetchCalls();
    }, [currentUser]);

    */
    
    useEffect(() => {
        const fetchCalls = async () => {
            try {
                // Fetch calls for the current user
                const userCallsResponse = await getCallsByUsername(currentUser ?? '');
                setCalls(userCallsResponse);

                // Fetch unpaid calls for the current user
                const unpaidCallsResponse = await getUnpaidCallsByUsername(currentUser ?? '');

                // Ensure unpaidCallsResponse.data is iterable
                if (Array.isArray(unpaidCallsResponse.data)) {
                    // Combine existing calls with the new unpaid calls
                    setCalls(existingCalls => [...existingCalls, ...unpaidCallsResponse.data]);
                } else {
                    console.error("Unpaid calls data is not an array:", unpaidCallsResponse.data);
                    // Handle the scenario where unpaidCallsResponse.data is not iterable
                }
            } catch (error) {
                console.error("Error fetching calls: ", error.message);
                setErrorMessage(error.message);
            }
        };

        fetchCalls();
    }, [currentUser]);

    // Function to calculate total time, call cost, and total cost
    const calculateTotalTime = () => {
        // Assuming parseTime function is defined somewhere
        const parseTime = (time: string) => {
            const [hours, minutes, seconds] = time.split(":").map(Number);
            return `${hours}:${minutes}:${seconds % 60}`; // Format duration as HH:mm:ss
        };

        const startSeconds = parseTime(startTime);
        const endSeconds = parseTime(endTime);

        if (!isNaN(parseFloat(startSeconds)) && !isNaN(parseFloat(endSeconds))) {
            const seconds = parseFloat(endSeconds) - parseFloat(startSeconds);

            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);

            // setTotalTime(`${hours} hours and ${minutes} minutes`);
            setDuration(`${hours}:${minutes}:${seconds % 60}`); // Format duration as HH:mm:ss

            //console.log("Duration 1: ", duration)

            const rawCallCost = seconds * ratePerSecond;

            let callCostWithDiscount = rawCallCost;
            if (discount !== null && discount > 0) {
                callCostWithDiscount -= rawCallCost * (discount / 100);
            
            } else {
                callCostWithDiscount = rawCallCost; // Reset callCostWithDiscount if discount is null or not greater than 0
            }

            const taxAmount = callCostWithDiscount * taxRate;
            const netCostValue = callCostWithDiscount;

            console.log("netCostValue 1: ", netCostValue)
            const grossCostValue = callCostWithDiscount + taxAmount;
            const totalCostValue = grossCostValue;
            console.log("grossCostValue : ", grossCostValue)
            console.log("totalCostValue 1: ", totalCostValue)

          
            setCallCost(parseFloat(callCostWithDiscount.toFixed(6)));
            console.log("callCost 1: ", callCost)
            setNetCost(parseFloat(netCostValue.toFixed(6)));
            setGrossCost(parseFloat(grossCostValue.toFixed(6)));
            setTotalCost(parseFloat(totalCostValue.toFixed(4)));
            setTaxAmount(parseFloat(taxAmount.toFixed(4)));
            setCallDate(callDate);

            console.log("gross cost: ", grossCost)
            console.log("netCost value: ",netCost)
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isLoggedIn()) {
            if (validateForm()) {
                calculateTotalTime();

                const call = {
                    startTime: startTime,
                    endTime: endTime,
                    duration: duration,
                    costPerMinute: ratePerSecond * 60, // Assuming cost is per minute
                    discountForCalls: discount,
                    vat: taxRate,
                    netCost: netCost,
                    grossCost: grossCost,
                    totalCost: totalCost,
                    username: currentUser,
                    telephone: selectedTelephoneNumber,
                    callDate: callDate,
                };

                try {
                    const isValid = await checkPhoneNumberExists(currentUser ?? '', selectedTelephoneNumber);
                    console.log(isValid);
                    const response = await enterCall(call);
                    console.log(response.data);
                    if (response && response.data && response.data.callId) {
                        setSelectedCallIds([...selectedCallIds, response.data.callId]);
                        setSuccessMessage("A new call has been recorded in the database.");
                        setNewCall({
                            startTime: "",
                            endTime: "",
                            callCost: "",
                            duration: "",
                            discount: "",
                            totalCost: "",
                            netCost: "",
                            grossCost: "",
                            taxAmount: "",
                            telephone: "",
                            callDate: ""});
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
                    {/* display call date here */}
                    <div className="form-group mb-2">
                        <label className="form-label">Call Date</label>
                        <input
                            type="text"
                            name="callDate"
                            value={callDate}
                            className={`form-control ${errors.callDate ? "is-invalid" : ""}`}
                            onChange={handleCallDateChange}
                        />
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label className="form-label">Call Receiver phone number</label>
                                <div>
                                    <CallReceiverSelector
                                        handleTelephoneNumberInputChange={handleTelephoneNumberInputChange}
                                       // handleTelephoneNumberInputChange={handleTelephoneNumberInputChange}
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
                                    className={`form-control ${errors.startTime ? "is-invalid" : ""}`}
                                    onChange={handleStartTimeChange}
                                />
                                {errors.startTime && <div className="invalid-feedback">{errors.startTime}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">End Time</label>
                                <input
                                    type="text"
                                    placeholder="Enter end time (HH:mm:ss)"
                                    name="endTime"
                                    value={endTime}
                                    className={`form-control ${errors.endTime ? "is-invalid" : ""}`}
                                    onChange={handleEndTimeChange}
                                />
                                {errors.endTime && <div className="invalid-feedback">{errors.endTime}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Discount (%)</label>
                                <input
                                    type="text"
                                    placeholder="Enter discount"
                                    name="discount"
                                    value={discount}
                                    className="form-control"
                                    onChange={handleDiscountInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
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
                            {calls && calls.length > 0 ? (
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Call ID</th>
                                            <th>Call Date</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Duration</th>
                                            <th>Cost Per Minute</th>
                                            <th>Discount</th>
                                            <th>Call Gross cost</th>
                                            <th>VAT</th>
                                            <th>Net Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {calls.map((call) => (
                                            <tr key={call.callId}>
                                                <td>{call.callId}</td>
                                                <td>{call.callDate}</td>
                                                <td>{call.startTime}</td>
                                                <td>{call.endTime}</td>
                                                <td>{call.duration}</td>
                                                <td>{call.costPerMinute}</td>
                                                <td>{call.discountForCalls}</td>
                                                <td>{call.grossCost}</td>
                                                <td>{call.vat}</td>
                                                <td>{call.netCost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No calls to display.</p>
                            )}
                            <div>Total Bill Amount: £{totalBill}</div>
                            <button className="btn btn-success" onClick={calculateBill}>
                                Calculate Bill
                            </button>
                            <div>
                                <br />
                            </div>
                            <Link to="/payment" className="mb-2 md-mb-0">
                                Proceed To Payment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default MakeCall;

