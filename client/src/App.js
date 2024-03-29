import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import Footer from "./components/Footer/Footer.jsx"

const client = new ApolloClient({
  // uri: 'http://localhost:5000',
  uri: 'https://cookbook-server-three.vercel.app/',
  cache: new InMemoryCache(),
})

function App() {
  // const [mode, setMode] = useState('light')
  
  // const handleClick = () => {
  //   setMode(mode === 'light' ? 'dark' : 'light')
  // }
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer /> 
        {/* <div
      style={{
        background: mode === 'light' ? '#eee' : '#222',
        color: mode === 'light' ? '#222' : '#eee',
        display: 'grid',
        placeItems: 'center',
        minWidth: '320px',
        minHeight: '320px',
        borderRadius: '4px'
      }}
    >
      <p>Chosing theme: {mode}.</p>
      <button onClick={handleClick}>Change apperience theme</button>
    </div> */}
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
