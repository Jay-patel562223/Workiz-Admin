import React from "react";
import GoogleMapReact from "google-map-react";
import GoogleApiWrapper from "google-maps-react";

const LocationPin = ({ text }) => <div>
    <div className="pin">
    {/* <Icon icon={locationIcon} className="pin-icon" /> */}
    <p className="pin-text">{text}</p>
  </div> 
</div>;  
const CustomMap = (props) => {
  const { userId } = props;
  

  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: userId?.location?.coordinates[1],
    lng: userId?.location?.coordinates[0],
  }

  console.log("userId", userId);
  console.log("loaction ", userId?.location?.coordinates[1]);


  // const defaultProps = {
  //   center: {
      
     
  //   },
  //   zoom: 11,
  // };

  const YOUR_API_KEY = "AIzaSyC3mZg6P7r2AzeOdm4XiQTmHora9Zs3fGQ";

  return (
    
    <div style={{ height: "55vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${YOUR_API_KEY}` }}
        defaultCenter={location}
        // defaultZoom={defaultProps.zoom}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          // text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};



export default CustomMap;


// GoogleApiWrapper({
//   apiKey: "AIzaSyC3mZg6P7r2AzeOdm4XiQTmHora9Zs3fGQ",
// })(CustomMap);