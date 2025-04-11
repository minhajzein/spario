import apiSlice from "../../apis/apiSlice";
import { logout, setToken, setUser } from "../slices/userSlice";

const authApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['User'],
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),
            providesTags: ['User'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                const { user, token } = data
                dispatch(setUser(user))
                dispatch(setToken(token))
            }
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            }),
            invalidatesTags: ['User'],
            async onQueryStarted(arg, { dispatch, queryFulFilled }) {
                await queryFulFilled
                dispatch(logout())
                setTimeout(() => {
                    dispatch(authApiSlice.util.resetApiState())
                }, 1000);
            }
        })

    })
})




export const {
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
} = authApiSlice