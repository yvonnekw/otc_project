import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { useAuth } from '../hooks/useAuth';
//import { useAuth } from '../hooks/useAuth';
import { loginUser2, loginUser, getUsername2 } from '../../services/UserService';
//import { jwtDecode } from 'jwt-decode';
import jwt_decode from "jwt-decode";
import AuthProvider, { AuthContext } from './AuthProvider';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const { handleLogin, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn()) {
        navigate("/dashboard");
      }
    };
    fetchUser();
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password };
    const response = await loginUser2(user);
    if (response) {
      const token = response.token;
      handleLogin(token);
      navigate("/dashboard");
    } else {
      setErrMsg("Invalid username or password. Please try again.");
      setTimeout(() => {
        setErrMsg("");
      }, 4000);
    }
  };

  return (
    <section className='container col-6 mt-5 mb-5'>
      {errMsg && <p className='alert alert-danger'>{errMsg}</p>}
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Login here</h2>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group mb-2'>
                <label htmlFor="username" className="text-center">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  className="form-control"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  className="form-control"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className='btn btn-success'
                  style={{ marginRight: "10px" }}
                >
                  Login
                </button>
                <span style={{ marginLeft: "10px" }}>
                  Not registered yet?<Link to={"/register"}> Register here</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

/*
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');


  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext)
  

  const { isLoggedIn } = useContext(AuthContext)

   useEffect(() => {
     const fetchUser = async () => {
       if (isLoggedIn()) {
           navigate("/dashboard")
       }
     }

    fetchUser();
  }, []);


  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = { username, password };
    const response = await loginUser2(user)
    if (response) {
      const token = response.token
      handleLogin(token);
     navigate("/dashboard")
    } else {
      setErrMsg("Invalid username or password. Please try again.")
    }
    setTimeout(() => {
      setErrMsg("")
    }, 4000)
  }

  const [errors, setErrors] = useState({
        username:'',
        password:''
   })

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleLogin2 = async (e) => {
      e.preventDefault();
    if (validateForm()) {
        const user = { username, password };
        try {
          //const userData = await login(user);
             const userData = await loginUser(user);
          
            console.log("from the login page", userData);
            // Check if userData and userData.data are not null/undefined
            if (userData && userData.data && userData.data.user) {
                // Access the username from the response data with null checks
              console.log("from the login page username ", userData.data.user.username);
              //getUsername2();
              
            } else {
                console.error("Response data is invalid:", userData);
                setErrMsg("An error occurred while logging in");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrMsg("An error occurred while logging in");
        }
    } else {
        setErrMsg("Username or password incorrect");
    }
  
  };

  function validateForm(){
        let valid = true;
        //speard of data to copy object 
        const errorsCopy = {... errors}

        if(username.trim()){
            errorsCopy.username = '';
        } else {
            errorsCopy.username = 'username is required';
            valid = false;
        }

        if(password.trim()){
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'password is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }


  return (
     <section className='container col-6 mt-5 mb-5'>
      {errMsg && <p className='alert alert-danger'>{ errMsg }</p>}
        <div className='row'>
          {errMsg && <div className="alert alert-danger">{errMsg}</div>}
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'>Login here</h2>
            <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group mb-2'>
              <label htmlFor="username" className="text-center">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="form-control"
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="form-control"
                  onChange={handlePasswordChange}
                required
              />
              </div>
              <div className="mb-3">
                <button 
                  type="submit"
                  className='btn btn-success'
                  style={{marginRight : "10px"}}
                >
                  Login
                </button>
                <span style={{ marginLeft: "10px" }}>
                  Not registered yet?<Link to={"/register"}> Register here</Link>
                </span>
             </div>
            </form>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Login;

*/