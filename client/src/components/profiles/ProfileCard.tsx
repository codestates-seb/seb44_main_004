import ReactPaginate from 'react-paginate';

import tw from 'twin.macro';
import styled from 'styled-components';

import { CurationType, UserPageType } from '../../types';
import { ProfileCardProps } from '../../types/card';
import SubCuratorCard from '../cards/SubCuratorCard';
import CurationCard from '../cards/CurationCard';

const ProfileCard = ({
  type,
  curations,
  curators,
  totalPage,
  page,
  handlePageChange,
}: ProfileCardProps) => {
  return (
    <>
      {curations && (
        <>
          <CurationsDiv>
            {curations &&
              curations.map((e, idx) => (
                <CurationCard
                  key={type === UserPageType.MYPAGE ? `my ${idx}` : `${e.memberNickname} ${idx}`}
                  type={
                    type === UserPageType.MYPAGE || UserPageType.USERPAGE
                      ? CurationType.MYPAGE
                      : CurationType.LIST
                  }
                  emoji={e.emoji}
                  title={e.title}
                  content={e.content}
                  curationLikeCount={e.curationLikeCount}
                  memberNickname={e.memberNickname}
                  memberId={e.memberId}
                  curationId={e.curationId}
                  image={e.memberImageUrl}
                />
              ))}
          </CurationsDiv>
        </>
      )}

      {curators && (
        <>
          <CuratorDiv>
            {curators &&
              curators.map((e, idx) => (
                <SubCuratorCard
                  key={`my sub ${idx}`}
                  memberId={e.memberId}
                  email={e.email}
                  nickname={e.nickname}
                  introduction={e.introduction}
                  image={e.image}
                  mySubscriber={e.mySubscriber}
                  myCuration={e.myCuration}
                  memberStatus={e.memberStatus}
                />
              ))}
          </CuratorDiv>
        </>
      )}

      <PaginationContainer>
        <ReactPaginate
          pageCount={totalPage}
          onPageChange={handlePageChange}
          forcePage={page}
          containerClassName={'pagination'}
          activeClassName={'active'}
          nextLabel=">"
          previousLabel="<"
        />
      </PaginationContainer>
    </>
  );
};
const CurationsDiv = tw.div`
    flex
    flex-[1_1_50%]
    flex-wrap
    justify-between
    mt-[1rem]
`;
const CuratorDiv = tw.div`
    flex
    flex-wrap
    justify-between
`;

export const PaginationContainer = styled.div`
  margin: 1rem 0;
  > ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    text-align: center;
    > li {
      margin: 0 0.3rem;
      width: 2rem;
      height: 2rem;
      padding: 0.3rem;
      border-radius: 100%;
      cursor: pointer;
      a {
        display: inline-block;
        text-decoration: none;
        border-radius: 3px;
        text-align: center;
      }
      &.active {
        background-color: #3173f6;
        color: #fff;
        border-radius: 100%;
        a {
          color: #fff;
        }
      }
      &:hover {
        a {
          color: #3173f6;
        }
      }
    }
  }
`;
export default ProfileCard;
