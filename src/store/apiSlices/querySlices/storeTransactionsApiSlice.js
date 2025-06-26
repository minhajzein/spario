import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import apiSlice from "../../../apis/apiSlice"

const storeTransactionsAdapter = createEntityAdapter({})
const initialState = storeTransactionsAdapter.getInitialState()

const storeTransactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStoreTransactions: builder.query({
            query: ({ id, store = '', date = '', fromDate = '', toDate = '', page = '', limit = '' }) => {
                const params = new URLSearchParams({ store, date, fromDate, toDate, page, limit }).toString();
                return {
                    url: `/executive/transactions/store/${id}?${params}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    }
                }
            },
            transformResponse: async (responseData, meta, args) => {
                const loadedTransactions = responseData?.transactions?.map(transaction => {
                    transaction.id = transaction._id
                    return transaction
                })
                return {
                    ...storeTransactionsAdapter.setAll(initialState, loadedTransactions),
                    total: responseData.total
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Store_Transactions', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Store_Transactions', id }))
                    ]
                } else return [{
                    type: 'Store_Transactions', id: 'LIST'
                }]
            }
        })
    })
})

export const {
    useGetStoreTransactionsQuery,
    useLazyGetStoreTransactionsQuery
} = storeTransactionsApiSlice


export const selectStoreTransactionResult = (params) => storeTransactionsApiSlice.endpoints.getStoreTransactions.select(params)


export const makeStoreTransactionsSelectors = params => {
    const selectStoresData = createSelector(
        selectStoreTransactionResult(params),
        storesResult => storesResult?.data ?? initialState
    );

    return storeTransactionsAdapter.getSelectors(state => selectStoresData(state));
};
