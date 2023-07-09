import { createContext, useContext, useReducer } from "react";

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

  return (
    <PlacesContext.Provider value={places}>
      <PlacesDispatchContext.Provider value={dispatch}>
        { children }
      </PlacesDispatchContext.Provider>
    </PlacesContext.Provider>
  )
};

const placesReducer = (places, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...(places.filter(p => p.id != action.place.id)),
        action.place
      ]

    case 'remove':
      return places.filter(p => p.id != action.id);

    default:
      throw Error(`Unknown action ${action.type}`);

  }
};
