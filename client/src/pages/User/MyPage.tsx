import tw from 'twin.macro';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import ProfileInfo from '../../components/profiles/ProfileInfo';
import ProfileDetail from '../../components/profiles/ProfileDetail';
import { UserPageType } from '../../types';
import { getMyInfoAPI } from '../../api/profileApi';
import { MyProps } from '../../types/profile';

const MyPage = () => {
  return (
    <MyPageContainer>
      <ProfileInfo type={UserPageType.MYPAGE} />
      <ProfileDetail type={UserPageType.MYPAGE} />
    </MyPageContainer>
  );
};

export default MyPage;

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
