import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PropertyDetailPage from './components/PropertyDetailPage';

function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;