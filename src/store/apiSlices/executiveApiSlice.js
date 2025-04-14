import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const executivesAdapter = createEntityAdapter({})
const initialState = executivesAdapter.getInitialState()

const executiveApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getAllExecutives: builder.query({
            query: () => ({
                url: '/admin/executives',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedExecutives = await responseData.map(exec => {
                    exec.id = exec._id
                    return exec
                })
                return executivesAdapter.setAll(initialState, loadedExecutives)
            },
            keepUnusedDataFor: Number.MAX_VALUE,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Executives', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Executives', id }))
                    ]
                } else return [{
                    type: 'Executives', id: 'LIST'
                }]
            }
        }),

        getExecutivesByRoute: builder.query({
            query: (route) => ({
                url: `/admin/executives/${route}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Route_Executives']
        }),

        createExecutive: builder.mutation({
            query: (credentials) => ({
                url: '/admin/executives',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Executives']
        }),

        updateExecutive: builder.mutation({
            query: (credentials) => ({
                url: `/admin/executives/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Executives']
        }),

        deleteExecutive: builder.mutation({
            query: (id) => ({
                url: `/admin/executives/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Executives']
        })

    })
})

export const {
    useGetAllExecutivesQuery,
    useCreateExecutiveMutation,
    useUpdateExecutiveMutation,
    useDeleteExecutiveMutation
} = executiveApiSlice


export const selectExecutivesResult = executiveApiSlice.endpoints.getAllExecutives.select()

const selectExecutivesData = createSelector(
    selectExecutivesResult,
    executivesResult => executivesResult.data
)

export const {
    selectAll: selectAllExecutives,
    selectById: selectExecutiveById,
    selectIds: selectExecutivesIds
} = executivesAdapter.getSelectors(state => selectExecutivesData(state) ?? initialState)