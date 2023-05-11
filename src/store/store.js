import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { courseApi } from './Courses/courseName.api';
import { descriptionApi } from './Courses/description.api';
import { lessonApi } from './Courses/lessons.api';
import { themesApi } from './Courses/themes.api';
import { topicsApi } from './Courses/topics.api';
import { courseTitleApi } from "./Courses/courseTitle.api";
import { faqApi } from './Faq/faq.api';
import { notificationApi } from './Notification/notifiaction.api';
import { adminApi } from './Admins/admins.api';

const store = configureStore({
  reducer: {
    [lessonApi.reducerPath]: lessonApi.reducer,
    [descriptionApi.reducerPath]: descriptionApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [courseTitleApi.reducerPath]: courseTitleApi.reducer,
    [themesApi.reducerPath]: themesApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    lessonApi.middleware,
    courseApi.middleware,
    courseTitleApi.middleware,
    descriptionApi.middleware,
    themesApi.middleware,
    topicsApi.middleware,
    faqApi.middleware,
    notificationApi.middleware,
    adminApi.middleware
  )
});

setupListeners(store.dispatch);


export default store;