import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";


const storesAdapter = createEntityAdapter({})
const initialState = storesAdapter.getInitialState()

const executiveStoresApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getAllStoresByExecutive: builder.query({
            query: (executiveId) => ({
                url: `/executive/stores/${executiveId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedStores = await responseData.map(store => {
                    store.id = store._id
                    return store
                })
                return storesAdapter.setAll(initialState, loadedStores)
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Stores_Executive', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Stores_Executive', id }))
                    ]
                } else return [{
                    type: 'Stores_Executive', id: 'LIST'
                }]
            }
        }),
    })
})

export const {
    useGetAllStoresByExecutiveQuery
} = executiveStoresApiSlice


export const selectStoresResult = (executiveId) => executiveStoresApiSlice.endpoints.getAllStoresByExecutive.select(executiveId)


export const makeExecutiveStoreSelectors = executiveId => {
    const selectStoresData = createSelector(
        selectStoresResult(executiveId),
        storesResult => storesResult?.data ?? initialState
    );

    return storesAdapter.getSelectors(state => selectStoresData(state));
};
