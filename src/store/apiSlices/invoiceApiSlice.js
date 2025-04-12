import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const invoicesAdapter = createEntityAdapter({})
const initialState = invoicesAdapter.getInitialState()

const invocesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllInvoices: builder.query({
            query: () => ({
                url: '/admin/invoices',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedInvoices = await responseData.map(invoice => {
                    invoice.id = invoice._id
                    return invoice
                })
                return invoicesAdapter.setAll(initialState, loadedInvoices)
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Invoices', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Invoices', id }))
                    ]
                } else return [{
                    type: 'Invoices', id: 'LIST'
                }]
            }
        }),

        createInvoice: builder.mutation({
            query: (credentials) => ({
                url: '/admin/invoices',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Invoices', 'Stores', 'Dashboard']
        }),

        updateInvoice: builder.mutation({
            query: (credentials) => ({
                url: `/admin/invoices/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Invoices', 'Stores', 'Dashboard']
        }),

        deleteInvoice: builder.mutation({
            query: (id) => ({
                url: `/admin/invoices/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Invoices', 'Stores', 'Dashboard']
        })

    })
})

export const {
    useGetAllInvoicesQuery,
    useCreateInvoiceMutation,
    useUpdateInvoiceMutation,
    useDeleteInvoiceMutation
} = invocesApiSlice



export const selectInvoicesResult = invocesApiSlice.endpoints.getAllInvoices.select()

const selectInvoicesData = createSelector(
    selectInvoicesResult,
    invoicesResult => invoicesResult.data
)

export const {
    selectAll: selectAllInvoices,
    selectById: selectInvoiceById,
    selectIds: selectInvoiceIds
} = invoicesAdapter.getSelectors(state => selectInvoicesData(state) ?? initialState)