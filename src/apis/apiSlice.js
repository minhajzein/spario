import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUri from "../config/baseUri";
import { setUser } from "../store/slices/userSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: baseUri,
    credentials: 'include',
    timeout: 15000,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Accept', 'application/json');
        headers.set('Cache-Control', 'no-cache');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        const token = getState().user.token
        if (token) {
            headers.set("authorized", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        if (refreshResult?.data) {
            api.dispatch(setUser({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired"
            }
            return refreshResult
        }
    }
    return result

}

const apiSlice = createApi({
    reducerPath: 'apiService',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'User',
        'Executives',
        'Stores',
        'Invoices',
        'Transactions',
        'Routes',
        'Dashboard',
        'Store_Transactions',
        'Route_Executives',
        'Stores_Executive',
        'Executive_Invoices'
    ],
    endpoints: builder => ({})
})



export default apiSlice