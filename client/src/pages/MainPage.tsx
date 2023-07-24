import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import {
  bestCuratorsAPI,
  highestLikeCurationAPI,
  recentlyRegisteredCurationAPI,
} from '../api/mainPageApi';
import { ICurationResponseData } from '../types/main';
import { ICuratorInfo } from '../types/user';
import SimpleSlider from '../components/slider/SimpleSlider';
import MainCurationCard from '../components/cards/MainCurationCard';
import Label from '../components/label/Label';
import Footer from '../components/Footer/Footer';
import ClockLoading from '../components/Loading/ClockLoading';
import PencilButton from '../components/buttons/PencilButton';

import { images } from '../utils/importImgUrl';
import CuratorCard from '../components/cards/CuratorCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const bannerData = [
  {
    id: 1,
    imgUrl: images.banner1,
    curationId: '19',
  },
  {
    id: 2,
    imgUrl: images.banner2,
    curationId: '22',
  },
  {
    id: 3,
    imgUrl: images.banner3,
    curationId: '46',
  },
  {
    id: 4,
    imgUrl: images.banner4,
    curationId: '44',
  },
  {
    id: 5,
    imgUrl: images.banner5,
    curationId: '41',
  },
  {
    id: 6,
    imgUrl: images.banner6,
    curationId: '40',
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
  const { memberId } = useSelector((state: RootState) => state.user);
  const [bestCurators, setBestCurators] = useState<ICuratorInfo[] | null>(null);
  const [bestCurations, setBestCurations] = useState<ICurationResponseData[] | null>(null);
  const [newCurations, setNewCurations] = useState<ICurationResponseData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBestCurators = async () => {
    setIsLoading(true);
    const data = await bestCuratorsAPI();
    if (data) {
      setBestCurators(data);
    }
    setIsLoading(false);
  };

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
    getBestCurators();
    fetchBestCurationData();
    fetchNewCurationsData();
  }, []);

  return (
    <>
      <Container>
        <Banner>
          <SimpleSlider data={bannerData} />
        </Banner>
        <Section>
          <Label type="title" content="Best 큐레이터" />
          <br />
          <Label content="구독자가 많은 후즈북 큐레이터를 소개합니다." />
          <ul>
            {isLoading && !bestCurators?.length ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : (
              bestCurators?.map(({ image, memberId, mySubscriber, nickname }) => (
                <div key={uuid4()}>
                  <CuratorCard
                    image={image}
                    memberId={memberId}
                    mySubscriber={mySubscriber}
                    nickname={nickname}
                  />
                </div>
              ))
            )}
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
                ({ curator, curationId, emoji, title, content, memberId, curationLikeCount }) => (
                  <li key={uuid4()}>
                    <MainCurationCard
                      curator={curator}
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
                ({ curator, curationId, emoji, title, content, memberId, curationLikeCount }) => (
                  <li key={uuid4()}>
                    <MainCurationCard
                      curator={curator}
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
      {memberId !== 0 && <PencilButton />}
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
