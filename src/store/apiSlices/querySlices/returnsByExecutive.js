import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";

const returnAdapter = createEntityAdapter({})
const initialState = returnAdapter.getInitialState()

const returnsByExecutiveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReturnsByExecutive: builder.query({
            query: (executiveId) => ({
                url: `/executive/returns/${executiveId}`,
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
        })
    })
})

export const {
    useGetReturnsByExecutiveQuery
} = returnsByExecutiveApiSlice


export const selectReturnsResult = (executiveId) => returnsByExecutiveApiSlice.endpoints.getReturnsByExecutive.select(executiveId)

export const makeExecutiveReturnsSelectors = executiveId => {
    const selectReturnsData = createSelector(
        selectReturnsResult(executiveId),
        returnsResult => returnsResult?.data ?? initialState
    );

    return returnAdapter.getSelectors(state => selectReturnsData(state));
}