import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import tw from 'twin.macro';

import { RoutePath } from '../../Routes';
import { UserPageType } from '../../types';

import MyFilter from '../../components/filter/Filter';
import ProfileInfo from '../../components/profiles/ProfileInfo';
import WrittenList from '../../components/profiles/WrittenList';
import LikeList from '../../components/profiles/LikeList';

import { ProfileDetailContainer, ProfileAside, ProfileDetailMain, MainContainer } from './MyPage';
const UserPage = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <UserPageContainer>
      <ProfileInfo type={UserPageType.USERPAGE} />
      <ProfileDetailContainer>
        <ProfileAside>
          <ul>
            <MyFilter type={UserPageType.USERPAGE} selected={selected} setSelected={setSelected} />
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
  );
};

const UserPageContainer = tw.div`
  w-full
  flex
  flex-col
  justify-center
  items-center
  mb-[5rem]
  px-[15%]
  py-[2rem]
`;

export default UserPage;
