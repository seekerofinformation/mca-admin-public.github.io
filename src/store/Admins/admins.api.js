import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const adminApi = createApi({
  reducerPath: '/admin/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getAdmin: build.query({
      query: () => ({
        url: `admin/`,
      }),
      transformResponse: (response) => response,
      providesTags: (result, error, arg) => [{type: "Admin", id: arg} , {type: "Admin", id: "ALL"}],
    }),

    postAdmin: build.mutation({
      query(body){
        return {
          url: `admin/`,
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Admin", id}, {type: "Admin", id: "ALL"}],
    }),

    deleteAdmin: build.mutation({
      query(id) {
        return {
          url: `admin/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Admin", id}],
    }),

    updateAdmin: build.mutation({
      query({id, body}) {
        console.log(body)
        return {
          url: `admin/${id}/`,
          method: 'PATCH',
          body: body
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Admin", id}, {type: "Admin", id: "ALL"}, {type: "AdminById", id: "ALL"}],
    }),

    getAdminById: build.query({
      query: (id='') => ({
        url: `admin/${id}`
      }),
      transformResponse: (response) => response,
      providesTags: (result, error, arg) => [{type: "AdminById", id: arg} , {type: "AdminById", id: "ALL"}],
    })
  })
})

export const {
  useGetAdminQuery,
  usePostAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
  useGetAdminByIdQuery
} = adminApi
