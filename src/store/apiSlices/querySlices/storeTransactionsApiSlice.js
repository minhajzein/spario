import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import apiSlice from "../../../apis/apiSlice"

const storeTransactionsAdapter = createEntityAdapter({})
const initialState = storeTransactionsAdapter.getInitialState()

const storeTransactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStoreTransactions: builder.query({
            query: (storeId) => ({
                url: `/executive/transactions/store/${storeId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedTransaction = await responseData.map(transaction => {
                    transaction.id = transaction._id
                    return transaction
                })
                return storeTransactionsAdapter.setAll(initialState, loadedTransaction)
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


export const selectStoreTransactionResult = (storeId) => storeTransactionsApiSlice.endpoints.getStoreTransactions.select(storeId)


export const makeStoreTransactionsSelectors = storeId => {
    const selectStoresData = createSelector(
        selectStoreTransactionResult(storeId),
        storesResult => storesResult?.data ?? initialState
    );

    return storeTransactionsAdapter.getSelectors(state => selectStoresData(state));
};
