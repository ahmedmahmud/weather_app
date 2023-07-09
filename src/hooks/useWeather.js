import { useState, useEffect } from "react";

const useWeather = (places) => {
  const [fetched, setFetched] = useState({});

  const fetchNew = async (fetched) => {
    const responses = await Promise.allSettled(
      places.map(({ id, latitude, longitude }) =>
        id in fetched
          ? fetched[id]
          : fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FLondon&forecast_days=5`
            )
              .then((res) => (res.ok ? res.json() : { error: true }))
              .then((res) => ({ ...res, id }))
              .catch(() => ({ error: true, id }))
      )
    );

    const data = responses
      .filter(({ status }) => status === "fulfilled")
      .reduce((obj, { value }) => {
        return {
          ...obj,
          [value.id]: value,
        };
      }, {});

    console.log("crazy2", data);
    setFetched(data);
  };

  const refresh = () => {
    fetchNew({});
  };

  useEffect(() => {
    fetchNew(fetched);
  }, [places]);

  return [fetched, refresh];
};

export default useWeather;
