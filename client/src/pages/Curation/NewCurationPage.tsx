import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';

import CategoryTag from '../../components/category/CategoryTag';
import { newlyCurationAPI } from '../../api/curationApi';
import { ICurationResponseData } from '../../types/main';
import CurationCard from '../../components/cards/CurationCard';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import Footer from '../../components/Footer/Footer';
import ClockLoading from '../../components/Loading/ClockLoading';

const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const NewCurationPage = () => {
  const [newCurations, setNewCurations] = useState<ICurationResponseData[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalNewPage, setTotalNewPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const itemsPerPage = 9;

  const fetchNewCurationData = async () => {
    setIsLoading(true);
    const response = await newlyCurationAPI(page + 1, itemsPerPage);
    if (!response?.data.data.length) {
      setIsLoading(false);
    } else {
      setNewCurations(response.data.data);
      setTotalNewPage(response.data.pageInfo.totalPages);
      setIsLoading(false);
    }
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected);
  };

  useEffect(() => {
    fetchNewCurationData();
  }, [page]);

  return (
    <>
      <Container>
        <TitleContainer>
          <Label type="title" content="큐레이션 카테고리" />
          <CreateButton>
            <Link to="/write">
              <Button type="create" content="﹢ 큐레이션 발행하기" />
            </Link>
          </CreateButton>
        </TitleContainer>
        <CategoryTag />
        <Section>
          <Label type="title" content="New 큐레이션" />
          <br />
          <Label content="가장 트렌디한 후즈북 큐레이션을 소개합니다." />
          <ul>
            {isLoading && (!newCurations || newCurations.length === 0) ? (
              <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
            ) : (
              newCurations?.map((e) => (
                <Link key={e.curationId} to={`/curations/${e.curationId}`}>
                  <CurationCard
                    emoji={e.emoji}
                    title={e.title}
                    content={e.content}
                    curationLikeCount={e.curationLikeCount}
                    nickname={e.curator.nickname}
                  />
                </Link>
              ))
            )}
            {!isLoading && newCurations && newCurations.length === 0 && (
              <Comment>앗, 지금은 새로운 큐레이션이 없어요🫥</Comment>
            )}
          </ul>
        </Section>
        {newCurations && (
          <PaginationContainer>
            <ReactPaginate
              pageCount={totalNewPage}
              onPageChange={handlePageChange}
              forcePage={page}
              containerClassName={'pagination'}
              activeClassName={'active'}
              nextLabel=">"
              previousLabel="<"
            />
          </PaginationContainer>
        )}
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
  [> ul]:gap-x-7 gap-y-7
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

const PaginationContainer = styled.div`
  margin-top: 30rem;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    li {
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

export default NewCurationPage;
