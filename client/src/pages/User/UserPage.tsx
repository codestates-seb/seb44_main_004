import tw from 'twin.macro';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileDetail from '../../components/profiles/ProfileDetail';
import { UserPageType } from '../../types';

const UserPage = () => {
  const { memberId } = useParams();

  return (
    <UserPageContainer>
      <ProfileInfo type={UserPageType.USERPAGE} memberId={Number(memberId)} />
      <ProfileDetail type={UserPageType.USERPAGE} />
    </UserPageContainer>
  );
};

export default UserPage;

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
