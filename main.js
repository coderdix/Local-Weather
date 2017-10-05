  var Geo = {};
  var temp;

  function error() {
    console.log("That's odd, we couldn't find you.");
  }

  function success(position) {
    console.log(position);
    Geo.lat  = position.coords.latitude;
    Geo.long = position.coords.longitude;
    console.log('trying to fetch weather...');
    fetchWeather(Geo.lat, Geo.long);
  }

  function fetchWeather(latitude, longitude) {
    console.log('fetching weather for ', latitude, longitude);
    $.ajax({
      url: 'http://api.apixu.com/v1/current.json',
      dataType: 'json',
      data: {
        key: 'eb1b159efd2b46dd87a234301170606',
        q: latitude + ',' + longitude,
      },
      success: function(response) {
        console.log(Object.getOwnPropertyNames(response));
        console.log(response.location.name);
        
        city  = response.location.name;
        tempF = response.current.temp_f;
        tempC = response.current.temp_c;
        icon  = response.current.condition.icon;
        
        $('.current-location').text(city);
        $('#icon').attr('src', 'http:'+icon);
        $('.current-temp').text(tempF);
        
        function changeScale(fah, cel) {
          if ($('.current-temp').text(temp) == tempF) {
            $('.current-temp').text(cel);
          } else {
            $('.current-temp').text(fah);
          }         
        }

        $('.btn').on('click', changeScale(tempF, tempC)); 
      }
    }).done(data => console.log(data)).fail((xhr, status) => console.log(status));
  }

$(document).ready(function() {
  if (navigator.geolocation) {
    console.log('getting location...');
    navigator.geolocation.getCurrentPosition(success, error);
  } 
  else {
    alert("GeoLocation isn't supported by your browser");
  }
  
});