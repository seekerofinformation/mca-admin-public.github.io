import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const topicsApi = createApi({
  reducerPath: '/topics/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getTopic: build.query({
      query: () => ({
        url: `topics`,
      }),
      transformResponse: (response) => response.data.slice(0, 20)
    }),

    deleteTopic: build.mutation({
      query(id) {
        return {
          url: `topics/${id}`,
          method: 'DELETE'
        }
      },
    }),

    postTopic: build.mutation({
      query(body){
        return {
          url: `topics`,
          method: 'POST',
          body: body
        }
      }
    })
  })
})

export const {useDeleteTopicMutation, useGetTopicQuery, usePostTopicMutation} = topicsApi
