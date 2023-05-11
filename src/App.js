import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {MODES} from "./constants/general";

import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import PaymentsPage from './pages/PaymentsPage/PaymentsPage';
import FaqPage from './pages/FaqPage/FaqPage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import NotificationPage from './pages/NotificationPage/NotificationPage';
import AdminPage from './pages/AdminPage/AdminPage';
import AddPayMethod from './pages/PaymentsPage/AddPayMethod/AddPayMethod';
import ThemeCourse from './pages/TopicsPage/ThemeCourse';
import LessonsCourses from './pages/LessonsPartsPage/LessonsCourses';
import TopicCourse from './pages/CoursesPage/TopicCourse/TopicCourse';
import ThemeInfoPage from "./pages/TopicInfoPage/ThemeInfoPage";
import EditFaq from './pages/FaqPage/EditFaq/EditFaq';
import QuizPage from "./pages/QuizPage/QuizPage";

const App = () => {

  return (
    <Routes>
        <Route element={<AuthPage />} path="/" />
        <Route element={<HomePage />} path="/dashboard" />

        <Route element={<CoursesPage />} path="/dashboard/courses" />
        <Route element={<ThemeCourse />} path="/dashboard/courses/:courseId/theme" />
        <Route element={<ThemeInfoPage />} path="/dashboard/courses/:courseId/theme/:themeId/info" />
        <Route element={<QuizPage />} path="/dashboard/courses/:courseId/theme/:themeId/quiz/:quizId" />
        <Route element={<LessonsCourses />} path="/dashboard/courses/:courseId/theme/:themeId/lessons/:lessonId" />
        <Route element={<TopicCourse />} path="/dashboard/courses/:courseId/theme/:themeId/lessons/:lessonId/topics" />

        <Route element={<PaymentsPage />} path="/dashboard/payments" />
        <Route element={<AddPayMethod />} path="/dashboard/payments/add" />
        <Route element={<AddPayMethod mode={MODES.EDIT} />} path="/dashboard/payments/edit/:subscriptionId" />

        <Route element={<FaqPage />} path="/dashboard/faq" />
        <Route element={<EditFaq />} path="/dashboard/faq/:id" />

        <Route element={<NotificationPage />} path="/dashboard/notification" />

        <Route element={<AdminPage />} path="/dashboard/admin" />
        <Route element={<UserInfoPage />} path="/dashboard/user_info" />
    </Routes>
  );
};

export default App;
