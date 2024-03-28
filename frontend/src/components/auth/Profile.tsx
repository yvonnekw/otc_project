import React, { useState, useEffect, useContext} from 'react';
import { getCallsByUsername } from '../../services/CallService';
import { getUser } from '../../services/UserService';
import CallsTable from '../calls/CallsTable';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthProvider';
import { loginUser2, loginUser, getUsername2 } from '../../services/UserService';


interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
  telephone: string;
}

interface Call {
  id: string;
  callId: string;
  startTime: string;
  endTime: string;
  // Add more properties as needed
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const location = useLocation();
  const message = location.state && location.state.message;

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn()) {
        try {
          const userData: User = await getUser(userId!, token!);
          setUser(userData);
          setCurrentUser(localStorage.getItem("userId"));
        } catch (error) {
          console.error("Error fetching user details: ", error.message);
          setErrorMessage(error.message);
        }
      }
    };

    fetchUser();
  }, [isLoggedIn, userId, token]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response: Call[] = await getCallsByUsername(userId!);
        setCalls(response);
      } catch (error) {
        console.error("Error fetching calls: ", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchCalls();
  }, [userId, token]);

  return (
    <div className='container mb-3'>
      {/* {errorMessage && <p className="text-danger">{errorMessage}</p>} */}
      {currentUser && <h6 className='text-success text-center'>You are logged in as: {currentUser}</h6>}
      {user && (
        <div className='card p-5 mt-5' style={{ backgroundColor: "whitesmoke" }}>
          <h4 className='card-title text-center'>User Information</h4>
          <div className='card-body'>
            <div className='col-md-10 mx-auto'>
              <div className='card mb-3 shadow'>
                <div className='row g-0'>
                  <div className='col-md-2'></div>
                  <div className='col-md-10'>
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>First Name</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.firstName}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>Last Name</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.lastName}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>Email Address</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.emailAddress}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>Phone number</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.telephone}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className='card-title text-center'>Call History</h4>
          {/* Render calls table directly */}
          {calls.length > 0 ? (
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr>
                  <th scope="col">Call ID</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  {/* Add more table headings as needed */}
                </tr>
              </thead>
              <tbody>
                {calls.map(call => (
                  <tr key={call.id}>
                    <td>{call.callId}</td>
                    <td>{call.startTime}</td>
                    <td>{call.endTime}</td>
                    {/* Add more table cells for additional call details */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No calls found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

/*
const Profile = () => {
  const [user, setUser] = useState(null);
  const [calls, setCalls] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const code = localStorage.getItem("code");

  const location = useLocation
  const message = location.sate && location.state.message 
  const currentUser = localStorage.getItem("userId")

  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
  
    const fetchUser = async () => {
      if (isLoggedIn()) {
        console.log("user data user id", userId)
        try {
          const userData = await getUser(userId, token);
          console.log("user data ", userData)
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user details: ", error.message);
          console.error(error);
        }
      }
      
    }

    fetchUser();
  }, [userId, token]);


  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await getCallsByUsername(userId, token);
        setCalls(response);
        console.log("get calls ", calls)
      } catch (error) {
        console.error("Error fetching calls: ", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchCalls();
  }, [userId, token]);

  return (
    <div className='container mb-3'>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {currentUser && <h6 className='text-success text-center'>You are logged in as: {currentUser}</h6>}
      {user && (
        <div className='card p-5 mt-5' style={{ backgroundColor: "whitesmoke" }}>
          <h4 className='card-title text-center'>User Information</h4>
          <div className='card-body'>
            <div className='col-md-10 mx-auto'>
              <div className='card mb-3 shadoe'>
                <div className='row g-0'>
                  <div className='col-md-2'>
                  </div>
                  <div className='col-md-10'>
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>First Name</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.firstName}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>Last Name</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.lastName}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>Email Address</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.emailAddress}</p>
                      </div>
                    </div>
                    <hr />
                    <div className='form-group row'>
                      <label className='col-md-2 col-form-label fw-bold'>Phone number</label>
                      <div className='col-md-10'>
                        <p className='card-text'>{user.telephone}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className='card-title text-center'>Call History</h4>
          {/* Render calls table directly */

          /*
          {calls.length > 0 ? (
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr>
                  <th scope="col">Call ID</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  {/* Add more table headings as needed */
                  /*
                </tr>
              </thead>
              <tbody>
                {calls.map(call => (
                  <tr key={call.id}>
                    <td>{call.callId}</td>
                    <td>{call.startTime}</td>
                    <td>{call.endTime}</td>
                    {/* Add more table cells for additional call details */
                    /*
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No calls found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

*/