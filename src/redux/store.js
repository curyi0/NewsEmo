import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=27e8c257"; const React = __vite__cjsImport0_react.__esModule ? __vite__cjsImport0_react.default : __vite__cjsImport0_react
import { configureStore } from "/node_modules/.vite/deps/@reduxjs_toolkit.js?v=27e8c257"
import company from "/src/redux/reducerSlices/companySlice.js"
import association from "/src/redux/reducerSlices/associationSlice.js"
import companySearch from "/src/redux/reducerSlices/compSearchSlice.js"


const store = configureStore({
    reducer: {
        company,
        association,
        companySearch  // 검색창
    }
});

export default store
