import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import tw from 'twin.macro';

import { RoutePath } from '../../Routes';
import { UserPageType } from '../../types';

import MyFilter from '../../components/filter/Filter';
import ProfileInfo from '../../components/profiles/ProfileInfo';
import WrittenList from '../../components/profiles/WrittenList';
import LikeList from '../../components/profiles/LikeList';

import { ProfileDetailContainer, ProfileAside, ProfileDetailMain, MainContainer } from './MyPage';
import Footer from '../../components/Footer/Footer';
const UserPage = () => {
  const [selected, setSelected] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname.split('/')[location.pathname.split('/').length - 1]) {
      case RoutePath.UserWrittenPage:
        setSelected(0);
        break;
      case RoutePath.UserLikePage:
        setSelected(1);
        break;
    }
  }, [location.pathname]);
  return (
    <>
      <UserPageContainer>
        <ProfileInfo type={UserPageType.USERPAGE} />
        <ProfileDetailContainer>
          <ProfileAside>
            <ul>
              <MyFilter
                type={UserPageType.USERPAGE}
                selected={selected}
                setSelected={setSelected}
              />
            </ul>
          </ProfileAside>
          <ProfileDetailMain>
            <MainContainer>
              <Routes>
                <Route
                  path={RoutePath.UserWrittenPage}
                  element={<WrittenList type={UserPageType.USERPAGE} />}
                />
                <Route
                  path={RoutePath.UserLikePage}
                  element={<LikeList type={UserPageType.USERPAGE} />}
                />
              </Routes>
            </MainContainer>
          </ProfileDetailMain>
        </ProfileDetailContainer>
      </UserPageContainer>
      <Footer />
    </>
  );
};

const UserPageContainer = tw.div`
  w-full
  min-h-[77vh]
  flex
  flex-col
  items-center
  mb-[5rem]
  px-[15%]
  py-[2rem]
`;

export default UserPage;
