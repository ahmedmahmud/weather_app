import { useState, useEffect } from "react";

const useWeather = ({ latitude, longitude }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        if (!response.ok) {
          throw new Error();
        }
        
        const data = await response.json();
        setData(data);
        setError(false);
      } catch {
        setError(true);
      }

      setLoading(false);
    })();
  }, []);

  return [data, loading, error];
};

export default useWeather;
