import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import CategoryTag from '../components/category/categoryTag';
import { recentlyRegisteredCurationAPI } from '../api/mainPageApi';
import { ICurationResponseData } from '../types/main';
import CurationCard from '../components/cards/CurationCard';
import Footer from '../components/Footer/Footer';
import ClockLoading from '../components/Loading/ClockLoading';

const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const NewCurationPage = () => {
  const [newCurations, setNewCurations] = useState<ICurationResponseData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    fetchNewCurationsData();
  }, []);

  return (
    <>
      <Container>
        <CategoryTag/>
        <Section>
          <ul>
            {isLoading && !newCurations?.length ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : newCurations?.length ? (
              newCurations?.map(({ emoji, title, content, curationLikeCount }) => (
                  <CurationCard emoji={emoji} title={title} content={content} curationLikeCount={curationLikeCount} />
              ))
            ) : (
              <Comment>엇, 지금은 새로운 큐레이션이 없어요 🫥</Comment>
            )}
          </ul>
        </Section>
        <Section>
          <ul>
            {isLoading && !newCurations?.length ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : newCurations?.length ? (
              newCurations?.map(({ emoji, title, content, curationLikeCount }) => (
                  <CurationCard emoji={emoji} title={title} content={content} curationLikeCount={curationLikeCount} />
              ))
            ) : (
              <Comment>엇, 지금은 새로운 큐레이션이 없어요 🫥</Comment>
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
  & > * {
    width: 950px;
  }
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

export default NewCurationPage;
