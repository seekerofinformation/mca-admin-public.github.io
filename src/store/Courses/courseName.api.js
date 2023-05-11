import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const courseApi = createApi({
  reducerPath: '/courses/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getCourses: build.query({
      query: () => ({
        url: `courses`,
      }),
      transformResponse: (response) => response.data
    }),

    getCourse: build.query({
      query: (id) => ({
        url: `courses/${id}`,
      }),
      transformResponse: (response) => response.data
    }),

    postCourse: build.mutation({
      query(body){
        return {
          url: `courses`,
          method: 'POST',
          body: body
        }
      }
    }),

    deleteCourse: build.mutation({
      query: (id) => ({
          url: `courses/${id}`,
          method: "DELETE"
        }),
    })
  })
})

export const {useGetCoursesQuery, useGetCourseQuery, usePostCourseMutation, useDeleteCourseMutation} = courseApi
