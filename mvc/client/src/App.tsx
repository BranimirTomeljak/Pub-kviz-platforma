import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages/Home';
import { Quizes } from './pages/Quizes';

function App() {
  return (
    <Auth0Provider
      domain={'chess-tournament.eu.auth0.com'}
      clientId={'foqg0IcfycOXFVBgF1E6qiP0ojEA69Ql'}
      authorizationParams={{redirect_uri: window.location.origin}}
      useRefreshTokens
      cacheLocation='localstorage'
    >
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizes" element={<Quizes/>}></Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default App;
