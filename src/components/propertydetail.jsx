import React from 'react';


//This compomemt displays the property data
function PropertyDetail({property}){
    if(!property){
        return <p>Please select a property to see details+  </p>
    }

    const{
        title,
        description,
        price,
        bedrooms,
        postcode,
        added,
        image
    }=property;

    return(
        <div>
            <h2>{title}</h2>
            <img src={image} alt={title} style={{maxWidth:'300px'}}/>
            <p>{description}</p>
            <p><strong>Price:</strong> RS.{price}</p>
            <p><strong>Bedrooms:</strong> {bedrooms}</p>
            <p><strong>Postcode:</strong> {postcode}</p>
            <p><strong>Added on:</strong> {`${added.day} ${added.month} ${added.year}`}</p>

        </div>
    );
}
export default PropertyDetail;