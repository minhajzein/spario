import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../../apis/apiSlice";

const invoiceAdapter = createEntityAdapter({})
const initialState = invoiceAdapter.getInitialState()


const executiveInvoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInvoicesByExecutive: builder.query({
            query: (executiveId) => ({
                url: `/executive/invoices/${executiveId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: async (responseData, meta, args) => {
                const loadedInvoices = await responseData.map(store => {
                    store.id = store._id
                    return store
                })
                return storesAdapter.setAll(initialState, loadedInvoices)
            },
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Executive_Invoices', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Executive_Invoices', id }))
                    ]
                } else return [{
                    type: 'Executive_Invoices', id: 'LIST'
                }]
            }
        })
    })
})


export const {
    useGetInvoicesByExecutiveQuery
} = executiveInvoicesApiSlice

export const selectInvoicesResult = (executiveId) => executiveInvoicesApiSlice.endpoints.getInvoicesByExecutive.select(executiveId)

export const makeExecutiveInvoicesSelectors = executiveId => {
    const selectInvoicesData = createSelector(
        selectInvoicesResult(executiveId),
        invoicesResult => invoicesResult?.data ?? initialState
    );

    return invoiceAdapter.getSelectors(state => selectInvoicesData(state));
}