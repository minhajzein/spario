import apiSlice from "../../../apis/apiSlice";

const adminDashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAdminDashboardData: builder.query({
            query: () => ({
                url: '/admin',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Dashboard']
        }),

    })
})


export const {
    useGetAdminDashboardDataQuery
} = adminDashboardApiSlice