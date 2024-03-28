import React, { useEffect, useState, useRef } from 'react';
import { registerUser, registerUser2 } from '../../services/UserService';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Register: React.FC = () => {
    const location = useLocation();
    const message = location.state && location.state.message;

    const currentUser = localStorage.getItem("userId");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [authorities, setAuthorities] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [errors, setErrors] = useState<{
        firstName: string;
        lastName: string;
        emailAddress: string;
        telephone: string;
        password: string;
    }>({
        firstName: '',
        lastName: '',
        emailAddress: '',
        telephone: '',
        password: ''
    });

    const navigate = useNavigate();

    const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            const user = { firstName, lastName, emailAddress, telephone };
            try {
                const response = await registerUser(user);
                if (response) {
                    setSuccessMessage("A new user is registered");
                    setErrorMessage("");
                    navigate('/login');
                } else {
                    setErrorMessage("Error registering user");
                }
            } catch (error) {
                setSuccessMessage("");
                setErrorMessage(`Registration error: ${error.message}`);
            }
            setTimeout(() => {
                setErrorMessage("");
                setSuccessMessage("");
            }, 5000); // Adjust timeout value as needed
        }
    };

    const validateForm = () => {
        let valid = true;
        // Spread the errors object to copy it
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }


        if (!emailAddress.trim()) {
            errors.emailAddress = 'Email address required';
            valid = false;
        }

        if (!telephone.trim()) {
            errors.telephone = 'Telephone number is required';
            valid = false;
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        }

        /*
// Set errors using the functional update form of setState
    setErrors(prevErrors => ({
        ...prevErrors,
        ...errorsCopy
    }));
        */

        setErrors(errors);
        return valid;
    };

    function saveUser2(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (validateForm()) {
            try {
                setAuthorities(["USER"]);
                const user = { firstName, lastName, emailAddress, telephone, password, authorities };
                const response = registerUser2(user);

                if (response !== undefined) {
                    setSuccessMessage("A new user is registered");
                    setErrorMessage('');
                    navigate('/login');
                } else {
                    setErrorMessage('Error registering user');
                }
            } catch (error) {
                setSuccessMessage('');
                setErrorMessage(`Registration error: ${error.message}`);
            }
            setTimeout(() => {
                setErrorMessage('');
                setSuccessMessage('');
            }, 5000); // Adjust timeout value as needed
        }
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {message && <p className='text-warning px-5'>{message}</p>}
            {currentUser && <h6 className='text-success text-center'>You are logged in as: {currentUser}
                <h6>Not you? <Link to="/login">login here</Link></h6></h6>}
     
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}

            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Register here</h2>
                    <div className='card-body'>
                        <form onSubmit={saveUser2}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter user First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter user Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email Address</label>
                                <input
                                    type='text'
                                    placeholder='Enter your email address'
                                    name='email'
                                    value={emailAddress}
                                    className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
                           
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                />
                                {errors.emailAddress && <div className='invalid-feedback'>{errors.emailAddress}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Telephone</label>
                                <input
                                    type='number'
                                    placeholder='Enter your telephone number'
                                    name='phone'
                                    value={telephone}
                                    className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                                {errors.telephone && <div className='invalid-feedback'>{errors.telephone}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Password</label>
                                <input
                                    type='password'
                                    placeholder='Enter your password'
                                    name='password'
                                    value={password}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                            </div>
                            <div>
                                <button type='submit' className='btn btn-success'>Submit</button>
                                <span style={{ marginLeft: "10px" }}>Already registered? <Link to="/login">login here</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;

/*
const Register = () => {

   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [emailAddress, setEmailAddress] = useState('')
    const [telephone, setTelephone] = useState('')
    const [password, setPassword] = useState('');
   const [authorities, setAuthorities] = useState([]);
    const [errorMessage, setErrorMessage]= useState('');
    const [successMessage, setSuccessMessage] = useState('');

   const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        emailAddress:'',
       telephoneNumber: '',
        password: ''
   })

    const navigate = useNavigate();
    
        function saveUser2 (e){
            e.preventDefault();
            successMessage["A new user is registered"]
            //errorMessage[""]
        
            if (validateForm()) {
                try {
                    setAuthorities["USER"];
                     const user = {firstName, lastName, emailAddress, telephone, password, authorities}
                    const response = registerUser2(user)
                    console.log(response)

                    if (response !== undefined) {
                        setSuccessMessage(successMessage + response)
                        setErrorMessage("")
        
                        navigate('/login')

                    } else {
                        setErrorMessage("Error registering user")
                    }
                    //})
                } catch (error) {
                    setSuccessMessage("")
                    setErrorMessage(`Registration error : ${error.message}`)     
                }
                setTimeout(() => {
                    setErrorMessage("")
                    setSuccessMessage("")
                }, 500)
        } 
    }

    function saveUser (e){
        e.preventDefault();
        
        if (validateForm()) {
            setAuthorities["USER"];
            const user = {firstName, lastName, emailAddress, telephone, authorities}
            console.log(user)
    
            registerUser(user).then((response) =>{
                console.log(response.data)
    
                navigate('/login')
            })
        } 
    }

    function validateForm(){
        let valid = true;
        //speard of data to copy object 
        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(emailAddress.trim()){
            errorsCopy.emailAddress = '';
        } else {
            errorsCopy.emailAddress = 'Email address required';
            valid = false;
        }

        if(telephone.trim()){
            errorsCopy.telephone = '';
        } else {
            errorsCopy.telephone = 'Telephone number is required';
            valid = false;
        }

        if(password.trim()){
            errorsCopy.password = '';
        } else {
            errorsCopy.password = 'Password is required';
            valid = false;
        }
        setErrors(errorsCopy);

        return valid;
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
             {successMessage && <p className='alert alert-success'>{successMessage}</p>}

        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Register here</h2>
                <div className='card-body'>
                    <form onClick={saveUser2}>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input
                                type='text'
                                placeholder='Enter user First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid': '' }`}
                                onChange={(e) => setFirstName(e.target.value)}
                                >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'>{ errors.firstName }</div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input
                                type='text'
                                placeholder='Enter user Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid': '' }`}
                                onChange={(e) => setLastName(e.target.value)}
                                >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'>{ errors.lastName }</div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email Address</label>
                            <input
                                type='text'
                                placeholder='Enter your email address'
                                name='email'
                                value={emailAddress}
                                className={`form-control ${errors.emailAddress ? 'is-invalid': '' }`}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                >
                            </input>
                            {errors.emailAddress && <div className='invalid-feedback'>{ errors.emailAddress }</div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Telephone</label>
                            <input
                                type='number'
                                placeholder='Enter your telephone number'
                                name='phone'
                                value={telephone}
                                className={`form-control ${errors.telephone ? 'is-invalid': '' }`}
                                onChange={(e) => setTelephone(e.target.value)}
                                >
                            </input>
                            {errors.password && <div className='invalid-feedback'>{ errors.password }</div> }
                            </div>
                             <div className='form-group mb-2'>
                            <label className='form-label'>Password</label>
                            <input
                                type='text'
                                placeholder='Enter your password'
                                name='password'
                                value={password}
                                className={`form-control ${errors.password ? 'is-invalid': '' }`}
                                onChange={(e) => setPassword(e.target.value)}
                                >
                            </input>
                            {errors.password && <div className='invalid-feedback'>{ errors.password }</div> }
                            </div>
                            <div>
                                <button className='btn btn-success' >Submit</button>
                                   <span style={{ marginLeft: "10px" }}>
                                        Not registered yet?<Link to={"/Login"}> login here </Link>
                                   </span>
                            </div>
                    </form>
                </div>

            </div>
        </div>

    </section>
        
    )
}
export default Register
*/