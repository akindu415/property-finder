// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import propertyData from '../data/properties.json';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import PropertyDetail from '../components/PropertyDetail';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './SearchStyle.css';
import { Link } from 'react-router-dom';

function SearchPage() {
  // State for form fields 
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [afterDate, setAfterDate] = useState(''); 
  const [postcode, setPostcode] = useState('');

  // For selecting a property to show detail (optional)
  const [selectedProperty, setSelectedProperty] = useState(null);

  // The raw list of all properties from JSON
  const allProperties = propertyData.properties;

  // === 2) Handle Form Submission ===
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear any previously selected property (optional)
    setSelectedProperty(null);

    // Force a re-render by updating some state or simply letting the filter function run in the JSX below
    // (We’ll do the actual filtering in a separate function or inline).
  };

  // === 3) Filter Function ===
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


  //ADD to favourites function
  const handleAddFavourite = (property) => {
    //1. Load the favourites from local storage
    const storedFavourites = localStorage.getItem('myfavourites');
    let favourites = [];
    if(storedFavourites){
        favourites = JSON.parse(storedFavourites);
    }

    //2. Add the new property to the favourites
    favourites.push(property);

    //3. Save the updated favourites to local storage
    localStorage.setItem('myfavourites', JSON.stringify(favourites));
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* === Left Column: The Search Form === */}
      <div style={{ minWidth: '300px' }}>
      <h1>Your Dream Home Starts From Here</h1>
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
          <div>
            <label htmlFor="afterDate">Added After:</label>
            <DatePicker
              id="afterDate"
              selected={afterDate}
              onChange={(date) => setAfterDate(date)}
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              showMonthDropdown/>
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
      <div>
            <h2>Results</h2>
            {filteredProperties.length === 0 ? (
                <p>No properties match your search.</p>
            ) : (
                <div className="property-gallery">
                    {filteredProperties.map((prop) => (
                        <div key={prop.id} className="property-card">
                            <h3>
                                <Link to={`/property/${prop.id}`}>{prop.title}</Link>
                            </h3>
                            <img src={prop.picture} alt={prop.title} className="property-image" />
                            <p>Type: {prop.type}</p>
                            <p>Price: £{prop.price}</p>
                            <p>Bedrooms: {prop.bedrooms}</p>
                            <button onClick={() => handleAddFavourite(prop)} className="favourite-btn">
                                Add to Favourites
                            </button> 
                            <Link to={`/property/${prop.id}`}>
                            <button className="view-more-btn">View More</button>
                        </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Property Detail Section */}
            <h2>Property Detail</h2>
            {selectedProperty && <PropertyDetail property={selectedProperty} />}
        </div>
    </div>
  );
}


export default SearchPage;