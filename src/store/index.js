import {configureStore} from '@reduxjs/toolkit'
import countryReducer from './country'
import Mapreducer from './Map'
const store = configureStore({
    reducer: {country: countryReducer, map: Mapreducer}
}
)
export default store