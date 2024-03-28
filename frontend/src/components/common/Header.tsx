import React from 'react'

interface HeaderMainProps {
  title: string;
}

const HeaderMain: React.FC<HeaderMainProps> = ({ title }) => {
  return (
    <header>
      <div className='overlay'></div>
      <div className='container'>
        <h1 className='header-title text-center'>{title}</h1>
      </div>
    </header>
  );
}

export default HeaderMain;

/*

const HeaderMain = (title) => {
  return (
    <header>
      <div className='overlay'></div>
      <div className='container'>
        <h1 className='header-title text-center'>{title}</h1>
      </div>
    </header>
  )
} 

export default HeaderMain
*/