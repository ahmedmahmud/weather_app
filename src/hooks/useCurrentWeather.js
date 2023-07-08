import { useState, useEffect } from 'react';
import { getCurrentCoords } from '../adapters/location';

const useCurrentWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const coords = getCurrentCoords();

      if (error in coords) {
        setError(coords.error);
      } else {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
        );
  
        const data = await response.json();
        setData(data);
        console.log(data);
      }
      setLoading(false);
    })();
  }, []);

  return [data, loading, error];
}

export default useCurrentWeather;
