$(document).ready(function() {
    let unit = 'metric'; // Default to Celsius
    $('#searchBtn').click(function() {
        let city = $('#cityInput').val();
        if (city) {
            getWeather(city, unit);
        } else {
            alert('Please enter a city name');
        }
    });

    $('#toggleUnit').click(function() {
        unit = unit === 'metric' ? 'imperial' : 'metric';
        let city = $('#cityInput').val();
        if (city) {
            getWeather(city, unit);
        }
    });

    function getWeather(city, unit) {
        $.ajax({
            url: `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`,
            method: 'GET',
            success: function(data) {
                $('#weatherInfo').html(`
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°${unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}</p>
                    <p>Condition: ${data.weather[0].description}</p>
                `);
            },
            error: function() {
                $('#weatherInfo').html('<p id="error">City not found or API error.</p>');
            }
        });
    }
});
