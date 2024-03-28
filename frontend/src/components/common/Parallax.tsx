import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax: React.FC = () => {
  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-text bounceIn'>
          <h1>
            Welcome to <span className='otc-color'>Optical Telephone Company</span>
          </h1>
          <h3>Make the cheapest calls to friends and loved ones around the world</h3>
        </div>
      </Container>
    </div>
  );
}

export default Parallax;

/*
const Parallax = () => {
  return (
    <div className='parallax mb-5'>
        <Container className='text-center px-5 py-5 justify-content-center'>
              <div className='animated-text bounceIn'>
                  <h1>Welcome to <span className='otc-color'>Optical Telephone Company</span>
                  </h1>
                  <h3>Make the cheapest calls to friends and love ones around the world</h3>
                
              </div>
        </Container>
    </div>
  )
}

export default Parallax
*/