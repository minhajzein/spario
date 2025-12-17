import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const storesAdapter = createEntityAdapter({})
const initialState = storesAdapter.getInitialState()

const storesApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getAllStores: builder.query({
            query: ({ search = '', page = 1, limit = 10 } = {}) => {
                const params = new URLSearchParams()
                params.append('search', search || '')
                params.append('page', page)
                if (limit) params.append('limit', limit)

                return ({
                    url: `/admin/stores?${params.toString()}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    }
                })
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
                        { type: 'Stores', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Stores', id }))
                    ]
                } else return [{
                    type: 'Stores', id: 'LIST'
                }]
            }
        }),

        createStore: builder.mutation({
            query: (credentials) => ({
                url: '/admin/stores',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: [
                { type: 'Stores', id: 'LIST' },
                { type: 'Stores_Executive', id: 'LIST' },
                'Dashboard',
                'Executives'
            ],
        }),

        updateStore: builder.mutation({
            query: (credentials) => ({
                url: `/admin/stores/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Stores', id: 'LIST' },
                { type: 'Stores', id: arg.id },
                { type: 'Stores_Executive', id: 'LIST' },
                'Dashboard',
                'Executives'
            ],
        }),

        deleteStore: builder.mutation({
            query: (id) => ({
                url: `/admin/stores/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Stores', id: 'LIST' },
                { type: 'Stores', id: arg },
                { type: 'Stores_Executive', id: 'LIST' },
                'Dashboard',
                'Executives'
            ],
        })

    })
})

export const {
    useGetAllStoresQuery,
    useCreateStoreMutation,
    useUpdateStoreMutation,
    useDeleteStoreMutation
} = storesApiSlice


export const selectStoresResult = (params) => storesApiSlice.endpoints.getAllStores.select(params)

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

    // Otherwise, find any query result that has stores data
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0

    for (const key of queryKeys) {
        if (key.includes('getAllStores')) {
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
export const makeStoreSelectors = (currentParams) => {
    const selectStoresData = createSelector(
        (state) => getStoresDataFromState(state, currentParams),
        (data) => data
    )

    return storesAdapter.getSelectors(state => selectStoresData(state))
}

// Default selectors (for backward compatibility, uses most recent cache)
export const {
    selectAll: selectAllstores,
    selectById: selectStoreById,
    selectIds: selectStoreIds
} = storesAdapter.getSelectors(state => getStoresDataFromState(state))