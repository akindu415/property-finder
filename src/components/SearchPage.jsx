import React,{useState} from "react";
import {DatePicker} from 'react-widgets';

export default function SearchPage(){
    // declare state variables for form fields
    //state variables allow react components to hold and manage data which changes overtime
    const [type,setType] = useState('any');//default any property
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(0);
    const [minBedrooms,setMinBedrooms] = useState(0);
    const [maxBedrooms,setMaxBedrooms] = useState(0);
    const [afterDate,setAfterDate] = useState(null);//no date selected initially    
    const [postcode,setPostcode] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        //Gather form data
        const searchCriteria = {
            type,
            minPrice:minPrice||0,
            maxPrice:maxPrice||Infinity,
            minBedrooms:minBedrooms||0,
            maxBedrooms:maxBedrooms||Infinity,
            afterDate,
            postcode,
        };

        //Send search criteria to server
        }

    return(
        <form onSubmit={handleSearch} style={{maxWidth:'600px',margin:'0 auto'}}>
            <h2>Find properties according to your liking</h2>

            {/* property type */}
            <div>
                <label htmlFor="type-select">Property Type</label><br />
                <select
                    id="type-select"
                    value={type}
                    onChange={(e)=>setType(e.target.value)}>

                    <option value="any">Any</option>
                    <option value="house">House</option>
                    <option value="flat">Flat</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="land">Land</option>

                </select>
            </div>

            {/* price range */}
            <div>
                <label htmlFor="min-price">Minimum Price</label><br />
                <input 
                    type="number"  
                    id="min-price"
                    placeholder="e.g. 100000"
                    value={minPrice}
                    onChange={(e)=>setMinPrice(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="max-price">Maximum Price</label><br />
                <input 
                    type="number"  
                    id="max-price"
                    placeholder="e.g. 500000"
                    value={maxPrice}
                    onChange={(e)=>setMaxPrice(e.target.value)} 
                />
            </div>

            {/* Bedrooms */}
            <div>
                <label htmlFor="min-bedrooms">Max Bedrooms:</label><br/>
                <input type="number"
                id='max-bedrooms'
                placeholder="e.g: 4"
                value={maxBedrooms}
                onChange={(e) =>setMaxBedrooms(e.target.value)}
                 />
            </div>

            <div>
                <label htmlFor="min-bedrooms">Min Bedrooms:</label><br/>
                <input type="number"
                id='min-bedrooms'
                placeholder="e.g: 2"
                value={minBedrooms}
                onChange={(e) =>setMinBedrooms(e.target.value)}
                 />
            </div>

            {/* Date added*/}
            <div>
                <label htmlFor= 'date-added'>Date Added</label><br/>
                <DatePicker
                    id='date-added'
                    value={afterDate}
                    onChange={(value)=>setAfterDate(value)}
                />
            </div>

            {/* Postcode */}
            <div>
                <label htmlFor="postcode">Postcode Area</label><br />
                <input 
                    type="text" 
                    id="postcode"
                    placeholder="e.g. 6546"
                    value={postcode}
                    onChange={(e)=>setPostcode(e.target.value)}
                />
            </div>

            {/* submit buttton */}
            <button type="submit">Search</button>
        
            

            
        </form>
        );
}
