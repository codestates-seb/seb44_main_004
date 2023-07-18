import ReactPaginate from 'react-paginate';

import tw from 'twin.macro';
import styled from 'styled-components';

import { CurationType, UserPageType } from '../../types';
import { ProfileCardProps } from '../../types/card';
import SubCuratorCard from '../cards/SubCuratorCard';
import CurationCard from '../cards/CurationCard';

const ProfileCard = ({
  type,
  nickname,
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
                  key={type === UserPageType.MYPAGE ? `my ${idx}` : `${nickname} ${idx}`}
                  type={
                    type === UserPageType.MYPAGE || UserPageType.USERPAGE
                      ? CurationType.MYPAGE
                      : CurationType.LIST
                  }
                  emoji={e.emoji}
                  title={e.title}
                  content={e.content}
                  like={e.like}
                  nickname={nickname}
                  memberId={e.memberId}
                  curationId={e.curationId}
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

      <PaginationZone>
        <ReactPaginate
          pageCount={totalPage}
          onPageChange={handlePageChange}
          forcePage={page}
          containerClassName={'pagination'}
          activeClassName={'active'}
          nextLabel=">"
          previousLabel="<"
        />
      </PaginationZone>
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

const PaginationZone = styled.div`
  margin: 1rem 0;
  > ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    > li {
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

export default ProfileCard;
