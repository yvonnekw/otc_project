import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client'
//import { unstable_createRoot as createRoot } from 'react-dom';
//import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error("Root element with ID 'root' not found.");
}

/*
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  throw new Error("Root element with ID 'root' not found.");
}
*/
/*
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  throw new Error("Root element with ID 'root' not found.");
}
*/
/*
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  throw new Error("Root element with ID 'root' not found.");
}
*/
/*
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <App />
  </React.StrictMode>
)

*/



/*
import React from 'react';
//import { createRoot, ReactDOM } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import App from './App';
import './index.css';
//import ReactDOM from 'react-dom'; // Correct import
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; // Import your AuthProvider component
import { BrowserRouter } from 'react-router-dom';
import { ReactDOM }  from 'react-dom/client'// from 'react-dom';


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
*/

/*
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
*/
/*
//createRoot(document.getElementById('root')).render(
 ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
   
      <App />
    
   </React.StrictMode>
 //)
);
*/
/*
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

*/

/*
import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot from 'react-dom' instead of ReactDOM
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; // Import your AuthProvider component

createRoot(document.getElementById('root')).render( // Use createRoot instead of ReactDOM.render
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
*/
/*
import React from 'react';
import ReactDOM from 'react-dom'; // Correct import
//import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; // Import your AuthProvider component

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
*/

/*

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; // Import your AuthProvider component

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);*/
/*
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

*/
