import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import tw from 'twin.macro';
import styled from 'styled-components';

import Input from '../input/Input';
import Label from '../label/Label';
import Button from '../buttons/Button';
import ImageUpload from '../imageUpload/ImageUpload';

import CurationCard from '../cards/CurationCard';
import SubCuratorCard from '../cards/SubCuratorCard';

import { User } from '../../types/profile';
import { ProfileTypeProps } from '../../types/profile';
import { Curation, Curator } from '../../types/card';
import { CurationType, UserPageType } from '../../types';
import { axiosInstance } from '../../api/axios';

import {
  getUserInfoAPI,
  updateUserInfoAPI,
  getWrittenCuratoions,
  getSubscribersAPI,
} from '../../api/profileApi';

export const { VITE_SERVER_URL } = import.meta.env;

const ProfileDetail = ({ type }: ProfileTypeProps) => {
  const [user, setUser] = useState<User>();
  const [selected, setSelected] = useState<number | null>(0);

  const [writtenCurations, setWrittenCurations] = useState<Array<Curation>>();
  const [writtenPage, setWrittenPage] = useState<number>(1);
  const [totalWrittenPage, setTotalWrittenPage] = useState<number>(1);

  const [likeCurations, setLikeCurations] = useState<Array<Curation>>();
  const [likePage, setLikePage] = useState<number>(1);
  const [totalLikePage, setTotalLikePage] = useState<number>(1);

  const [subscribers, setSubscribers] = useState<Array<Curator>>();
  const [curatorPage, setCuratorPage] = useState<number>(0);
  const [totalCuratorPage, setTotalCuratorPage] = useState<number>(0);

  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [selectImg, setSelectImg] = useState<string>('');

  const SIZE = 10;
  const handleSelectImage = (imgURL: string) => {
    setSelectImg(imgURL);
  };

  const myList: Array<string> = [
    '회원정보 수정',
    '작성한 큐레이션',
    '좋아요한 큐레이션',
    '구독하는 큐레이터',
  ];
  const anotherList: Array<string> = ['작성한 큐레이션', '좋아요한 큐레이션'];

  //큐레이션 -> writtenCuration, likeCuration
  const curations: Array<Curation> = [
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

  //회원 정보 받아오기
  const handleGetUserInfo = async () => {
    const response = await getUserInfoAPI();
    console.log(response);
    if (response) {
      const userInfo = {
        email: response.data.email,
        introduction: response.data.introduction,
        memberId: response.data.memberId,
        memberStatus: response.data.memberStatus,
        nickname: response.data.nickname,
        // curations: response.data.curations.length,
      };
      setUser(userInfo);
      setNickname(userInfo.nickname);
      setIntroduction(userInfo.introduction);
    }
  };

  //내가 쓴 큐레이션 조회
  const handleGetWrittenCurations = async () => {
    const response = await getWrittenCuratoions(writtenPage, SIZE);
    if (response) {
      setWrittenCurations(response.data.data);
      setTotalWrittenPage(Math.floor(response.data.data.length / SIZE) + 1);
    }
  };
  const handleWrittenPageChange = (selectedItem: { selected: number }) => {
    setWrittenPage(selectedItem.selected);
    handleGetWrittenCurations();
  };

  //내가 좋아요한 큐레이션 조회
  const handleGetLikeCurations = async () => {
    const response = await getWrittenCuratoions(writtenPage + 1, SIZE);
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
    // console.log('요청', curatorPage + 1);
    // // const response = await getSubscribersAPI(curatorPage, SIZE);
    // console.log(`/members/subscribe?page=${curatorPage + 1}&size=${SIZE}`);
    // const response = await axiosInstance.get(
    //   `/members/subscribe?page=${curatorPage + 1}&size=${SIZE}`
    // );
    // if (response) {
    //   console.log(response);
    //   setSubscribers(response.data.data);
    //   setTotalCuratorPage(Math.floor(response.data.data.length / SIZE + 1));
    // }
  };
  const handleCuratorPageChange = async (selectedItem: { selected: number }) => {
    console.log('클릭', selectedItem.selected);
    setCuratorPage(selectedItem.selected);
    handleGetSubscribers();
  };
  console.log('현재 페이지', curatorPage + 1);

  useEffect(() => {
    handleGetUserInfo();
  }, []);

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
                  idx === 0 && handleGetUserInfo();
                  idx === 1 && handleGetWrittenCurations();
                  idx === 3 && handleGetSubscribers();
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
                <InputForm>
                  <Label type="title" htmlFor="email" content="아이디(이메일)" />
                  <div>{user?.email}</div>
                </InputForm>
                <InputForm>
                  <Label type="title" htmlFor="nickName" content="닉네임" />
                  <Input
                    type="text"
                    value={nickname}
                    id="nickname"
                    borderRadius="0.3rem"
                    color="#000"
                    focusMode="true"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNickname(e.target.value)
                    }
                    placeholder="닉네임은 2글자 이상 15글자 미만, 영어. 한글, 숫자만 입력 가능합니다."
                  />
                  {!checkNickname(nickname) && (
                    <Valid>
                      닉네임은 2글자 이상 15글자 미만으로 영어, 한글, 숫자만 입력 가능합니다.
                    </Valid>
                  )}
                </InputForm>
                <InputForm>
                  <Label type="title" htmlFor="introduction" content="소개글" />
                  <Textarea
                    value={introduction || ''}
                    maxLength={200}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setIntroduction(e.target.value)
                    }
                    placeholder="자신을 소개하는 글을 200자 이하로 입력하세요."
                  />
                  <IntroduceLenCheck>{introduction?.length}/200</IntroduceLenCheck>
                </InputForm>
                <InputForm>
                  <Label type="title" htmlFor="profileImage" content="프로필 이미지" />
                  {/* <ImageUpload selectImg={selectImg} handleSelectImage={handleSelectImage} /> */}
                </InputForm>
                <InputForm>
                  <Button type="primary" content="발행" onClick={handleUpdate} />
                </InputForm>
              </MainContainer>
            ) : selected === 1 ? (
              <MainContainer>
                {writtenCurations?.length} 개의 큐레이션
                <CurationsDiv>
                  {writtenCurations &&
                    writtenCurations.map((e, idx) => (
                      <CurationCard
                        key={`my ${idx}`}
                        type={CurationType.MYPAGE}
                        emoji={e.emoji}
                        title={e.title}
                        content={e.content}
                        like={e.like}
                        nickname={user?.nickname}
                        memberId={e.memberId}
                        curationId={e.curationId}
                      />
                    ))}
                </CurationsDiv>
                <PaginationZone>
                  <ReactPaginate
                    pageCount={totalWrittenPage}
                    onPageChange={handleWrittenPageChange}
                    forcePage={writtenPage}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    nextLabel=">"
                    previousLabel="<"
                  />
                </PaginationZone>
              </MainContainer>
            ) : selected === 2 ? (
              <MainContainer>
                {curations.length} 개의 큐레이션
                <CurationsDiv>
                  {curations &&
                    curations.map((e, idx) => (
                      <CurationCard
                        key={`my ${idx}`}
                        type={CurationType.MYPAGE}
                        emoji={e.emoji}
                        title={e.title}
                        content={e.content}
                        like={e.like}
                        nickname={e.nickname}
                        memberId={e.memberId}
                      />
                    ))}
                </CurationsDiv>
                <PaginationZone>
                  <ReactPaginate
                    pageCount={totalLikePage} // 전체 페이지 수
                    onPageChange={handleCuratorPageChange}
                    forcePage={likePage}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    nextLabel=">"
                    previousLabel="<"
                  />
                </PaginationZone>
              </MainContainer>
            ) : (
              <MainContainer>
                {subscribers?.length}명의 큐레이터
                <CuratorDiv>
                  {subscribers &&
                    subscribers.map((e, idx) => (
                      <SubCuratorCard
                        key={`my sub ${idx}`}
                        nickname={e.nickname}
                        subscribers={e.subscribers}
                        curations={e.curations}
                        introduction={e.introduction}
                        memberId={e.memberId}
                      />
                    ))}
                </CuratorDiv>
                <PaginationZone>
                  <ReactPaginate
                    pageCount={totalCuratorPage} // 전체 페이지 수
                    onPageChange={handleCuratorPageChange}
                    forcePage={curatorPage}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    nextLabel=">"
                    previousLabel="<"
                  />
                </PaginationZone>
              </MainContainer>
            )}
          </>
        ) : (
          <>
            {/* 타 유저일 경우  */}
            {selected === 0 ? (
              <MainContainer>
                {curations.length} 개의 큐레이션
                <CurationsDiv>
                  {writtenCurations &&
                    writtenCurations.map((e, idx) => (
                      <CurationCard
                        key={`my ${idx}`}
                        type={CurationType.MYPAGE}
                        emoji={e.emoji}
                        title={e.title}
                        content={e.content}
                        like={e.like}
                        nickname={user?.nickname}
                        memberId={e.memberId}
                        curationId={e.curationId}
                      />
                    ))}
                </CurationsDiv>
              </MainContainer>
            ) : (
              <MainContainer>
                {curations.length} 개의 큐레이션
                <CurationsDiv>
                  {curations &&
                    curations.map((e, idx) => (
                      <CurationCard
                        key={`my ${idx}`}
                        type={CurationType.MYPAGE}
                        emoji={e.emoji}
                        title={e.title}
                        content={e.content}
                        like={e.like}
                        nickname={e.nickname}
                        memberId={e.memberId}
                      />
                    ))}
                </CurationsDiv>
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
const InputForm = styled.div`
  :first-child {
    > div {
      font-weight: 500;
    }
    margin-bottom: 0.5rem;
  }
  &:nth-last-child(2) {
    > div {
      label {
        text-align: center;
      }
    }
  }
  &:last-child {
    align-items: flex-end;
  }
  ${tw`
        mb-[1.2rem]
        flex
        flex-col
    `}
`;
const Valid = tw.div`
    text-red-500
    pt-[0.5rem]
    pl-[0.5rem]
    text-[0.8vw]
    font-semibold
`;
const Textarea = styled.textarea`
  ${tw`
        w-full
        h-[10rem]

        bg-[#F8F7F7]
        border-0
        rounded-[0.3rem]
        p-[0.7rem]
    `}
  &:focus {
    border: 1px solid #0077ff;
    box-shadow: 0px 0px 5px 3px rgba(46, 139, 245, 0.3);
    outline: none;
  }
`;
const IntroduceLenCheck = styled.div`
  color: ${({ theme }) => theme.colors.mainLightGray400};
  ${tw`
        text-right
        mt-[0.3rem]
        text-[0.8rem]
    `}
`;
const CurationsDiv = tw.div`
    flex
    flex-[1_1_50%]
    flex-wrap
    justify-between
    mt-[1rem]
`;
const CuratorDiv = tw.div`
    flex
    flex-wrap
    justify-between
`;

const PaginationZone = styled.div`
  margin: 1rem 0;
  > ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    > li {
      margin: 0 0.3rem;
      padding: 0.3rem;
      border: 1px solid #7895cb;
      border-radius: 5px;
      background-color: white;
      cursor: pointer;
      a {
        display: inline-block;
        color: #7895cb;
        text-decoration: none;
        border-radius: 3px;
      }
      &.active {
        border: 1px solid #3173f6;
        background-color: #3173f6;
        color: #fff;
        a {
          color: white;
        }
      }

      &:hover {
        background-color: #7895cb;
        a {
          color: white;
        }
      }
    }
  }
`;
export default ProfileDetail;
