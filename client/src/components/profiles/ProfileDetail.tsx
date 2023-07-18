import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import tw from 'twin.macro';
import styled from 'styled-components';

import ProfileForm from './ProfileForm';
import ProfileCard from './ProfileCard';
import ProfileCuration from './ProfileCard';
import { UserPageType } from '../../types';
import { CurationProps, CuratorProps } from '../../types/card';
import { UserProps, ProfileTypeProps } from '../../types/profile';

import {
  getUserInfoAPI,
  getWrittenCuratoionsAPI,
  getUserWrittenCurationsAPI,
  getSubscribersAPI,
} from '../../api/profileApi';

const ProfileDetail = ({ type }: ProfileTypeProps) => {
  const [userInfo, setUserInfo] = useState<UserProps>();
  const { memberId } = useParams();

  const [selected, setSelected] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [writtenCurations, setWrittenCurations] = useState<Array<CurationProps>>();
  const [totalWirttenCurations, setTotalWirttenCurations] = useState<number>(0);
  const [writtenPage, setWrittenPage] = useState<number>(0);
  const [totalWrittenPage, setTotalWrittenPage] = useState<number>(0);

  const [likeCurations, setLikeCurations] = useState<Array<CurationProps>>();
  const [totalLikeCurations, setTotalLikeCurations] = useState<number>(0);
  const [likePage, setLikePage] = useState<number>(0);
  const [totalLikePage, setTotalLikePage] = useState<number>(0);

  const [subscribers, setSubscribers] = useState<Array<CuratorProps>>([]);
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0);
  const [subscriberPage, setSubscriberPage] = useState<number>(0);
  const [totalSubscriberPage, setTotalSubscriberPage] = useState<number>(0);

  const [selectImg, setSelectImg] = useState<string>('');
  const [, /*file*/ setFile] = useState<File | null>(null);

  const SIZE = 10;

  const myList: Array<string> = [
    '회원정보 수정',
    '작성한 큐레이션',
    '좋아요한 큐레이션',
    '구독하는 큐레이터',
  ];
  const anotherList: Array<string> = ['작성한 큐레이션', '좋아요한 큐레이션'];

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

  //내가 쓴 큐레이션 조회
  const handleGetWrittenCurations = async () => {
    const response =
      type === UserPageType.MYPAGE
        ? await getWrittenCuratoionsAPI(writtenPage + 1, SIZE)
        : await getUserWrittenCurationsAPI(Number(memberId), writtenPage + 1, SIZE);
    if (response) {
      setWrittenCurations(response.data.data);
      setTotalWirttenCurations(response.data.pageInfo.totalElement);
      setTotalWrittenPage(response.data.pageInfo.totalPages);
    }
  };

  const handleWrittenPageChange = async (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setWrittenPage(selectedPage);
  };

  //내가 좋아요한 큐레이션 조회
  const handleGetLikeCurations = async () => {
    const response =
      type === UserPageType.MYPAGE && (await getWrittenCuratoionsAPI(writtenPage + 1, SIZE));
    // const response = (type === UserPageType.MYPAGE)
    //           ? await getWrittenCuratoions(writtenPage + 1, SIZE)
    //           : ;

    if (response) {
      setLikeCurations(response.data.data);
      setTotalLikeCurations(response.data.pageInfo.totalElement);
      setTotalLikePage(response.data.pageInfo.totalPages);
    }
  };
  const handleLikePageChange = (selectedItem: { selected: number }) => {
    setLikePage(selectedItem.selected);
    handleGetLikeCurations();
  };

  //내가 구독한 구독자 조회
  const handleGetSubscribers = async () => {
    setLoading(true);
    const response = await getSubscribersAPI(subscriberPage + 1, SIZE);
    if (response) {
      setSubscribers(response.data.data);
      setTotalSubscribers(response.data.pageInfo.totalElement);
      setTotalSubscriberPage(response.data.pageInfo.totalPages);
      setLoading(false);
    }
  };

  const handleCuratorPageChange = async (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setSubscriberPage(selectedPage);
  };

  //타유저정보 조회
  const handleGetUserInfo = async () => {
    //TODO: 프로필 이미지 받아와 저장하기
    const response = await getUserInfoAPI(Number(memberId));
    if (response) {
      setUserInfo(response.data);
    }
  };

  useEffect(() => {
    if (type === UserPageType.USERPAGE) {
      handleGetUserInfo();
    }
  }, [userInfo]);

  useEffect(() => {
    setWrittenPage(0);
    setLikePage(0);
    setSubscriberPage(0);
  }, [selected]);

  useEffect(() => {
    handleGetSubscribers();
  }, [subscriberPage]);

  useEffect(() => {
    handleGetWrittenCurations();
  }, [writtenPage]);

  const renderList = () => {
    return (
      <>
        {type === UserPageType.MYPAGE ? (
          <>
            {myList.map((e, idx) => (
              <ProfileList
                key={`my ${idx}`}
                className={`list ${selected === idx ? 'selected' : ''}`}
                onClick={() => {
                  setSelected(idx);
                  // idx === 0 ? getUserInfo()
                  // : (idx === 1 ? getwrittenCuration()
                  // : (idx === 2 ? ()
                  // : ()))
                  // idx === 0 && handleGetUserInfo();
                  // idx === 1 && handleGetWrittenCurations();
                  // idx === 3 && handleGetSubscribers();
                }}
              >
                {e}
              </ProfileList>
            ))}
          </>
        ) : (
          <>
            {anotherList.map((e, idx) => (
              <ProfileList
                key={`another ${idx}`}
                className={`user-list ${selected === idx ? 'selected' : ''}`}
                onClick={() => {
                  setSelected(idx);
                }}
              >
                {e}
              </ProfileList>
            ))}
          </>
        )}
      </>
    );
  };

  const renderMain = () => {
    return (
      <>
        {type === UserPageType.MYPAGE ? (
          <>
            {selected === 0 ? (
              <MainContainer>
                <ProfileForm
                  checkNickname={checkNickname}
                  selectImg={selectImg}
                  handleSelectImage={handleSelectImage}
                  handleFileInfo={handleFileInfo}
                />
              </MainContainer>
            ) : selected === 1 ? (
              <MainContainer>
                {totalWirttenCurations} 개의 큐레이션
                <ProfileCuration
                  type={UserPageType.MYPAGE}
                  curations={writtenCurations}
                  totalPage={totalWrittenPage}
                  page={writtenPage}
                  handlePageChange={handleWrittenPageChange}
                />
              </MainContainer>
            ) : selected === 2 ? (
              <MainContainer>
                {totalLikeCurations} 개의 큐레이션
                <ProfileCuration
                  type={UserPageType.MYPAGE}
                  curations={likeCurations}
                  totalPage={totalLikePage}
                  page={likePage}
                  handlePageChange={handleLikePageChange}
                />
              </MainContainer>
            ) : (
              <MainContainer>
                {loading ? (
                  <>
                    <div>Loading...</div>
                  </>
                ) : (
                  <>
                    {totalSubscribers}명의 큐레이터
                    <ProfileCard
                      curators={subscribers}
                      totalPage={totalSubscriberPage}
                      page={subscriberPage}
                      handlePageChange={handleCuratorPageChange}
                    />
                  </>
                )}
              </MainContainer>
            )}
          </>
        ) : (
          <>
            {/* 타 유저일 경우  */}
            {selected === 0 ? (
              <MainContainer>
                {totalWirttenCurations} 개의 큐레이션
                <ProfileCard
                  type={UserPageType.USERPAGE}
                  curations={writtenCurations}
                  totalPage={totalWrittenPage}
                  page={writtenPage}
                  handlePageChange={handleWrittenPageChange}
                />
              </MainContainer>
            ) : (
              <MainContainer>
                {totalLikeCurations} 개의 큐레이션
                <ProfileCard
                  type={UserPageType.USERPAGE}
                  curations={likeCurations}
                  totalPage={totalLikePage}
                  page={likePage}
                  handlePageChange={handleLikePageChange}
                />
              </MainContainer>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <ProfileDetailContainer>
      <ProfileAside>
        <ul>{renderList()}</ul>
      </ProfileAside>
      <ProfileDetailMain>{renderMain()}</ProfileDetailMain>
    </ProfileDetailContainer>
  );
};

const ProfileDetailContainer = styled.section`
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

const ProfileAside = styled.aside`
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
const ProfileList = styled.li`
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  text-align: left;
  margin: 0.3rem 0;
  cursor: pointer;

  @media (max-width: 1000px) {
    padding: 0.5rem;
  }

  &.selected {
    color: ${({ theme }) => theme.colors.mainLogoColor};
    border-right: 0.3rem solid ${({ theme }) => theme.colors.mainLogoColor};
    font-weight: bold;
    @media (max-width: 1000px) {
      color: ${({ theme }) => theme.colors.mainLogoColor};

      border-bottom: 0.3rem solid ${({ theme }) => theme.colors.mainLogoColor};
      border-right: 0;
    }
  }
`;

const ProfileDetailMain = styled.main`
  flex-grow: 4;
  padding: 0 0.5rem 0 4rem;
  width: 80%;
  @media (max-width: 1000px) {
    padding: 2rem 0.5rem;
    width: 100%;
  }
`;
const MainContainer = tw.div`
    [> label]:text-left
    [> label]:mb-[0.3rem]
`;
export default ProfileDetail;
