import styles from "./CityList.module.css"
import Spinner from "../Spinner/Spinner"
import CityItem from "../CityItem/CityItem"
import Message from "../Message/Message"  
import { useCities } from "../../contexts/CitiesContext"
export default function CityList(){
    const {cities, isLoading} = useCities()
    if(isLoading) return <Spinner />
    if(!cities.length) return <Message message="Please add a city you visit"/>
    return(
        <ul className={styles.cityList}>
            {cities.map(city=><CityItem key={city.id} cityItem={city} />)}
        </ul>
    )
}