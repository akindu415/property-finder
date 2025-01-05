// src/pages/PropertyDetailPage.jsx
import React from 'react';
import { useParams,Link } from 'react-router-dom';
import propertyData from '../data/properties.json';

function PropertyDetailPage() {
    const { id } = useParams(); 
    const property = propertyData.properties.find(prop => prop.id === id);

    if (!property) {
        return <h2>Property Not Found</h2>;
    }

    return (
        <div>
            <h1>{property.title}</h1>
            <img src={property.picture} alt={property.title} style={{ maxWidth: '600px' }} />
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Price:</strong> £{property.price}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Description:</strong> {property.description}</p>

            {/* Display Thumbnails */}
            <h3>Gallery</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                {property.AllPics.map((pic, index) => (
                    <img key={index} src={pic} alt={`Thumbnail ${index}`} style={{ width: '100px', cursor: 'pointer' }} />
                ))}
            </div>

            <Link to="/">Back to Search</Link>
        </div>
    );
}

export default PropertyDetailPage;