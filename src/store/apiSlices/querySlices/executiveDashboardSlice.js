import apiSlice from "../../../apis/apiSlice";

const executiveDashboardSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getExecutiveDashboardData: builder.query({
            query: (executiveId) => ({
                url: `/executive/dashboard/${executiveId}`,
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
    useGetExecutiveDashboardDataQuery
} = executiveDashboardSlice