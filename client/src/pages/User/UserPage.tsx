import tw from 'twin.macro';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileDetail from '../../components/profiles/ProfileDetail';
import { UserPageType } from '../../components/type';

const UserPage = () => {
  const { memberId } = useParams();
  console.log(memberId === localStorage.getItem('memberId'));

  return (
    <UserPageContainer>
      <ProfileInfo type={UserPageType.USERPAGE} />
      <ProfileDetail type={UserPageType.USERPAGE} />
    </UserPageContainer>
  );
};

export default UserPage;

const UserPageContainer = styled.div`
  padding: 5rem 10%;
  background-color: ${({ theme }) => theme.colors.mainLightGray100};
  ${tw`
        w-full
        flex
        flex-col
        justify-center
        items-center
    `}
`;
