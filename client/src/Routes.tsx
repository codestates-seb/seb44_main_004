import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUp from './pages/User/SignUp';
import SignIn from './pages/User/SignIn';
import MyPage from './pages/MyPage';
import UserPage from './pages/UserPage';
import CurationWritePage from './pages/Curation/CurationWritePage';
import CurationEditPage from './pages/Curation/CurationEditPage';
import CurationDetailPage from './pages/Curation/CurationDetailPage';

export enum RoutePath {
  Root = '/',
  SignUp = '/register',
  SignIn = '/login',
  MyPage = '/mypage',
  UserPage = '/userpage',
  Write = '/write',
  Edit = '/edit',
  Detail = '/detail',
}

const RouteProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path={RoutePath.Root} element={<MainPage />} />
        <Route path={RoutePath.SignUp} element={<SignUp />} />
        <Route path={RoutePath.SignIn} element={<SignIn />} />
        <Route path={RoutePath.MyPage} element={<MyPage />} />
        <Route path={RoutePath.UserPage} element={<UserPage />} />
        <Route path={RoutePath.Write} element={<CurationWritePage />} />
        <Route path={RoutePath.Edit} element={<CurationEditPage />} />
        <Route path={RoutePath.Detail} element={<CurationDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
