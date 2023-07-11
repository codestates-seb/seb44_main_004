import { useEffect } from 'react';
import { VITE_SERVER_URL, axiosInstance } from '../api/axios';

const MainPage = () => {
  useEffect(() => {
    axiosInstance.get(`${VITE_SERVER_URL}/members`).then((response) => response);
  }, []);

  return <div>MainPage</div>;
};

export default MainPage;
