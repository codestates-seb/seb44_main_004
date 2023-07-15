import tw from 'twin.macro';
import styled from 'styled-components';

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

const UserPageContainer = styled.div`
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

export default UserPage;
