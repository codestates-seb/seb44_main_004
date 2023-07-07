import tw from 'twin.macro';
import styled from "styled-components";

import BookImg from '../../img/book_example.jpeg';

const ReplyProfileInfo = () => {
  return (
    <InfoContainer>
      <ProfileInfoLeft>
        <BookInfoAll>
          <BookImage>
            <DefaultImg src={BookImg} alt="profileImg" />
            <BookInfoContainer>
              <BookTitle>나는 앞으로 몇 번의 보름달을 볼 수 있을까</BookTitle>
              <BookLine />
              <BookInfo>류이치 사카모토</BookInfo>
              <BookInfo>위즈덤 하우스</BookInfo>
            </BookInfoContainer>
          </BookImage>
        </BookInfoAll>
      </ProfileInfoLeft>
    </InfoContainer>
  );
};

export default ReplyProfileInfo;

const InfoContainer = tw.section`
  w-full
  flex
  justify-between
`;

const ProfileInfoLeft = styled.div`
  > div {
    margin: 1rem 0rem;
  }
`;

const BookInfoAll = tw.div`
  flex
  items-center
`;

const BookImage = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const DefaultImg = styled.img`
  ${tw`
    rounded-none
    w-20
    h-28
    mr-3
  `}
`;

const BookInfoContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-start
  `}
`;

const BookTitle = tw.p`
  text-lg
  font-bold
  mb-6
  text-[#3173f6]
`;

const BookLine = styled.div`
  position: absolute;
  left: 9.6rem;
  right: 56.25rem;
  bottom: 4rem;
  height: 0.1px;
  background-color: #D1D5DB;
`;

const BookInfo = tw.p`
  text-lg
  font-thin
`;