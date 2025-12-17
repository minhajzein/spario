import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const invoicesAdapter = createEntityAdapter({})
const initialState = invoicesAdapter.getInitialState()

const invocesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllInvoices: builder.query({
            query: ({ search = '', page = 1, limit = 10 } = {}) => {
                const params = new URLSearchParams()
                params.append('search', search || '')
                params.append('page', page)
                params.append('limit', limit)

                return ({
                    url: `/admin/invoices?${params.toString()}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    }
                })
            },
            transformResponse: async (responseData, meta, args) => {
                if (!responseData || !responseData.invoices) {
                    return {
                        ...invoicesAdapter.setAll(initialState, []),
                        total: 0
                    }
                }
                const loadedInvoices = await responseData.invoices.map(invoice => {
                    invoice.id = invoice._id
                    return invoice
                })
                return {
                    ...invoicesAdapter.setAll(initialState, loadedInvoices),
                    total: responseData.total || 0
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Invoices', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Invoices', id }))
                    ]
                } else return [{
                    type: 'Invoices', id: 'LIST'
                }]
            }
        }),

        createInvoice: builder.mutation({
            query: (credentials) => ({
                url: '/admin/invoices',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Invoices', 'Stores', 'Dashboard', 'Store_Transactions', 'Stores_Executive', 'Executive_Invoices']
        }),

        updateInvoice: builder.mutation({
            query: (credentials) => ({
                url: `/admin/invoices/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Invoices', 'Stores', 'Dashboard', 'Store_Transactions', 'Stores_Executive', 'Executive_Invoices']
        }),

        deleteInvoice: builder.mutation({
            query: (id) => ({
                url: `/admin/invoices/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Invoices', 'Stores', 'Dashboard', 'Store_Transactions', 'Stores_Executive', 'Executive_Invoices']
        })

    })
})

export const {
    useGetAllInvoicesQuery,
    useCreateInvoiceMutation,
    useUpdateInvoiceMutation,
    useDeleteInvoiceMutation
} = invocesApiSlice



export const selectInvoicesResult = (params) => invocesApiSlice.endpoints.getAllInvoices.select(params)

// Helper to get invoices data from the current query or any cache entry
const getInvoicesDataFromState = (state, currentParams = null) => {
    const apiState = state?.apiService
    if (!apiState?.queries) return initialState
    
    // If we have current params, try to find the exact match first
    if (currentParams) {
        const exactMatch = selectInvoicesResult(currentParams)(state)
        if (exactMatch?.data) {
            return exactMatch.data
        }
    }
    
    // Otherwise, find any query result that has invoices data
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0
    
    for (const key of queryKeys) {
        if (key.includes('getAllInvoices')) {
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
export const makeInvoiceSelectors = (currentParams) => {
    const selectInvoicesData = createSelector(
        (state) => getInvoicesDataFromState(state, currentParams),
        (data) => data
    )
    
    return invoicesAdapter.getSelectors(state => selectInvoicesData(state))
}

// Default selectors (for backward compatibility, uses most recent cache)
export const {
    selectAll: selectAllInvoices,
    selectById: selectInvoiceById,
    selectIds: selectInvoiceIds
} = invoicesAdapter.getSelectors(state => getInvoicesDataFromState(state))