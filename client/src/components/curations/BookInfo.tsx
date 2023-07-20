import tw from 'twin.macro';
import styled from 'styled-components';
import { SelectedBook } from '../../pages/Curation/CurationWritePage';

const BookInfo = ({ books }: { books: SelectedBook }) => {
  return (
    <InfoContainer>
      <ProfileInfoLeft>
        <BookLine />
        <BookInfoAll>
          <ThumbnailInfo src={books.thumbnail} alt="BookImage"></ThumbnailInfo>
          <BookInfoContainer>
            <TitleInfo>
              <a href={books.url}>{books.title}</a>
            </TitleInfo>
            <AuthorInfo>{books.authors}</AuthorInfo>
            <PublisherInfo>{books.publisher}</PublisherInfo>
          </BookInfoContainer>
        </BookInfoAll>
      </ProfileInfoLeft>
    </InfoContainer>
  );
};

export default BookInfo;

const InfoContainer = tw.section`
  w-full
  flex
  justify-between
`;

const ProfileInfoLeft = styled.div`
  > div {
    margin: 0;
  }
`;

const BookLine = styled.div`
  border: 0.01rem solid #d9d9d9;
`;

const BookInfoAll = tw.div`
  flex
  items-center
`;

const ThumbnailInfo = styled.img`
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

const TitleInfo = tw.p`
  text-sm
  font-bold
  mb-2
  text-[#3173f6]
  cursor-pointer
`;

const AuthorInfo = tw.p`
text-sm
font-thin
`;

const PublisherInfo = tw.p`
text-sm
font-thin
`;
