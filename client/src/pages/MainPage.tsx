import SimpleSlider from '../components/slider/SimpleSlider';
import tw from 'twin.macro';

/**
 * 배너
 * 큐레이터 섹션
 * Best 큐레이션 섹션
 * New 큐레이션 섹션
 */
const MainPage = () => {
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
`;

const Banner = tw.div`
  bg-red-300
  mb-10
  w-4/5
  h-[300px]
  
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
