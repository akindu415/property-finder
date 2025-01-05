// src/pages/PropertyDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyData from '../data/properties.json';
import './PropertyDetailPageStyle.css'; // Importing the CSS file

function PropertyDetailPage() {
    const { id } = useParams(); 
    const property = propertyData.properties.find(prop => prop.id === id);

    if (!property) {
        return <h2>Property Not Found</h2>;
    }

    return (
        <div className="property-detail-container">
            <h1>{property.title}</h1>
            <img 
                className="main-image" 
                src={property.picture} 
                alt={property.title} 
            />
            {/* Property Information */}
            <div className="property-info">
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Price:</strong> £{property.price}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Description:</strong> {property.description}</p>
            </div>

            {/* Display Thumbnails */}
            
            <div className="gallery-container">
                {property.AllPics.map((pic, index) => (
                    <img 
                        key={index} 
                        className="thumbnail-image" 
                        src={pic} 
                        alt={`Thumbnail ${index}`} 
                    />
                ))}
            </div>

            

            {/* Back Link */}
            <Link className="back-link" to="/">Back to Search</Link>
        </div>
    );
}

export default PropertyDetailPage;
