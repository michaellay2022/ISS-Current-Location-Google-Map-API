/* https://wheretheiss.at/w/developer */

// https://api.wheretheiss.at/v1/satellites/25544

function initMap() {
  //var lastUPdated is for new variable, the one "lastUpdated" is from the HTML id
  var lastUpdated = document.getElementById("lastUpdated");
  var loc = document.getElementById("loc");
  var lat = 0;
  var long = 0;

  
  // await fetch("https://api.wheretheiss.at/v1/satellites/25544")
  //   // the avaiable response can be anything then you fetch symbol => to conver to JSON
  //   .then((response) => response.json())
  //   // the JSON data is going to store inside the dataCODE
  //   .then((data) => {
  //     //   parseFloat is to convert string to number and toFixed to have 4 decimal point
  //     lat = parseFloat(data.latitude.toFixed(4));
  //     long = parseFloat(data.longitude.toFixed(4));
  //     var date = new Date(data.timestamp * 1000);
  //     var hours = date.getHours();
  //     var minutes = `0${date.getMinutes()}`; //the minute generate 0 to 59
  //     var updatedTime =
  //       hours > 12
  //         ? `${hours - 12}:${minutes.substr(-2)} PM`
  //         : `${hours} : ${minutes.substr(-2)} AM`;

  //     lastUpdated.innerHTML = `Last Updated: ${updatedTime} `;
  //     loc.innerHTML = `Latitude: ${lat} <br> Longitude: ${long}`;
  //   });
//=================================================================================================
  var location = { lat: lat, lng: long };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: location,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: "iss.png",
      scaledSize: new google.maps.Size(60, 60),
    },
  });
  map.addListener("tilesloaded", function () {
    setInterval(function () {
     fetch("https://api.wheretheiss.at/v1/satellites/25544")
        // the avaiable response can be anything then you fetch symbol => to conver to JSON
        .then((response) => response.json())
        // the JSON data is going to store inside the dataCODE
        .then((data) => {
          //   parseFloat is to convert string to number and toFixed to have 4 decimal point
          lat = parseFloat(data.latitude.toFixed(4));
          long = parseFloat(data.longitude.toFixed(4));
          var date = new Date(data.timestamp * 1000);
          var hours = date.getHours();
          var minutes = `0${date.getMinutes()}`; //the minute generate 0 to 59
          var updatedTime =
            hours > 12
              ? `${hours - 12}:${minutes.substr(-2)} PM`
              : `${hours} : ${minutes.substr(-2)} AM`;

          lastUpdated.innerHTML = `Last Updated: ${updatedTime} `;
          loc.innerHTML = `Latitude: ${lat} <br> Longitude: ${long}`;
          map.panTo({ lat: lat, lng: long });
          marker.setPosition({ lat: lat, lng: long });
        });
    }, 3000);
  });
}
