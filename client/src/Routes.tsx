import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SignUp from './pages/User/SignUp';
import CurationWritePage from './pages/CurationWritePage';
import CurationEditPage from './pages/CurationEditPage';
import CurationDetailPage from './pages/CurationDetailPage';

const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<CurationWritePage />} />
        <Route path="/edit" element={<CurationEditPage />} />
        <Route path="/detail" element={<CurationDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteProvider;
