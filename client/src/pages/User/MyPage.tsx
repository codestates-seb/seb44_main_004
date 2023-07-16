import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import tw from 'twin.macro';
import styled from 'styled-components';

import { RoutePath } from '../../Routes';
import { UserPageType } from '../../types';
import { saveUserInfo } from '../../store/userSlice';
import { getMyInfoAPI } from '../../api/profileApi';

import MyFilter from '../../components/filters/MyFilter';
import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileForm from '../../components/profiles/ProfileForm';
import WrittenList from '../../components/profiles/WrittenList';
import LikeList from '../../components/profiles/LikeList';
import CuraotrList from '../../components/profiles/CuratorList';

const MyPage = () => {
  const [selectImg, setSelectImg] = useState<string>('');
  const [, /*file*/ setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<number>(0);

  const dispatch = useDispatch();
  const checkNickname = (data: string): boolean => {
    const regex = new RegExp(`^[a-zA-Z가-힣0-9]{2,14}$`);
    if (!regex.test(data)) {
      return false;
    } else return true;
  };
  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };
  const handleFileInfo = (file: File) => {
    setFile(file);
  };
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
      <ProfileDetailContainer>
        <ProfileAside>
          <ul>
            <MyFilter type={UserPageType.MYPAGE} selected={selected} setSelected={setSelected} />
          </ul>
        </ProfileAside>
        <ProfileDetailMain>
          <MainContainer>
            <Routes>
              <Route
                path={RoutePath.MyInfoUpdate}
                element={
                  <ProfileForm
                    checkNickname={checkNickname}
                    selectImg={selectImg}
                    handleSelectImage={handleSelectImage}
                    handleFileInfo={handleFileInfo}
                  />
                }
              />
              <Route
                path={RoutePath.MyWrittenPage}
                element={<WrittenList type={UserPageType.MYPAGE} />}
              />
              <Route
                path={RoutePath.MyLikePage}
                element={<LikeList type={UserPageType.MYPAGE} />}
              />
              <Route path={RoutePath.MySubcriberPage} element={<CuraotrList />} />
            </Routes>
          </MainContainer>
        </ProfileDetailMain>
      </ProfileDetailContainer>
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
export const ProfileDetailContainer = styled.section`
  ${tw`
        w-full
        flex
        justify-center
        mt-[3rem]
    `}
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const ProfileAside = styled.aside`
  flex-grow: 1;
  width: 20%;
  ul {
    display: flex;
    flex-direction: column;
    @media (max-width: 1000px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const ProfileDetailMain = styled.main`
  flex-grow: 4;
  padding: 0 0.5rem 0 4rem;
  width: 80%;
  @media (max-width: 1000px) {
    padding: 2rem 0.5rem;
    width: 100%;
  }
`;
export const MainContainer = tw.div`
    [> label]:text-left
    [> label]:mb-[0.3rem]
`;

export default MyPage;
