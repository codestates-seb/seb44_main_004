import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { styled } from 'styled-components';
import SimpleSlider from '../components/slider/SimpleSlider';
import tw from 'twin.macro';

import { highestLikeCurationAPI, recentlyRegisteredCurationAPI } from '../api/mainPageApi';
import { ICurationResponseData } from '../types/main';
import { ICuratorInfo } from '../types/user';
import { images } from '../utils/importImgUrl';
import CurationCard from '../components/cards/CurationCard';
import Label from '../components/label/Label';
import Footer from '../components/Footer/Footer';
import CuratorCard from '../components/cards/CuratorCard';
import ClockLoading from '../components/Loading/ClockLoading';
import PencilButton from '../components/buttons/PencilButton';

/**
 * 배너
 * 큐레이터 섹션
 * Best 큐레이션 섹션
 * New 큐레이션 섹션
 */

/**
 * Best Curator API 제공 전 더미 데이터
 */
const bestCuratorData: ICuratorInfo[] = [
  {
    memberId: uuid4(),
    profileImg: images.profileImg1,
    nickname: '앙꼬',
    subscribers: 300,
  },
  {
    memberId: uuid4(),
    profileImg: images.profileImg2,
    nickname: '김코딩',
    subscribers: 179,
  },
  {
    memberId: uuid4(),
    profileImg: images.bookImg,
    nickname: 'hoho',
    subscribers: 103,
  },
  {
    memberId: uuid4(),
    profileImg: images.banner3,
    nickname: '보라돌이',
    subscribers: 103,
  },
  {
    memberId: uuid4(),
    profileImg: images.banner4,
    nickname: '호빵',
    subscribers: 103,
  },
];

const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const MainPage = () => {
  const [bestCurations, setBestCurations] = useState<ICurationResponseData[] | null>(null);
  const [newCurations, setNewCurations] = useState<ICurationResponseData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBestCurationData = async () => {
    setIsLoading(true);
    const data = await highestLikeCurationAPI();
    if (!data.length) {
      setIsLoading(false);
    } else if (data.length) {
      setBestCurations(data);
    }
    setIsLoading(false);
  };

  const fetchNewCurationsData = async () => {
    setIsLoading(true);
    const data = await recentlyRegisteredCurationAPI();
    if (!data.length) {
      setIsLoading(false);
    } else if (data.length) {
      setNewCurations(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBestCurationData();
    fetchNewCurationsData();
  }, []);

  return (
    <>
      <Container>
        <Banner>
          <SimpleSlider />
        </Banner>
        <Section>
          <Label type="title" content="Best 큐레이터" />
          <br />
          <Label content="구독자가 많은 후즈북 큐레이터를 소개합니다." />
          <ul>
            {bestCuratorData?.map(({ memberId, profileImg, nickname, subscribers }) => (
              <div key={uuid4()}>
                <CuratorCard
                  memberId={memberId}
                  profileImg={profileImg}
                  nickname={nickname}
                  subscribers={subscribers}
                />
              </div>
            ))}
          </ul>
        </Section>
        <Section>
          <div>
            <Label type="title" content="Best 큐레이션" />
            <Link to="/curation/best">
              <Label content="> 더 보기" />
            </Link>
          </div>
          <ul>
            {isLoading && !bestCurations?.length ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : bestCurations?.length ? (
              bestCurations?.map(
                ({ curationId, emoji, title, content, memberId, curationLikeCount }) => (
                  <li key={uuid4()}>
                    <CurationCard
                      curationId={curationId}
                      emoji={emoji}
                      title={title}
                      content={content}
                      memberId={memberId}
                      curationLikeCount={curationLikeCount}
                    />
                  </li>
                )
              )
            ) : (
              <Comment>데이터가 없습니다..</Comment>
            )}
          </ul>
        </Section>
        <Section>
          <div>
            <Label type="title" content="New 큐레이션" />
            <Link to="/curation/new">
              <Label content="> 더 보기" />
            </Link>
          </div>
          <ul>
            {isLoading && !newCurations?.length ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : newCurations?.length ? (
              newCurations?.map(
                ({ curationId, emoji, title, content, memberId, curationLikeCount }) => (
                  <li key={uuid4()}>
                    <CurationCard
                      curationId={curationId}
                      emoji={emoji}
                      title={title}
                      content={content}
                      memberId={memberId}
                      curationLikeCount={curationLikeCount}
                    />
                  </li>
                )
              )
            ) : (
              <Comment>데이터가 없습니다..</Comment>
            )}
          </ul>
        </Section>
      </Container>
      <Footer />
      {localStorage.getItem('Authorization') && <PencilButton />}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > * {
    width: 950px;
  }
`;

const Banner = tw.div`
  mt-10
  mb-20
  h-52
`;

const Section = tw.div`
  h-64
  mb-10
  [> div]:flex
  [> div]:justify-between
  [> div > a > label]:last:text-black
  [> div > a > label]:last:cursor-pointer
  [> br]:mt-2
  [> ul]:mt-3
  [> ul]:flex
  [> ul]:justify-between
`;

const Comment = tw.p`
  w-full
  mt-20
  text-center
  text-lg
  font-extrabold
  text-red-900
`;

export default MainPage;
