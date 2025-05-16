import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";


const transactionsAdapter = createEntityAdapter({})
const initialState = transactionsAdapter.getInitialState()


const executiveTransactionsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTransactionsByExecutive: builder.query({
            query: ({ executiveId, store = '', date = '', fromDate = '', toDate = '', type = '' }) => {
                const params = new URLSearchParams({ store, date, fromDate, toDate, type }).toString();
                return {
                    url: `/executive/transactions/${executiveId}?${params}`,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError;
                    }
                }
            },
            transformResponse: (responseData, meta, args) => {
                const loadedTransactions = responseData?.map(transaction => {
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

export const selectExecutiveTransactionResult = (params) => executiveTransactionsSlice.endpoints.getAllTransactionsByExecutive.select(params)


export const makeExecutiveTransactionsSelectors = (params) => {
    const selectTransactionsData = createSelector(
        selectExecutiveTransactionResult(params),
        transactionsResult => transactionsResult?.data ?? initialState
    );

    return transactionsAdapter.getSelectors(state => selectTransactionsData(state));
}; 