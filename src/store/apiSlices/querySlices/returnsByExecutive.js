import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";

const returnAdapter = createEntityAdapter({})
const initialState = returnAdapter.getInitialState()

const returnsByExecutiveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReturnsByExecutive: builder.query({
            query: ({ executiveId, search = '', page = 1, limit = 10 }) => {
                const params = new URLSearchParams()
                params.append('search', search || '')
                params.append('page', page)
                if (limit) params.append('limit', limit)

                return ({
                    url: `/executive/returns/${executiveId}?${params.toString()}`,
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
        })
    })
})

export const {
    useGetReturnsByExecutiveQuery
} = returnsByExecutiveApiSlice


export const selectReturnsResult = (params) => returnsByExecutiveApiSlice.endpoints.getReturnsByExecutive.select(params)

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
    
    // Otherwise, find any query result that has returns data for this executive
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0
    
    for (const key of queryKeys) {
        if (key.includes('getReturnsByExecutive')) {
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

export const makeExecutiveReturnsSelectors = (params) => {
    const selectReturnsData = createSelector(
        (state) => getReturnsDataFromState(state, params),
        (data) => data
    );

    return returnAdapter.getSelectors(state => selectReturnsData(state));
}