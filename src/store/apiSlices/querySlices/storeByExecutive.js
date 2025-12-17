import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";


const storesAdapter = createEntityAdapter({})
const initialState = storesAdapter.getInitialState()

const executiveStoresApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getAllStoresByExecutive: builder.query({
            query: ({ executiveId, search = '', page = 1, limit } = {}) => {
                const params = new URLSearchParams()
                params.append('search', search || '')
                params.append('page', page)
                if (limit) params.append('limit', limit)

                return {
                    url: `/executive/stores/${executiveId}?${params.toString()}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    }
                }
            },
            transformResponse: async (responseData, meta, args) => {
                if (!responseData || !responseData.stores) {
                    return {
                        ...storesAdapter.setAll(initialState, []),
                        total: 0
                    }
                }
                const loadedStores = await responseData.stores.map(store => {
                    store.id = store._id
                    return store
                })
                return {
                    ...storesAdapter.setAll(initialState, loadedStores),
                    total: responseData.total || 0
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Stores_Executive', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Stores_Executive', id }))
                    ]
                } else return [{
                    type: 'Stores_Executive', id: 'LIST'
                }]
            }
        }),
    })
})

export const {
    useGetAllStoresByExecutiveQuery
} = executiveStoresApiSlice


export const selectStoresResult = (params) => executiveStoresApiSlice.endpoints.getAllStoresByExecutive.select(params)

// Helper to get stores data from the current query or any cache entry
const getStoresDataFromState = (state, currentParams = null) => {
    const apiState = state?.apiService
    if (!apiState?.queries) return initialState
    
    // If we have current params, try to find the exact match first
    if (currentParams) {
        const exactMatch = selectStoresResult(currentParams)(state)
        if (exactMatch?.data) {
            return exactMatch.data
        }
    }
    
    // Otherwise, find any query result that has stores data for this executive
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0
    
    for (const key of queryKeys) {
        if (key.includes('getAllStoresByExecutive')) {
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

export const makeExecutiveStoreSelectors = (params) => {
    const selectStoresData = createSelector(
        (state) => getStoresDataFromState(state, params),
        (data) => data
    );

    return storesAdapter.getSelectors(state => selectStoresData(state));
};
