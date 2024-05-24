import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages/Home';

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{redirect_uri: window.location.origin}}
      useRefreshTokens
      cacheLocation='localstorage'
    >
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default App;
