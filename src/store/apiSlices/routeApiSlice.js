import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const routesAdapter = createEntityAdapter({})
const initialState = routesAdapter.getInitialState()

const routeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllRoutes: builder.query({
            query: () => ({
                url: '/admin/routes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedRoutes = await responseData.map(exec => {
                    exec.id = exec._id
                    return exec
                })
                return routesAdapter.setAll(initialState, loadedRoutes)
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Routes', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Routes', id }))
                    ]
                } else return [{
                    type: 'Routes', id: 'LIST'
                }]
            }
        }),

        createRoute: builder.mutation({
            query: (credentials) => ({
                url: '/admin/routes',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Routes']
        }),

        updateRoute: builder.mutation({
            query: (credentials) => ({
                url: `/admin/routes/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Routes']
        }),

        deleteRoute: builder.mutation({
            query: (id) => ({
                url: `/admin/routes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Routes']
        })

    })
})


export const {
    useGetAllRoutesQuery,
    useCreateRouteMutation,
    useUpdateRouteMutation,
    useDeleteRouteMutation
} = routeApiSlice


export const selectRoutesResult = routeApiSlice.endpoints.getAllRoutes.select()

const selectRoutesData = createSelector(
    selectRoutesResult,
    routesResult => routesResult.data
)

export const {
    selectAll: selectAllRoutes,
    selectById: selectRouteById,
    selectIds: selectRouteIds
} = routesAdapter.getSelectors(state => selectRoutesData(state) ?? initialState)