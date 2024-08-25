import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { setWeatherData } from '../store/weatherSlice'; 
import { AppDispatch } from '../store/store'; 
import SearchBar from '../components/SearchBar';

const WeatherPage: React.FC = () => {
  const router = useRouter();
  const { localityId, localityName } = router.query;
  const [weatherData, setWeatherDataState] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();

  const fetchWeatherData = async (localityId: string) => {
    try {
      const response = await axios.get(
        'https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data',
        {
          params: { locality_id: localityId },
          headers: { 'X-Zomato-Api-Key': '83583f9ed47e495bff5d4e68fd5eaf99' }, 
        }
      );
      console.log(response.data);
      const data = response.data.locality_weather_data;
      setWeatherDataState(data);
      dispatch(setWeatherData(data));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (localityId) {
      fetchWeatherData(localityId as string);
    }
  }, [localityId]);

  return (
    <>
    <Head>
      <title>weather Display</title>
      <link rel="icon" href="/weather_favicon.ico"/>
    </Head>
  
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Details</h1>
  
  

      {weatherData ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Weather Data for {localityName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Weather data details of the selected locality */}
            <div className="bg-blue-100 p-4 rounded-md shadow-md text-center">
              <p className="text-gray-700 text-lg">Temperature</p>
              <p className="text-4xl font-bold text-blue-600">{weatherData.temperature}°C</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md shadow-md text-center">
              <p className="text-gray-700 text-lg">Humidity</p>
              <p className="text-4xl font-bold text-green-600">{weatherData.humidity}%</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-md shadow-md text-center">
              <p className="text-gray-700 text-lg">Rain Accumulation</p>
              <p className="text-4xl font-bold text-yellow-600">{weatherData.rain_accumulation} mm</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-md shadow-md text-center">
              <p className="text-gray-700 text-lg">Rain Intensity</p>
              <p className="text-4xl font-bold text-purple-600">{weatherData.rain_intensity}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-md shadow-md text-center">
              <p className="text-gray-700 text-lg">Wind Speed</p>
              <p className="text-4xl font-bold text-red-600">{weatherData.wind_speed} km/h</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-md shadow-md text-center">
              <p className="text-gray-700 text-lg">Wind Direction</p>
              <p className="text-4xl font-bold text-indigo-600">{weatherData.wind_direction}°</p>
            </div>

          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">Loading... Please Wait!</p>
      )}

<SearchBar /> 
    </div>
    </> );
};

export default WeatherPage;
