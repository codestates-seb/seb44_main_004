import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import tw from 'twin.macro';
import styled from 'styled-components';

import { RoutePath } from '../../Routes';
import { UserPageType } from '../../types';

import ProfileOut from '../../components/profiles/ProfileOut';
import Filter from '../../components/filter/Filter';
import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileForm from '../../components/profiles/ProfileForm';
import WrittenList from '../../components/profiles/WrittenList';
import LikeList from '../../components/profiles/LikeList';
import CuraotrList from '../../components/profiles/CuratorList';
import Footer from '../../components/Footer/Footer';

const MyPage = () => {
  const [selected, setSelected] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('written')) {
      setSelected(1);
    } else if (location.pathname.includes('like')) {
      setSelected(2);
    } else if (location.pathname.includes('subscribe')) {
      setSelected(3);
    } else {
      setSelected(0);
    }
  }, [location.pathname]);

  return (
    <>
      <MyPageContainer>
        <ProfileInfo type={UserPageType.MYPAGE} />
        <ProfileDetailContainer>
          <ProfileAside>
            <ul>
              <Filter type={UserPageType.MYPAGE} selected={selected} setSelected={setSelected} />
            </ul>
          </ProfileAside>
          <ProfileDetailMain>
            <MainContainer>
              <Routes>
                <Route path={RoutePath.MyInfoUpdate} element={<ProfileForm />} />
                <Route path={RoutePath.MyPageOut} element={<ProfileOut />} />
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
      <Footer />
    </>
  );
};

const MyPageContainer = tw.div`
  w-full
  min-h-[77vh]
  flex
  flex-col
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
  border-top: 0.08rem solid gray;
  padding-top: 4rem;
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
