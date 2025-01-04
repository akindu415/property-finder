// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import propertyData from '../data/properties.json';
import DatePicker from 'react-datepicker';
import PropertyDetail from '../components/PropertyDetail';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './SearchStyle.css';




function SearchPage() {
  //usestate hooks to store the form data which can be changed by the user
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [afterDate, setAfterDate] = useState(''); 
  const [postcode, setPostcode] = useState('');

  // The selected property to show detail for
  const [selectedProperty, setSelectedProperty] = useState(null);

  //loads all property data into a constant for filetering later
  const allProperties = propertyData.properties;

 //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();// to prevent the browser from doing its default action of submitting the form

    // Clear any previously selected property 
    setSelectedProperty(null);
  };

 //this function will filter the properties based on the user input
  const getFilteredProperties = () => {
    return allProperties.filter((prop) => {
      // 3.1 Filter by type
      if (type !== 'any' && prop.type.toLowerCase() !== type.toLowerCase()) {
        return false;
      }

      // 3.2 Filter by price range
      if (minPrice && prop.price < Number(minPrice)) {
        return false;
      }
      if (maxPrice && prop.price > Number(maxPrice)) {
        return false;
      }

      // 3.3 Filter by bedrooms range
      if (minBedrooms && prop.bedrooms < Number(minBedrooms)) {
        return false;
      }
      if (maxBedrooms && prop.bedrooms > Number(maxBedrooms)) {
        return false;
      }

      // 3.4 Filter by date
      if (afterDate) {
        const afterDateObj = new Date(afterDate); // user’s date
        const propertyDateObj = convertToDate(prop.added);

        // Only include if propertyDateObj >= afterDateObj
        if (propertyDateObj < afterDateObj) {
          return false;
        }
      }

      // 3.5 Filter by postcode
      if (postcode) {
        // For instance, check if the property's postcode starts with the user input
        // Convert both to uppercase for a case-insensitive match
        if (!prop.postcode.toUpperCase().startsWith(postcode.toUpperCase())) {
          return false;
        }
      }

      return true; // If all filters pass
    });
  };

  // Helper to convert {year, month, day} to a real JS Date
  const convertToDate = ({ year, month, day }) => {
    // A small helper to convert month name to index, or handle numeric months
    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11
    };

    let monthIndex;
    if (typeof month === 'string') {
      monthIndex = monthMap[month] ?? 0; // default to 0 if month not found
    } else {
      // If it's already a number, might need to subtract 1 if data has 1 for January
      monthIndex = Number(month) - 1; 
    }

    return new Date(year, monthIndex, day);
  };

  // === 4) Render the UI ===
  const filteredProperties = getFilteredProperties();

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* === Left Column: The Search Form === */}
      <div style={{ minWidth: '300px' }}>
        <h1>Property Search</h1>
        <form onSubmit={handleSubmit}>
          {/* Property Type */}
          <div>
            <Autocomplete
              options={['Any', 'House', 'Flat']}
              value={type}
              onChange={(event, newValue) => setType(newValue || 'any')}
              renderInput={(params) => <TextField {...params} label="Type" />}
              getOptionLabel={(option) => option || 'Any'}
              isOptionEqualToValue={(option, value) => option === value}
              fullWidth
            />
          </div>


          {/* Min/Max Price */}
          <div>
            <label htmlFor="minPrice">Min Price:</label>
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              placeholder="e.g. 100000"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              placeholder="e.g. 400000"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Min/Max Bedrooms */}
          <div>
            <label htmlFor="minBedrooms">Min Bedrooms:</label>
            <input
              id="minBedrooms"
              type="number"
              value={minBedrooms}
              placeholder="e.g. 1"
              onChange={(e) => setMinBedrooms(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="maxBedrooms">Max Bedrooms:</label>
            <input
              id="maxBedrooms"
              type="number"
              value={maxBedrooms}
              placeholder="e.g. 4"
              onChange={(e) => setMaxBedrooms(e.target.value)}
            />
          </div>

          {/* After Date */}
          <div style={{ margin: '20px' }}>
            <label htmlFor="afterDate">Added After:</label>
            <DatePicker
              id="afterDate"
              selected={afterDate}
              onChange={(date) => setAfterDate(date)}
              dateFormat="dd/MM/yyyy"/>
        </div>
          

          {/* Postcode */}
          <div>
            <label htmlFor="postcode">Postcode:</label>
            <input
              id="postcode"
              type="text"
              value={postcode}
              placeholder="e.g. BR1"
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      {/* === Right Column: The Results and Detail === */}
      <div style={{ flex: 1 }}>
        <h2>Results</h2>
        {filteredProperties.length === 0 ? (
          <p>No properties match your search.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {filteredProperties.map((prop) => (
              <li key={prop.id} style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    cursor: 'pointer'
                  }}
                  // When user clicks, we set this property as selected
                  onClick={() => setSelectedProperty(prop)}
                >
                  <h3>{prop.title}</h3>
                  <img
                    src={prop.image}
                    alt={prop.title}
                    style={{ maxWidth: '200px' }}
                  />
                  <p>Type: {prop.type}</p>
                  <p>Price: £{prop.price}</p>
                  <p>Bedrooms: {prop.bedrooms}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Show the selected property's detail */}
        <h2>Property Detail</h2>
        <PropertyDetail property={selectedProperty} />
      </div>
    </div>
  );
}

export default SearchPage;
