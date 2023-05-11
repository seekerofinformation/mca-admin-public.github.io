import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const descriptionApi = createApi({
  reducerPath: '/desc/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getDesc: build.query({
      query: () => ({
        url: `descs`,
      }),
      transformResponse: (response) => response.data[response.data.length-1]
    }),

    postDesc: build.mutation({
      query(body){
        return {
          url: `descs`,
          method: 'POST',
          body: body,
        }
      }
    })
  })
})

export const {useGetDescQuery, usePostDescMutation} = descriptionApi
