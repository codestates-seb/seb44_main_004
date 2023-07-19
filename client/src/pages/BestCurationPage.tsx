import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import CategoryTag from '../components/category/CategoryTag';
import { mostLikedCurationAPI } from '../api/curationApi';
import { ICurationResponseData } from '../types/main';
import CurationCard from '../components/cards/CurationCard';
import Label from '../components/label/Label';
import Button from '../components/buttons/Button';
import Footer from '../components/Footer/Footer';
import ClockLoading from '../components/Loading/ClockLoading';

const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const BestCurationPage = () => {
  const [bestCurations, setBestCurations] = useState<ICurationResponseData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBestCurationsData = async () => {
    setIsLoading(true);
    const data = await mostLikedCurationAPI();
    if (!data.length) {
      setIsLoading(false);
    } else if (data.length) {
      setBestCurations(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBestCurationsData();
  }, []);

  return (
    <>
      <Container>
        <TitleContainer>
          <Label type="title" content="큐레이션 카테고리" />
          <CreateButton>
            <Button type="create" content="﹢ 큐레이션 발행하기" />
          </CreateButton>
        </TitleContainer>
        <CategoryTag />
        <Section>
          <Label type="title" content="Best 큐레이션" />
          <br />
          <Label content="가장 인기있는 후즈북 큐레이션을 소개합니다." />
          <ul>
            {isLoading && !bestCurations?.length ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : bestCurations?.length ? (
              bestCurations?.map(({ emoji, title, content, curationLikeCount }) => (
                <CurationCard
                  key={title}
                  emoji={emoji}
                  title={title}
                  content={content}
                  curationLikeCount={curationLikeCount}
                />
              ))
            ) : (
              <Comment>엇, 지금은 베스트 큐레이션이 없어요 🫥</Comment>
            )}
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
  padding-bottom: 35rem;
  & > * {
    width: 60rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -1rem;
  margin: 0rem -1.2rem -3rem 3rem;
`;

const CreateButton = styled.div`
  width: 9.5rem;
  margin: 2rem 5rem;
`;

const Section = tw.div`
  h-64
  mt-5
  mb-10
  [> div]:flex
  [> div]:justify-between
  [> div > a > label]:last:text-black
  [> div > a > label]:last:cursor-pointer
  [> br]:mt-2
  [> ul]:mt-5
  [> ul]:flex
  [> ul]:justify-between
  [> ul]:flex-wrap
`;

const Comment = tw.p`
  w-full
  mt-20
  text-center
  text-lg
  font-extrabold
  text-red-900
`;

export default BestCurationPage;
