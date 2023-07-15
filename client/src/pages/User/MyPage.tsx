import { useEffect } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileDetail from '../../components/profiles/ProfileDetail';
import { UserPageType } from '../../types';
// import { MyProps } from '../../types/profile';
import { getMyInfoAPI } from '../../api/profileApi';
import { useDispatch } from 'react-redux';
import { saveUserInfo } from '../../store/userSlice';

const MyPage = () => {
  // const [myInfo, setMyInfo] = useState<MyProps>();
  const dispatch = useDispatch();
  const handleGetMyInfo = async () => {
    const response = await getMyInfoAPI();
    if (response) {
      // setMyInfo(response.data);
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

const MyPageContainer = styled.div`
  padding: 3rem 10%;
  margin-top: -3rem;
  background-color: ${({ theme }) => theme.colors.mainLightGray100};
  ${tw`
        w-full
        flex
        flex-col
        justify-center
        items-center
    `}
`;

export default MyPage;
