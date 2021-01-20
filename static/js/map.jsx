// ***** GoogleMap and MapContainer components *****


//Google map 
const googleMapScript = document.createElement('script');    
googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDfi_n1PK5s4Sht9nLaojscjyos8qvkIqo&libraries=places`;
//In body tag of DOM, add script tags.
document.body.appendChild(googleMapScript);

//Call the function to create map and geocode after script tag has loaded.
googleMapScript.addEventListener('load', () => {    
  window.googlemapsdidload=true;
});

function GoogleMap(props) {
  console.log("props in Googlemap component:", props.podDetailsStats.props.street_address);
  const address = props.podDetailsStats.props.street_address + ", " + 
                  props.podDetailsStats.props.city + ", " + 
                  props.podDetailsStats.props.state + " " + 
                  props.podDetailsStats.props.zipcode;
  console.log("concatenated address:", address);
  //points to the mounted map element ref'd in the DOM. This spot holds the map.
  const googleMapRef = React.useRef(null); 
  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  //Hook to load GoogleMaps script and the map itself upon render of component.
    //Load script tags.  
    if (window.googlemapsdidload) {  
      code_address(address);
    }
    else { 
      googleMapScript.addEventListener('load', () => {    
        code_address(address);
      });
    } 

  //Hook to create map
  React.useEffect (() => {  
    if (latitude !==0 && longitude !==0) {
    createGoogleMap();
    }
  },[latitude, longitude]);

  //Define function to convert address into geocode address
  function code_address(address) {
    const geocoder = new google.maps.Geocoder();
    console.log("address post geocode constructor:", address);
    
    geocoder.geocode({'address':address}, function (results, status) {
      console.log("address and results post .geocode method:", address, results);

      if (status === google.maps.GeocoderStatus.OK) {
        const lat_data = results[0].geometry.location.lat();
        const lng_data = results[0].geometry.location.lng();
        console.log("lat_data, lng_data, status, results, address:", lat_data, lng_data, status, results, address);
        //alert("Geocode successful:", lat_data, lng_data, status);
        
        if (lat_data && lng_data) {
          setLatitude(lat_data);
          setLongitude(lng_data);
          console.log("just set latitude:", latitude);
          console.log("just set longitude:", longitude);
        }
      }
      else {
        alert("Geocode was not successful, here's the status:", status);
      } 
    }); 
  } 

  console.log("address right before createmap:", address);
  
  //Create/instantiate Google map
  function createGoogleMap(address) {
    console.log("address passed to createmap:", address);
    const map = new google.maps.Map(googleMapRef.current, {
      zoom:13,
      center: { lat: latitude,
                lng: longitude,},
      disableDefaultUI: true,
    }); 
    setMap(map);
    console.log("google map state in create map, latitude, longitude:", map, latitude, longitude);
    const position = new google.maps.LatLng(latitude, longitude);
    
    //Marker instantiation
    const marker = new google.maps.Marker({
      position: position,
      title: 'Pod location',
    }); 
    marker.setMap(map);
    console.log("marker:", marker);  
    console.log("map, lat, long:", map, latitude, longitude);  
    console.log("lat, long states:", latitude, longitude);
  } 

  return (
    <div id="google-map" ref={googleMapRef} style={{width: '715px', height: '510px'}}></div>
  );
}


function MapContainer(props) {
  console.log("props in Mapcontainer component:", props)
  
  return ( 
    <div className="map"><br/>
    <h3>Pod location(s) </h3>
      <p>{props.podDetailsStats.props.street_address}<br/>
        {props.podDetailsStats.props.city}, {props.podDetailsStats.props.state}, {props.podDetailsStats.props.zipcode}
      </p>
      <GoogleMap podDetailsStats={props.podDetailsStats} />    
    </div>
  )
}


