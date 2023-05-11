import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const courseTitleApi = createApi({
    reducerPath: '/coursetitle/',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        getCoursesTitle: build.query({
            query: () => ({
                url: `coursetitle`,
            }),
            transformResponse: (response) => response.data
        }),

        getCourseTitle: build.query({
            query: (id) => ({
                url: `coursetitle/${id}`,
            }),
            transformResponse: (response) => response.data
        }),

        postCourseTitle: build.mutation({
            query(body){
                return {
                    url: `coursetitle`,
                    method: 'POST',
                    body: body
                }
            }
        }),

        deleteCourseTitle: build.mutation({
            query: (id) => ({
                url: `coursetitle/${id}`,
                method: "DELETE"
            }),
        })
    })
})

export const {useGetCoursesTitleQuery, useGetCourseTitleQuery, usePostCourseTitleMutation, useDeleteCourseTitleMutation} = courseTitleApi
