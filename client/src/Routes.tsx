import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUp from './pages/User/SignUp';
import SignIn from './pages/User/SignIn';
import MyPage from './pages/MyPage';
import UserPage from './pages/UserPage';
import CurationWritePage from './pages/Curation/CurationWritePage';
import CurationEditPage from './pages/Curation/CurationEditPage';
import CurationDetailPage from './pages/Curation/CurationDetailPage';


const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/write" element={<CurationWritePage />} />
        <Route path="/edit" element={<CurationEditPage />} />
        <Route path="/detail" element={<CurationDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
