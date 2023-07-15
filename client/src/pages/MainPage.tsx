import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import SimpleSlider from '../components/slider/SimpleSlider';
import tw from 'twin.macro';

import { recentlyRegisteredCurationAPI } from '../api/mainPageApi';
import { ICurationResponseData } from '../types/main';
import { ICuratorInfo } from '../types/user';
import CurationCard from '../components/cards/CurationCard';
import Label from '../components/label/Label';
import Footer from '../components/Footer/Footer';
import CuratorCard from '../components/cards/CuratorCard';
import { styled } from 'styled-components';
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
    profileImg: '../../../src/img/profile_img1.png',
    nickname: '앙꼬',
    subscribers: 300,
  },
  {
    memberId: uuid4(),
    profileImg: '../../../src/img/profile_img2.png',
    nickname: '김코딩',
    subscribers: 179,
  },
  {
    memberId: uuid4(),
    profileImg: '../../src/img/book_example.jpeg',
    nickname: 'hoho',
    subscribers: 103,
  },
  {
    memberId: uuid4(),
    profileImg: '../../src/img/banner3.jpg',
    nickname: '보라돌이',
    subscribers: 103,
  },
  {
    memberId: uuid4(),
    profileImg: '../../src/img/banner4.jpg',
    nickname: '호빵',
    subscribers: 103,
  },
];

const MainPage = () => {
  const [newCurations, setNewCurations] = useState<ICurationResponseData[] | null>(null);

  const fetchNewCurationsData = async () => {
    const data = await recentlyRegisteredCurationAPI();
    if (data) {
      setNewCurations(data);
    }
  };

  useEffect(() => {
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
          <Label content="구독자수 100명 이상의 후즈북 큐레이터를 소개합니다." />
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
            {newCurations?.map(({ emoji, title, content, like }) => (
              <li key={uuid4()}>
                <CurationCard emoji={emoji} title={title} content={content} like={like} />
              </li>
            ))}
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
            {newCurations?.map(({ emoji, title, content, like }) => (
              <li key={uuid4()}>
                <CurationCard emoji={emoji} title={title} content={content} like={like} />
              </li>
            ))}
          </ul>
        </Section>
      </Container>
      <Footer />
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

export default MainPage;
