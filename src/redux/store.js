import { configureStore } from '@reduxjs/toolkit'
import company from './reducerSlices/companySlice'
import association from './reducerSlices/associationSlice'
import news from './reducerSlices/newsSlice'
import companySearch from './reducerSlices/companySearchSlice'

const store = configureStore({
    reducer: {
        company,
        association,
        companySearch,
        news,
        // info
    }
});

export default store
