import { configureStore } from '@reduxjs/toolkit'
import company from './reducerSlices/companySlice'
import association from './reducerSlices/associationSlice'
import news from './reducerSlices/newsSlice'
import companySearch from './reducerSlices/companySearchSlice'
import authReducer from '@features/auth/store/authSlice'
import userReducer from '@features/user/store/userSlice'

const store = configureStore({
    reducer: {
        company,
        association,
        companySearch,
        news,
        auth: authReducer,
        user: userReducer
        // info
    }
});

export default store
