import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";


const transactionsAdapter = createEntityAdapter({})
const initialState = transactionsAdapter.getInitialState()


const executiveTransactionsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTransactionsByExecutive: builder.query({
            query: (executiveId) => ({
                url: `/executive/transactions/${executiveId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedTransactions = await responseData.map(transaction => {
                    transaction.id = transaction._id
                    return transaction
                })
                return transactionsAdapter.setAll(initialState, loadedTransactions)
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

export const selectExecutiveTransactionResult = (executiveId) => executiveTransactionsSlice.endpoints.getAllTransactionsByExecutive.select(executiveId)


export const makeExecutiveTransactionsSelectors = executiveId => {
    const selectTransactionsData = createSelector(
        selectExecutiveTransactionResult(executiveId),
        transactionsResult => transactionsResult?.data ?? initialState
    );

    return transactionsAdapter.getSelectors(state => selectTransactionsData(state));
}; 