import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../apis/apiSlice";

const returnAdapter = createEntityAdapter({})
const initialState = returnAdapter.getInitialState()


const returnApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllReturns: builder.query({

        }),
        createReturn: builder.mutation({
            query: () => ({
                url: '/executive/return'
            })
        })
    })
})