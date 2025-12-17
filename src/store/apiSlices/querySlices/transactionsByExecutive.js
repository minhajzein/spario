import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";


const transactionsAdapter = createEntityAdapter({})
const initialState = transactionsAdapter.getInitialState()


const executiveTransactionsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTransactionsByExecutive: builder.query({
            query: ({ executiveId, store = '', date = '', fromDate = '', toDate = '', type = '', search = '', page = '', limit = '' }) => {
                const params = new URLSearchParams()
                if (store) params.append('store', store)
                if (date) params.append('date', date)
                if (fromDate) params.append('fromDate', fromDate)
                if (toDate) params.append('toDate', toDate)
                if (type) params.append('type', type)
                params.append('search', search || '')
                if (page) params.append('page', page)
                if (limit) params.append('limit', limit)
                
                return {
                    url: `/executive/transactions/${executiveId}?${params.toString()}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError;
                    }
                }
            },
            transformResponse: (responseData, meta, args) => {
                const loadedTransactions = responseData?.transactions?.map(transaction => {
                    transaction.id = transaction._id
                    return transaction
                })
                return {
                    ...transactionsAdapter.setAll(initialState, loadedTransactions),
                    total: responseData.total
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Transactions', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Transactions', id }))
                    ]
                } else return [{
                    type: 'Transactions', id: 'LIST'
                }]
            }
        })
    })
})

export const {
    useGetAllTransactionsByExecutiveQuery
} = executiveTransactionsSlice

export default executiveTransactionsSlice

export const selectExecutiveTransactionResult = (params) => executiveTransactionsSlice.endpoints.getAllTransactionsByExecutive.select(params)

// Helper to get transactions data from the current query or any cache entry
const getTransactionsDataFromState = (state, currentParams = null) => {
    const apiState = state?.apiService
    if (!apiState?.queries) return initialState
    
    // If we have current params, try to find the exact match first
    if (currentParams) {
        const exactMatch = selectExecutiveTransactionResult(currentParams)(state)
        if (exactMatch?.data) {
            return exactMatch.data
        }
    }
    
    // Otherwise, find any query result that has transactions data for this executive
    const queryKeys = Object.keys(apiState.queries)
    let latestData = null
    let latestTimestamp = 0
    
    for (const key of queryKeys) {
        if (key.includes('getAllTransactionsByExecutive')) {
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

export const makeExecutiveTransactionsSelectors = (params) => {
    const selectTransactionsData = createSelector(
        (state) => getTransactionsDataFromState(state, params),
        (data) => data
    );

    return transactionsAdapter.getSelectors(state => selectTransactionsData(state));
}; 