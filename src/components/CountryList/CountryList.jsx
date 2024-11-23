import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";

import styles from "./CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext";
export default function CountryList() {
  const {cities, isLoading}=useCities()
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Please add a city you visit" />;
  // const countries =cities.map(city=>city.country).filter((value, index, self)=>self.indexOf(value) === index)
  const countries = cities.reduce((acc, curCity) => {
    if (!acc.map((el) => el.country).includes(curCity.country))
      return [...acc, { country: curCity.country, emoji: curCity.emoji }];
    else return acc
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}
