import React, {useEffect, useState, useContext} from 'react'
import { listCalls } from '../../services/CallService'
import AuthProvider, { AuthContext } from '../auth/AuthProvider';
import { useLocation } from 'react-router-dom';

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

const ListAllCalls: React.FC = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const location = useLocation();
    const message = location.state && location.state.message;
    const currentUser = localStorage.getItem("userId");
    const { role } = useContext(AuthContext);
   
    const { user, isLoggedIn } = useContext(AuthContext);
    //const userRole = user ? user.scope : null;
    const userId = localStorage.getItem("userId") ?? '';
    const userRole = localStorage.getItem("userRole")

    console.log("list calls user role ", userRole)

    if (role !== "ADMIN") {
        return <div>You don't have permission to access this page.</div>;
    }


    useEffect(() => {
        if (isLoggedIn() && role === "ADMIN") {
            listCalls()
                .then((response) => {
                    setCalls(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Handle the case where the user is not logged in
        }
    }, []);

    return (
        <div className='container'>
            {message && <p className='text-warning px-5'>{message}</p>}
            {currentUser && <h6 className='text-success text-center'>You are logged in as: {currentUser}</h6>}
            <br /> <br />
            <div className='row'></div>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Call list</h2>
                <div className='card-body'></div>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Call Id</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th>TotalTime</th>
                            <th>Cost Per Minute</th>
                            <th>Discount For Call</th>
                            <th>SignUp Discount</th>
                            <th>VAT</th>
                            <th>Net Cost</th>
                            <th>Gross Cost</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calls.map((call) => (
                            <tr key={call.id}>
                                <td>{call.callId}</td>
                                <td>{call.startTime}</td>
                                <td>{call.endTime}</td>
                                <td>{call.duration}</td>
                                <td>{call.totalTime}</td>
                                <td>{call.costPerMinute}</td>
                                <td>{call.discountForCalls}</td>
                                <td>{call.signUpDiscount}</td>
                                <td>{call.vat}</td>
                                <td>{call.netCost}</td>
                                <td>{call.grossCost}</td>
                                <td>{call.totalCost}</td>
                            </tr>
                        ))}
                        <tr></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListAllCalls;


/*
const ListAllCalls = () => {
//defines the variables in a functional component
    const [calls, setCalls] = useState([])


  const { isLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        if (isLoggedIn()) {
            listCalls().then((response) => {
                setCalls(response.data);

            }).catch(error => {
                console.error(error);
            })
        } else {
            
        }

    }, [])


  return (
    <div className='container'>
        <br /> <br />
        <div className='row'></div>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
              <h2 className='text-center'>Call list</h2>
                <div className='card-body'></div>
                    <table className='table table-striped table-bordered'>
                            <thead>
                                    <tr>
                                        <th>Call Id</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Duration</th>
                                        <th>TotalTime</th>
                                        <th>Cost Per Minute</th>
                                        <th>Discount For Call</th>
                                        <th>SignUp Discount</th>
                                        <th>VAT</th>  
                                        <th>Net Cost</th>
                                        <th>Gross Cost</th>
                                        <th>Total Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        calls.map(call =>
                                            <tr key={call.id}>
                                                <td>{call.callId}</td>
                                                <td>{call.startTime}</td>
                                                <td>{call.endTime}</td>
                                                <td>{call.duration}</td>
                                                <td>{call.totalTime}</td>
                                                <td>{call.costPerMinute}</td>
                                                <td>{call.discountForCalls}</td>
                                                <td>{call.signUpDiscount}</td>
                                                <td>{call.vat}</td>
                                                <td>{call.netCost}</td>
                                                <td>{call.grossCost}</td>
                                                <td>{call.totalCost}</td>
                                            </tr>
                                            
                                            )
                                    }
                                    <tr>

                                    </tr>
                                </tbody>
                            </table>
            </div>
    </div>
  )
}

export default ListAllCalls
*/
