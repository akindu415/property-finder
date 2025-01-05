import React from "react";
import { use } from "react";

function Favourites() {
    const [Favourites, setFavourites] = useState([]);

    //1. Load the favourites from local storage
    useEffect(()=>{
        const storedFavourites = localStorage.getItem('myfavourites');
        if(storedFavourites){
            setFavourites(JSON.parse(storedFavourites));
        }
    },[]    );

    //when the favourites change, save them to local storage
    useEffect(()=>{
        localStorage.setItem('myFavourites', JSON.stringify(Favourites));
    },[Favourites]);

    //remove a property from favourites
    const handleRemoveFavourite = (propertyId) => {
        const updated = favourites.filter((prop) => prop.id !== propertyId);
        setFavourites(updated);
      };

    //clear all favourites 
    const handleClearFavourites = () => {
        setFavourites([]);
    }

    //helper function to render each favourite property
    const renderFavouriteItem = (property) => {
        return (
          <div 
            key={property.id} 
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem"
            }}
          >
            <h3>{property.type} - £{property.price}</h3>
            <p>
              Bedrooms: {property.bedrooms} <br/>
              Location: {property.location}
            </p>
            <button onClick={() => handleRemoveFavourite(property.id)}>
              Remove from Favourites
            </button>
          </div>
        );
      };


  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Your Favourite Properties</h2>

      {favourites.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <>
          {favourites.map((prop) => renderFavouriteItem(prop))}

          <button 
            onClick={handleClearFavourites} 
            style={{ marginTop: "1rem" }}
          >
            Clear All Favourites
          </button>
        </>
      )}
    </div>
  );
}
