import { useEffect, useState } from 'react';
import SimpleSlider from '../components/slider/SimpleSlider';
import tw from 'twin.macro';

import { recentlyRegisteredCurationAPI } from '../api/mainPageApi';

/**
 * 배너
 * 큐레이터 섹션
 * Best 큐레이션 섹션
 * New 큐레이션 섹션
 */
const MainPage = () => {
  const [newCurations, setNewCurations] = useState([]);

  /* const fetchNewCurationsData = async () => {
    const { data } = await recentlyRegisteredCurationAPI();
    if (data) {
      console.log(data);
    }
  }; */

  // useEffect(() => {
  //   // fetchNewCurationsData();
  // }, []);

  return (
    <Container>
      <Banner>
        <SimpleSlider />
      </Banner>
      <CuratorSection>
        <div>
          <h3>Best 큐레이터</h3>
        </div>
      </CuratorSection>
      <BestCurationSection>
        <div>
          <h3>Best 큐레이션</h3>
        </div>
      </BestCurationSection>
      <NewCurationSection>
        <div>
          <h3>New 큐레이터</h3>
        </div>
      </NewCurationSection>
    </Container>
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
  bg-yellow-300
  h-64
  mb-10
`;

const BestCurationSection = tw.div`
  bg-purple-200
  h-64
  mb-10
`;

const NewCurationSection = tw.div`
  bg-teal-800
  h-64
  mb-10
`;

export default MainPage;
