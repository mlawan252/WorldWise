import { createContext, useEffect, useContext, useReducer } from "react";

const citiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payLoad };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payLoad };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payLoad };
    default:
      throw new Error("Unknown action");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({ type: "rejected", payLoad: "There was an error loading" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payLoad: data });
    } catch (err) {
      dispatch({ type: "rejected", payLoad: err.message });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch (err) {
      dispatch({ type: "rejected", payLoad: err.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payLoad: id });
    } catch (err) {
      dispatch({ type: "rejected", payLoad: err.message });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined) throw new Error("Context Out of Reach");
  return context;
}
export { CitiesProvider, useCities };
