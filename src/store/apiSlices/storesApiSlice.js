import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const storesAdapter = createEntityAdapter({})
const initialState = storesAdapter.getInitialState()

const storesApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getAllStores: builder.query({
            query: () => ({
                url: '/admin/stores',
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
                        { type: 'Stores', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Stores', id }))
                    ]
                } else return [{
                    type: 'Stores', id: 'LIST'
                }]
            }
        }),

        createStore: builder.mutation({
            query: (credentials) => ({
                url: '/admin/stores',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Stores', 'Dashboard', 'Executives'],
        }),

        updateStore: builder.mutation({
            query: (credentials) => ({
                url: `/admin/stores/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Stores', 'Dashboard', 'Executives'],
        }),

        deleteStore: builder.mutation({
            query: (id) => ({
                url: `/admin/stores/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Stores', 'Dashboard', 'Executives'],
        })

    })
})

export const {
    useGetAllStoresQuery,
    useCreateStoreMutation,
    useUpdateStoreMutation,
    useDeleteStoreMutation
} = storesApiSlice


export const selectStoresResult = storesApiSlice.endpoints.getAllStores.select()

const selectStoresData = createSelector(
    selectStoresResult,
    storesResult => storesResult.data
)

export const {
    selectAll: selectAllstores,
    selectById: selectStoreById,
    selectIds: selectStoreIds
} = storesAdapter.getSelectors(state => selectStoresData(state) ?? initialState)