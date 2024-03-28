import React, { useEffect, useState } from 'react';
import { getCallsByUsername, getPaidCallsByUsername } from '../../services/CallService';
import { useLocation } from 'react-router-dom';

interface Call {
  id: string;
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
  callDate: string;
}

interface Props {
  userId: string;
}

const CallsTable: React.FC<Props> = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const userId = localStorage.getItem("userId") ?? '';
  const location = useLocation();
  const message = location.state && location.state.message;
  console.log("get calls by user id ", userId)

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await getPaidCallsByUsername(userId); // Fetch only paid calls
        setCalls(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCalls();
  }, [userId]);

/*
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await getCallsByUsername(userId);
        setCalls(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCalls();
  }, [userId]);

  */

  return (
    <div className='container'>
      {message && <p className='text-warning px-5'>{message}</p>}
      {userId && <h6 className='text-success text-center'>You are logged in as: {userId}</h6>}
      <br /> <br />
      <div className='row'></div>
      <div className='card col-md-6 offset-md-3 offset-md-3'>
        <h2 className='text-center'>Call History</h2>
        <div className='card-body'></div>
        {calls && calls.length === 0 ? (
          <p>No calls to display.</p>
        ) : (
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
              {calls && calls.map((call) => (
                <tr key={call.id}>
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
        )}
      </div>
    </div>
  );
};

export default CallsTable;
/*
const CallsTable = ({ userId }) => {
    //defines the variables in a functional component
    const [calls, setCalls] = useState([])
    //const [username, setUsername] = useState('')

    //setUsername('yodalpinky1')

    /*
    useEffect(() => {
        getCallsByUsername(username).then((response) => {
            console.log("response data " + response.data)
            setCalls(response.data);

        }).catch(error => {
            console.error(error);
        })

    }, [username])

    */
/*
  useEffect(() => {
    // Fetch calls data when the component mounts or when the username changes
    getCallsByUsername(userId)
        .then((response) => {
            setCalls(response.data); // Set calls data from the response
        })
        .catch(error => {
            console.error(error);
        });
}, [userId]);

return (
<div className='container'>
    <br /> <br />
    <div className='row'></div>
      <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Call Summary</h2>
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
                  {/* {
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
                            */
/*
  {calls.length > 0 ? ( // Check if calls array is not empty before mapping
        calls.map(call =>
            <tr key={call.id}>
                {/* Table body cells */
/*
</tr>
)
) : (
<tr>
<td colSpan="12">No calls found</td>
</tr>
 )}
</tbody>
</table>
</div>
</div>
)
}

export default CallsTable
*/