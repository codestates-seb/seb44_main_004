import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import tw from 'twin.macro';
import styled from 'styled-components';

import ProfileForm from './ProfileForm';
import ProfileCard from './ProfileCard';
import ProfileCuration from './ProfileCard';

import { UserPageType } from '../../types';
import { CurationProps, CuratorProps } from '../../types/card';
import { MyProps, UserProps, ProfileTypeProps } from '../../types/profile';

import {
  getUserInfoAPI,
  updateUserInfoAPI,
  getWrittenCuratoions,
  getSubscribersAPI,
  getMyInfoAPI,
} from '../../api/profileApi';

const ProfileDetail = ({ type }: ProfileTypeProps) => {
  const [myInfo, setMyInfo] = useState<MyProps>();
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

  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [selectImg, setSelectImg] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const SIZE = 10;

  const myList: Array<string> = [
    '회원정보 수정',
    '작성한 큐레이션',
    '좋아요한 큐레이션',
    '구독하는 큐레이터',
  ];
  const anotherList: Array<string> = ['작성한 큐레이션', '좋아요한 큐레이션'];

  const curations: Array<CurationProps> = [
    {
      emoji: '🌝',
      title: '나는 앞으로 몇 번의 보름달을 볼 수 있을까',
      content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
      like: 100,
      nickname: '보라돌이',
      memberId: 2,
      createdAt: '2023-07-11T12:54:19',
      updatedAt: '2023-07-11T12:54:19',
      visibility: null,
    },
    {
      emoji: '🌝',
      title: '나는 앞으로 몇 번의 보름달을 볼 수 있을까',
      content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
      like: 100,
      nickname: '보라돌이',
      memberId: 2,
    },
    {
      emoji: '🌝',
      title: '나는 앞으로 몇 번의 보름달을 볼 수 있을까',
      content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
      like: 100,
      nickname: '보라돌이',
      memberId: 2,
    },
    {
      emoji: '🌝',
      title: '나는 앞으로 몇 번의 보름달을 볼 수 있을까',
      content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
      like: 100,
      nickname: '보라돌이',
      memberId: 2,
    },
    {
      emoji: '🌝',
      title: '나는 앞으로 몇 번의 보름달을 볼 수 있을까',
      content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
      like: 100,
      nickname: '보라돌이',
      memberId: 2,
    },
    {
      emoji: '🌝',
      title: '나는 앞으로 몇 번의 보름달을 볼 수 있을까',
      content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
      like: 100,
      nickname: '보라돌이',
      memberId: 2,
    },
  ];

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

  //회원 정보 수정하기
  const handleUpdate = async () => {
    if (checkNickname(nickname)) {
      const data = {
        nickname,
        introduction,
      };
      const response = await updateUserInfoAPI(data);
      if (response) {
        window.location.reload();
      }
    }
  };

  //내가 쓴 큐레이션 조회
  const handleGetWrittenCurations = async () => {
    const response = await getWrittenCuratoions(writtenPage + 1, 4);
    // const response = (type === UserPageType.MYPAGE)
    //           ? await getWrittenCuratoions(writtenPage + 1, SIZE)
    //           : ;
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
      type === UserPageType.MYPAGE && (await getWrittenCuratoions(writtenPage + 1, SIZE));
    // const response = (type === UserPageType.MYPAGE)
    //           ? await getWrittenCuratoions(writtenPage + 1, SIZE)
    //           : ;

    if (response) {
      setLikeCurations(response.data.data);
      setTotalLikePage(Math.floor(SIZE) + 1);
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
      setNickname(response.data.nickname);
      setIntroduction(response.data.introduction);
    }
  };

  //내정보 조회
  const handleGetMyInfo = async () => {
    const response = await getMyInfoAPI();
    if (response) {
      setMyInfo(response.data);
      setNickname(response.data.nickname);
      setIntroduction(response.data.introduction);
    }
  };

  useEffect(() => {
    if (type === UserPageType.MYPAGE) {
      handleGetMyInfo();
    } else {
      handleGetUserInfo();
    }
  }, []);

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
                  email={myInfo?.email}
                  nickname={nickname}
                  setNickname={setNickname}
                  introduction={introduction}
                  setIntroduction={setIntroduction}
                  handleUpdate={handleUpdate}
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
                  curations={writtenCurations}
                  totalPage={totalWrittenPage}
                  page={writtenPage}
                  handlePageChange={handleWrittenPageChange}
                />
              </MainContainer>
            ) : selected === 2 ? (
              <MainContainer>
                {curations.length} 개의 큐레이션
                <ProfileCuration
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
                {curations.length} 개의 큐레이션
                <ProfileCard
                  curations={writtenCurations}
                  totalPage={totalWrittenPage}
                  page={writtenPage}
                  handlePageChange={handleWrittenPageChange}
                />
              </MainContainer>
            ) : (
              <MainContainer>
                {curations.length} 개의 큐레이션
                <ProfileCard
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
