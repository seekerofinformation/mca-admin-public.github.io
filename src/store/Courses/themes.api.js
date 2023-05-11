import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const themesApi = createApi({
  reducerPath: '/themes/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getThemes: build.query({
      query: () => ({
        url: `themes`,
      }),
      transformResponse: (response) => response.data.slice(0, 20)
    }),

    deleteThemes: build.mutation({
      query(id) {
        return {
          url: `themes/${id}`,
          method: 'DELETE'
        }
      },
    }),

    postThemes: build.mutation({
      query(body){
        return {
          url: `themes`,
          method: 'POST',
          body: body
        }
      }
    })
  })
})

export const {useDeleteThemesMutation, usePostThemesMutation, useGetThemesQuery} = themesApi
