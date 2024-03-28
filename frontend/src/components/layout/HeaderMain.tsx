
import React from 'react'

const HeaderMain: React.FC = () => {
  return (
    <header className='navbar navbar-dark bg-dark'>
      <div className='overlay'></div>
      <div className='animated-text overlay-content'>
        <h1>Welcome to <span className='color'>Optical Telephone Company</span></h1>
        <h1>Make the cheapest calls to anyone, anytime around the world!</h1>
      </div>
    </header>
  );
};

export default HeaderMain;