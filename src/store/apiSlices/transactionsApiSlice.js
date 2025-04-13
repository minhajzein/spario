import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const transactionsAdapter = createEntityAdapter({})
const initialState = transactionsAdapter.getInitialState()

const transactionsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getAllTransactions: builder.query({
            query: () => ({
                url: `/admin/transactions`,
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
        }),

        createTransaction: builder.mutation({
            query: (credentials) => ({
                url: '/executive/transactions',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Dashboard']
        }),

        updateTransaction: builder.mutation({
            query: (credentials) => ({
                url: `/executive/transactions/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Dashboard']
        }),

        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/executive/transactions/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Dashboard']
        })

    })

})

export const {
    useGetAllTransactionsQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation
} = transactionsApiSlice


export const selectTransactionsResult = transactionsApiSlice.endpoints.getAllTransactions.select()

const selectTransactionsData = createSelector(
    selectTransactionsResult,
    transactionsResult => transactionsResult.data
)

export const {
    selectAll: selectAllTransactions,
    selectById: selectTransactionById,
    selectIds: selectTransactionIds
} = transactionsAdapter.getSelectors(state => selectTransactionsData(state) ?? initialState)