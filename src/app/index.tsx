/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import DashboardLayout from 'layouts/dashboard';
import { useTranslation } from 'react-i18next';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { DashboardAppPage } from './pages/DashboardAppPage/Loadable';
import { SettingPage } from './pages/SettingPage/Loadable';
import SimpleLayout from 'layouts/simple/SimpleLayout';
import { LoginPage } from './pages/LoginPage/Loadable';
import { ListProjectPage } from './pages/ListProjectPage/Loadable';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="" element={<Navigate to="app" />} />
          <Route path="app" element={<DashboardAppPage />} />
          <Route path="projects" element={<ListProjectPage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>
        <Route path="/" element={<SimpleLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
