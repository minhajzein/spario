import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";

const invoiceAdapter = createEntityAdapter({})
const initialState = invoiceAdapter.getInitialState()


const executiveInvoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInvoicesByExecutive: builder.query({
            query: ({ executiveId, search = '', page = 1, limit = 10 }) => {
                const params = new URLSearchParams()
                params.append('search', search || '')
                params.append('page', page)
                if (limit) params.append('limit', limit)

                return ({
                    url: `/executive/invoices/${executiveId}?${params.toString()}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    }
                })
            },
            transformResponse: async (responseData, meta, args) => {
                if (!responseData || !responseData.invoices) {
                    return {
                        ...invoiceAdapter.setAll(initialState, []),
                        total: 0
                    }
                }
                const loadedInvoices = await responseData.invoices.map(invoice => {
                    invoice.id = invoice._id
                    return invoice
                })
                return {
                    ...invoiceAdapter.setAll(initialState, loadedInvoices),
                    total: responseData.total || 0
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Executive_Invoices', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Executive_Invoices', id }))
                    ]
                } else return [{
                    type: 'Executive_Invoices', id: 'LIST'
                }]
            }
        })
    })
})


export const {
    useGetInvoicesByExecutiveQuery
} = executiveInvoicesApiSlice

export const selectInvoicesResult = (params) => executiveInvoicesApiSlice.endpoints.getInvoicesByExecutive.select(params)

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
    
    // Otherwise, find any query result that has invoices data for this executive
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0
    
    for (const key of queryKeys) {
        if (key.includes('getInvoicesByExecutive')) {
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

export const makeExecutiveInvoicesSelectors = (params) => {
    const selectInvoicesData = createSelector(
        (state) => getInvoicesDataFromState(state, params),
        (data) => data
    );

    return invoiceAdapter.getSelectors(state => selectInvoicesData(state));
}