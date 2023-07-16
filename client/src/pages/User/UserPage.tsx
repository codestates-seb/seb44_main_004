import tw from 'twin.macro';

import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileDetail from '../../components/profiles/ProfileDetail';
import { UserPageType } from '../../types';

const UserPage = () => {
  return (
    <UserPageContainer>
      <ProfileInfo type={UserPageType.USERPAGE} />
      <ProfileDetail type={UserPageType.USERPAGE} />
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
