import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const executivesAdapter = createEntityAdapter({})
const initialState = executivesAdapter.getInitialState()

const executiveApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getAllExecutives: builder.query({
            query: ({ search = '', page = 1, limit = 10 } = {}) => {
                const params = new URLSearchParams()
                if (search) params.append('search', search)
                if (page) params.append('page', page)
                if (limit) params.append('limit', limit)

                return ({
                    url: `/admin/executives?${params.toString()}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    }
                })
            },
            transformResponse: async (responseData, meta, args) => {
                if (!responseData || !responseData.executives) {
                    return {
                        ...executivesAdapter.setAll(initialState, []),
                        total: 0
                    }
                }
                const loadedExecutives = await responseData.executives.map(exec => {
                    exec.id = exec._id
                    return exec
                })
                return {
                    ...executivesAdapter.setAll(initialState, loadedExecutives),
                    total: responseData.total || 0
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Executives', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Executives', id }))
                    ]
                } else return [{
                    type: 'Executives', id: 'LIST'
                }]
            }
        }),

        getExecutivesByRoute: builder.query({
            query: (route) => ({
                url: `/admin/executives/${route}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Route_Executives']
        }),

        getExecutiveById: builder.query({
            query: (id) => ({
                url: `/admin/executives/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                return [{ type: 'Executives', id: arg }]
            }
        }),

        createExecutive: builder.mutation({
            query: (credentials) => ({
                url: '/admin/executives',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Executives']
        }),

        updateExecutive: builder.mutation({
            query: (credentials) => ({
                url: `/admin/executives/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Executives']
        }),

        deleteExecutive: builder.mutation({
            query: (id) => ({
                url: `/admin/executives/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Executives']
        }),

        changeStatus: builder.mutation({
            query: (credentials) => ({
                url: `/admin/executives/${credentials.id}`,
                method: 'PATCH',
                body: { ...credentials }
            }),
            invalidatesTags: ['Executives']
        })

    })
})

export const {
    useGetAllExecutivesQuery,
    useGetExecutiveByIdQuery,
    useCreateExecutiveMutation,
    useUpdateExecutiveMutation,
    useDeleteExecutiveMutation,
    useChangeStatusMutation
} = executiveApiSlice


export const selectExecutivesResult = (params) => executiveApiSlice.endpoints.getAllExecutives.select(params)

// Helper to get executives data from the current query or any cache entry
const getExecutivesDataFromState = (state, currentParams = null) => {
    const apiState = state?.apiService
    if (!apiState?.queries) return initialState
    
    // If we have current params, try to find the exact match first
    if (currentParams) {
        const exactMatch = selectExecutivesResult(currentParams)(state)
        if (exactMatch?.data) {
            return exactMatch.data
        }
    }
    
    // Otherwise, find any query result that has executives data
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0
    
    for (const key of queryKeys) {
        if (key.includes('getAllExecutives')) {
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
export const makeExecutiveSelectors = (currentParams) => {
    const selectExecutivesData = createSelector(
        (state) => getExecutivesDataFromState(state, currentParams),
        (data) => data
    )
    
    return executivesAdapter.getSelectors(state => selectExecutivesData(state))
}

// Default selectors (for backward compatibility, uses most recent cache)
export const {
    selectAll: selectAllExecutives,
    selectById: selectExecutiveById,
    selectIds: selectExecutivesIds
} = executivesAdapter.getSelectors(state => getExecutivesDataFromState(state))