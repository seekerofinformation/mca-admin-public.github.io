import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../api/baseUrl';

export const notificationApi = createApi({
  reducerPath: '/notification/',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getNotification: build.query({
      query: () => ({
        url: `notifications`,
      }),
      transformResponse: (response) => response,
      providesTags: (result, error, arg) => [{type: "Notifications", id: arg} , {type: "Notifications", id: "ALL"}],
    }),

    postNotification: build.mutation({
      query(body){
        return {
          url: `notifications/`,
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Notifications", id}, {type: "Notifications", id: "ALL"}],
    }),

    deleteNotification: build.mutation({
      query(id) {
        return {
          url: `notifications/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Notifications", id}],
    }),

    updateNotification: build.mutation({
      query({id, body}) {
        return {
          url: `notifications/${id}/`,
          method: 'PATCH',
          body: body
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Notifications", id}, {type: "Notifications", id: "ALL"}, {type: "NotificationsById", id: "ALL"}],
    }),

    getNotificationById: build.query({
      query: (id) => ({
        url: `notifications/${id}`
      }),
      transformResponse: (response) => response,
      providesTags: (result, error, arg) => [{type: "NotificationsById", id: arg} , {type: "NotificationsById", id: "ALL"}],
    })
  })
})

export const {
  useGetNotificationQuery,
  usePostNotificationMutation,
  useDeleteNotificationMutation,
  useUpdateNotificationMutation,
  useGetNotificationByIdQuery
} = notificationApi
