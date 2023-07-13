import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUp from './pages/User/SignUp';
import SignIn from './pages/User/SignIn';
import MyPage from './pages/User/MyPage';
import UserPage from './pages/User/UserPage';
import CurationWritePage from './pages/Curation/CurationWritePage';
import CurationEditPage from './pages/Curation/CurationEditPage';
import CurationDetailPage from './pages/Curation/CurationDetailPage';
import BestCuration from './pages/ExamBestCuration';
import NewCuration from './pages/ExamNewCuration';

export enum RoutePath {
  Root = '/',
  SignUp = '/register',
  SignIn = '/login',
  MyPage = '/mypage',
  UserPage = '/userpage/:memberId',
  Write = '/write',
  Edit = '/edit/:curationId',
  Detail = '/curations/:curationId',
  BestCuration = '/curation/best',
  NewCuration = '/curation/new',
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
        <Route path={RoutePath.BestCuration} element={<BestCuration />} />
        <Route path={RoutePath.NewCuration} element={<NewCuration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
