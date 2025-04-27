import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const returnAdapter = createEntityAdapter({})
const initialState = returnAdapter.getInitialState()


const returnApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllReturns: builder.query({
            query: () => ({
                url: '/executive/returns',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedReturns = await responseData.map(returns => {
                    returns.id = returns._id
                    return returns
                })
                return returnAdapter.setAll(initialState, loadedReturns)
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Returns', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Returns', id }))
                    ]
                } else return [{
                    type: 'Returns', id: 'LIST'
                }]
            }
        }),

        createReturn: builder.mutation({
            query: (credentials) => ({
                url: '/executive/returns',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Dashboard', 'Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Returns']
        }),

        updateReturn: builder.mutation({
            query: (credentials) => ({
                url: `/executive/returns/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Dashboard', 'Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Returns']
        }),

        deleteReturn: builder.mutation({
            query: (id) => ({
                url: `/executive/returns/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Dashboard', 'Transactions', 'Store', 'Store_Transactions', 'Stores_Executive', 'Returns']
        })

    })
})


export const {
    useGetAllReturnsQuery,
    useCreateReturnMutation,
    useUpdateReturnMutation,
    useDeleteReturnMutation
} = returnApiSlice


export const selectReturnsResult = returnApiSlice.endpoints.getAllReturns.select()

const selectReturnsData = createSelector(
    selectReturnsResult,
    returnsResult => returnsResult.data
)

export const {
    selectAll: selectAllReturns,
    selectById: selectReturnById,
    selectIds: selectReturnIds
} = returnAdapter.getSelectors(state => selectReturnsData(state) ?? initialState)