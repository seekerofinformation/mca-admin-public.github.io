import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const lessonApi = createApi({
  reducerPath: '/lessons/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getLessons: build.query({
      query: () => ({
        url: `lessons`,
      }),
      transformResponse: (response) => response.data.slice(0, 20)
    }),

    deleteLessons: build.mutation({
      query(id) {
        return {
          url: `lessons/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'lessons', id }]
    }),

    postLesson: build.mutation({
      query(body){
        return {
          url: `lessons`,
          method: 'POST',
          body: body
        }
      }
    })
  })
})

export const {useGetLessonsQuery, useDeleteLessonsMutation, usePostLessonMutation} = lessonApi
