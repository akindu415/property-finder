
import React from 'react';  
import SearchPage from './components/SearchPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div>
      <Navbar/>
      <SearchPage/>
      <Footer/>
      
    </div>
  );
}

export default App;
