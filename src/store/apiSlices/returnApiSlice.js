import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const returnAdapter = createEntityAdapter({})
const initialState = returnAdapter.getInitialState()


const returnApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllReturns: builder.query({
            query: ({ search = '', page = 1, limit = 10 } = {}) => {
                const params = new URLSearchParams()
                params.append('search', search || '')
                params.append('page', page)
                params.append('limit', limit)

                return ({
                    url: `/executive/returns?${params.toString()}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    }
                })
            },
            transformResponse: async (responseData, meta, args) => {
                if (!responseData || !responseData.returns) {
                    return {
                        ...returnAdapter.setAll(initialState, []),
                        total: 0
                    }
                }
                const loadedReturns = await responseData.returns.map(returns => {
                    returns.id = returns._id
                    return returns
                })
                return {
                    ...returnAdapter.setAll(initialState, loadedReturns),
                    total: responseData.total || 0
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Returns', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Returns', id }))
                    ]
                } else return [{
                    type: 'Returns', id: 'LIST'
                }]
            }
        }),

        createReturn: builder.mutation({
            query: (credentials) => ({
                url: '/executive/returns',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Dashboard', 'Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Returns']
        }),

        updateReturn: builder.mutation({
            query: (credentials) => ({
                url: `/executive/returns/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Dashboard', 'Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Returns']
        }),

        deleteReturn: builder.mutation({
            query: (id) => ({
                url: `/executive/returns/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Dashboard', 'Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Returns']
        })

    })
})


export const {
    useGetAllReturnsQuery,
    useCreateReturnMutation,
    useUpdateReturnMutation,
    useDeleteReturnMutation
} = returnApiSlice


export const selectReturnsResult = (params) => returnApiSlice.endpoints.getAllReturns.select(params)

// Helper to get returns data from the current query or any cache entry
const getReturnsDataFromState = (state, currentParams = null) => {
    const apiState = state?.apiService
    if (!apiState?.queries) return initialState
    
    // If we have current params, try to find the exact match first
    if (currentParams) {
        const exactMatch = selectReturnsResult(currentParams)(state)
        if (exactMatch?.data) {
            return exactMatch.data
        }
    }
    
    // Otherwise, find any query result that has returns data
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0
    
    for (const key of queryKeys) {
        if (key.includes('getAllReturns')) {
            const queryResult = apiState.queries[key]
            if (queryResult?.data && queryResult?.fulfilledTimeStamp) {
                if (queryResult.fulfilledTimeStamp > latestTimestamp) {
                    latestTimestamp = queryResult.fulfilledTimeStamp
                    latestData = queryResult.data
                }
            }
        }
    }
    
    return latestData || initialState
}

// Create a selector factory that accepts current query params
export const makeReturnSelectors = (currentParams) => {
    const selectReturnsData = createSelector(
        (state) => getReturnsDataFromState(state, currentParams),
        (data) => data
    )
    
    return returnAdapter.getSelectors(state => selectReturnsData(state))
}

// Default selectors (for backward compatibility, uses most recent cache)
export const {
    selectAll: selectAllReturns,
    selectById: selectReturnById,
    selectIds: selectReturnIds
} = returnAdapter.getSelectors(state => getReturnsDataFromState(state))