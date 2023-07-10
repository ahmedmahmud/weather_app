import { createContext, useContext, useEffect, useReducer } from "react";
import { getJson, storeJson } from "../adapters/storage";

const PlacesContext = createContext(null);
const PlacesDispatchContext = createContext(null);

export const usePlaces = () => {
  return useContext(PlacesContext);
};

export const usePlacesDispatch = () => {
  return useContext(PlacesDispatchContext);
};

export const PlacesProvider = ({ children }) => {
  const [places, dispatch] = useReducer(placesReducer, []);

  useEffect(() => {
    (async () => {
      const places = await getJson("places");
      console.log("loaded", places);
      if (places && places.length) {
        dispatch({
          type: "load",
          places,
        });
      }
    })();
  }, []);

  return (
    <PlacesContext.Provider value={places}>
      <PlacesDispatchContext.Provider value={dispatch}>
        {children}
      </PlacesDispatchContext.Provider>
    </PlacesContext.Provider>
  );
};

const placesReducer = (places, action) => {
  switch (action.type) {
    case "add": {
      const next = [
        ...places.filter((p) => p.id != action.place.id),
        action.place,
      ];
      storeJson("places", next);
      return next;
    }

    case "remove": {
      const next = places.filter((p) => p.id != action.id);
      storeJson("places", next);
      return next;
    }

    case "load":
      return action.places;

    default:
      throw Error(`Unknown action ${action.type}`);
  }
};
