import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUp from './pages/User/SignUp';
import MyPage from './pages/MyPage';
import UserPage from './pages/UserPage';

const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/userpage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
