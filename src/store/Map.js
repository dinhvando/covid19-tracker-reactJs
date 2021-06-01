import {createSlice} from '@reduxjs/toolkit'

const mapSlice = createSlice({
    name: 'map',
    initialState: {mapCenter: [21,105.8], mapZoom: 5, caseType: 'cases'},
    reducers:{
        changeCaseType (state,action){
            state.caseType = action.payload
        },
        setCenter(state,action){
            state.mapCenter = action.payload
        }
    }

})

export default mapSlice.reducer
export const {changeCaseType, setCenter} = mapSlice.actions