import { useState, useEffect } from 'react';
import { getCurrentCoords } from '../adapters/location';

const useCurrentWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const coords = await getCurrentCoords();
      console.log("coords", coords);
        
      if ('error' in coords) {
        setError(coords.error);
      } else {
        try {
          // const response = await fetch(
          //   `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
          // );

          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FLondon`
          );

          if (!response.ok) {
            throw new Error;
          }

          const data = await response.json();
          console.log("fetched", data);
          
          setError(null);
          setData(data);
        } catch {
          setError("Failed to fetch weather");
        }
      }

      setLoading(false);
    })();
  }, []);

  return [data, loading, error];
}

export default useCurrentWeather;
