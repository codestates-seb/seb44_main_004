import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import SimpleSlider from '../components/slider/SimpleSlider';
import tw from 'twin.macro';

import { recentlyRegisteredCurationAPI } from '../api/mainPageApi';
import { ICurationResponseData } from '../types/main';
import CurationCard from '../components/cards/CurationCard';
import Footer from '../components/Footer/Footer';

/**
 * 배너
 * 큐레이터 섹션
 * Best 큐레이션 섹션
 * New 큐레이션 섹션
 */

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
        <CuratorSection>
          <h3>Best 큐레이터</h3>
          <div>
            {newCurations?.map(({ emoji, title, content, like, curator }) => (
              <div key={uuid4()}>
                <CurationCard emoji={emoji} title={title} content={content} like={like} />
              </div>
            ))}
          </div>
        </CuratorSection>
        <BestCurationSection>
          <h3>Best 큐레이션</h3>
          <div>
            {newCurations?.map(({ emoji, title, content, like, curator }) => (
              <div key={uuid4()}>
                <CurationCard emoji={emoji} title={title} content={content} like={like} />
              </div>
            ))}
          </div>
        </BestCurationSection>
        <NewCurationSection>
          <h3>New 큐레이터</h3>
          <div>
            {newCurations?.map(({ emoji, title, content, like, curator }) => (
              <div key={uuid4()}>
                <CurationCard emoji={emoji} title={title} content={content} like={like} />
              </div>
            ))}
          </div>
        </NewCurationSection>
      </Container>
      <Footer />
    </>
  );
};

const Container = tw.div`
  flex
  flex-col
  items-center
  w-full

  [> *]:w-[950px]
`;

const Banner = tw.div`
  mt-10
  mb-20
  h-52
`;

const CuratorSection = tw.div`
  h-64
  mb-10
  [> h3]:mb-2

  [> div]:flex
  [> div]:justify-between
`;

const BestCurationSection = tw.div`
  h-64
  mb-10
  [> h3]:mb-2

  [> div]:flex
  [> div]:justify-between
`;

const NewCurationSection = tw.div`
  h-64
  mb-10
  [> h3]:mb-2

  [> div]:flex
  [> div]:justify-between
`;

export default MainPage;
