import { useState } from "react";

import styled from "styled-components";

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
            likes: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            likes: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            likes: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            likes: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            likes: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          {
            emoji: "🌝",
            title: "나는 앞으로 몇 번의 보름달을 볼 수 있을까",
            content: `세계적인 음악가 류이치 사카모토가 마지막으로 전하는 이야기
            한국, 일본, 중국, 대만 동시 출간!
            방탄소년단 슈가, 윤상, 이준오(캐스커), 정세랑, 정재일, 황소윤, 허우 샤오시엔 추천“
            
            시대를 대표하는 예술가이자 
            
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어 
            오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다.여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는 그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
            활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토. 『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.`,
            likes: 100,
            nickname: "보라돌이",
            memberId: 2,
          },
          
    ];

    //큐레이터 
    const curators: Array<Curator> = [
        {
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduce: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },
        {
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduce: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. ",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduce: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduce: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduce: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },{
            nickname:"앙꼬",
            subscribers: 10,
            curations: 10,
            introduce: "안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.안녕하세요. 팥앙금을 좋아하는 앙꼬입니다.",
        },
    ];

    return(
        <ProfileDetailContainer>
            <ProfileAside>
            <ul>
            {/* 본인 페이지일 경우 */}
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

                )} */}
            </ProfileDetailMain>
        </ProfileDetailContainer>

    )

}

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

    &.selected{
        color: var(--main-skyBlue-500);
        border-right: 0.3rem solid ${({theme}) => theme.colors.mainLogoColor};
        font-weight: 500;
        /* background-color: ${({theme}) => theme.colors.mainPastelBlue100}; */
        @media (max-width: 1000px) {
           border-bottom: 0.3rem solid ${({theme}) => theme.colors.mainLogoColor};
           border-right: 0;
        }
    }
 
`

const ProfileDetailMain = styled.main`
    flex-grow: 4;
    /* padding: 0 4rem; */
    padding: 0 0.5rem 0 4rem;
    width: 80%;
    @media (max-width: 1000px) {
        padding: 2rem 0.5rem;
    }
`
const MainContainer = styled.div`
    label{
        text-align:left;
        margin-bottom: 0.3rem;
    }
`

const InputForm = styled.div`
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
   :first-child{
        >div{
            font-weight: 500;
        }
    }  
    &:nth-last-child(2){
        >div{
            label{
                text-align: center;
            }
        }
    }
    &:last-child{
        align-items: flex-end;
    }   
`
const Textarea = styled.textarea`
    width: 100%;
    height: 10rem;

    background-color: #F8F7F7;
    border: none;
    border-radius: 0.3rem;
    padding: 0.7rem;
    &:focus {
        border: 1px solid #0077ff;
        box-shadow:0px 0px 5px 3px rgba(46, 139, 245, 0.3);
        outline: none;
    }
`
const IntroduceLenCheck = styled.div`
    text-align: right;
    margin-top: 0.3rem;
    font-size: 0.8rem;
    color: ${({theme}) => theme.colors.mainLightGray400};
`
const CurationsDiv = styled.div`
    display: flex;
    flex: 1 1 50%;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
`

const CuratorDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
export default ProfileDetail;
