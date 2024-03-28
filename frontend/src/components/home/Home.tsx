import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import HeaderMain from '../layout/HeaderMain';

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId");

  const navigator = useNavigate();

  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && <h6 className='text-success text-center'>You are logged in as: {currentUser}</h6>}
      <div className="container mt-5">
        <h2 className="mb-4">Welcome to Optical Telephone Company</h2>
        <p className="lead">
          Optical Telephone Company platform where you can initiate and manage calls easily.
        </p>
        <div className="my-4">
          <h2>Get Started</h2>
          <p>New to Your App Name? Register now to get started!</p>
          <Link to="/register" className="mb-2 md-mb-0">Register</Link>
        </div>

        <div className="my-4">
          <h2>Already have an account?</h2>
          <p>Log in to access your dashboard and initiate calls.</p>
          <Link to="/login" className="mb-2 md-mb-0">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;


/*
const Home = () => {
  const location = useLocation
  const message = location.sate && location.state.message 
  const currentUser = localStorage.getItem("userId")


  const navigator = useNavigate();
/*
  function login(){
      navigator('/login')
  }

  function register(){
    navigator('/register')
}*/
  {/*
  return (
   
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && <h6 className='text-success text-center'>You are logged in as: {currentUser}</h6>}
      <div className="container mt-5">
        <h2 className="mb-4">Welcome to Optical Telephone Company</h2>
        <p className="lead">
        Optical Telephone Company platform where you can initiate and manage calls easily.
        </p>
        <div className="my-4">
          <h2>Get Started</h2>
          <p>New to Your App Name? Register now to get started!</p>
          <Link to="/register" className="mb-2 md-mb-0">Register</Link>
        </div>

        <div className="my-4">
          <h2>Already have an account?</h2>
          <p>Log in to access your dashboard and initiate calls.</p>
          <Link to="/login" className="mb-2 md-mb-0">Login</Link>
        </div>
        </div>
    </section>
    
  )
}

export default Home
*/}