import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import tw from 'twin.macro';

import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileDetail from '../../components/profiles/ProfileDetail';

import { UserPageType } from '../../types';
import { saveUserInfo } from '../../store/userSlice';
import { getMyInfoAPI } from '../../api/profileApi';

const MyPage = () => {
  const dispatch = useDispatch();
  const handleGetMyInfo = async () => {
    const response = await getMyInfoAPI();
    if (response) {
      dispatch(saveUserInfo(response.data));
    }
  };
  useEffect(() => {
    handleGetMyInfo;
  }, []);

  return (
    <MyPageContainer>
      <ProfileInfo type={UserPageType.MYPAGE} />
      <ProfileDetail type={UserPageType.MYPAGE} />
    </MyPageContainer>
  );
};

const MyPageContainer = tw.div`
  w-full
  flex
  flex-col
  justify-center
  items-center
  mb-[5rem]
  px-[15%]
  py-[2rem]
`;

export default MyPage;
