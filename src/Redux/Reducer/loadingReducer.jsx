import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    display: 'none'
}
const loadingReducer = createSlice({
    name: 'loadingReducer',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.display = action.payload
        }
    }
});
export const { setLoading } = loadingReducer.actions
export default loadingReducer.reducer