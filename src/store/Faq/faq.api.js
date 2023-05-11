import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const faqApi = createApi({
  reducerPath: '/faq/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getFaq: build.query({
      query: () => ({
        url: `faq`,
      }),
      transformResponse: (response) => response,
      providesTags: (result, error, arg) => [{type: "FAQ", id: arg} , {type: "FAQ", id: "ALL"}],
    }),

    postFaq: build.mutation({
      query(body){
        return {
          url: `faq/`,
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "FAQ", id}, {type: "FAQ", id: "ALL"}],
    }),

    deleteFaq: build.mutation({
      query(id) {
        return {
          url: `faq/${id}/`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "FAQ", id}],
    }),

    updateFaq: build.mutation({
      query({id, body}) {
        return {
          url: `faq/${id}/`,
          method: 'PATCH',
          body: body
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "FAQ", id}, {type: "FAQ", id: "ALL"}, {type: "FAQbyId", id: "ALL"}],
    }),

    getFaqById: build.query({
      query: (id) => ({
        url: `faq/${id}`
      }),
      transformResponse: (response) => response,
      providesTags: (result, error, arg) => [{type: "FAQbyId", id: arg} , {type: "FAQbyId", id: "ALL"}],
    })
  })
})

export const {
  useGetFaqQuery,
  usePostFaqMutation,
  useDeleteFaqMutation,
  useGetFaqByIdQuery,
  useUpdateFaqMutation
} = faqApi
