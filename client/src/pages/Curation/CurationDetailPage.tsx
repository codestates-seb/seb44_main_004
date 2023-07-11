import { useState, useEffect, ChangeEvent } from 'react';
import tw from 'twin.macro';
import styled from "styled-components";
import axios from 'axios';

import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import CurationProfileInfo from '../../components/curations/CurationProfileInfo';
import CurationDetailInfo from '../../components/curations/CurationDetailInfo';
import ReplyProfileInfo from '../../components/replies/ReplyProfileInfo';
import BookInfo from '../../components/curations/BookInfo';
import CurationCreatedDate from '../../components/curations/CurationCreatedDate';
import ReplyCreatedDate from '../../components/replies/ReplyCreatedDate';
import { SelectedBook } from './CurationWritePage';

interface CurationDetailPageProps {
  curationContent: string;
  selectedBook: SelectedBook;
}

const CurationDetailPage: React.FC<CurationDetailPageProps> = ({ selectedBook }) => {
  const [curationContent, setCurationContent] = useState('');
  const [curation, setCuration] = useState<any>(null);
  const [titleValue, setTitleValue] = useState('');
  const [emojiValue, setEmojiValue] = useState('');
  const [replyValue, setReplyValue] = useState('');

  useEffect(() => {
    const fetchCuration = async () => {
      try {
        // 1. GET 요청
        const response = await axios.get('/curations/${curationId}');
        // 2. 서버에서 받아온 큐레이션 데이터
        const curationData = response.data;
        // 3. 받아온 큐레이션 데이터를 상태에 저장
        setCuration(curationData);
      } catch (error) {
        console.error(error);
      }
    };
      // 4. 서버에서 해당 큐레이션 글을 가져오고 curation 상태에 저장
    fetchCuration();
  }, []);

  return (
    <Container>
      <FormContainer>
        <TitleContainer>
          {emojiValue} {titleValue}
        </TitleContainer>
        <GridContainer>
          <DetailInfoLeft>
            <CurationDetailInfo curationContent={curation ? curation.content : ''} selectedBook={curation ? curation.selectedBook : null} />
          </DetailInfoLeft>
          <DetailInfoRight>
            <CurationProfileInfo />
            <CurationCreatedDate />
          </DetailInfoRight>
        </GridContainer>
        <ContentContainer>
          {curationContent}
        </ContentContainer>
        <ItemContainer>
          <Label type="title" htmlFor="title" content="추천하는 책" />
          {curation && <BookInfo book={curation.selectedBook} />}
        </ItemContainer>
        <ItemContainer>
          <Label type="title" htmlFor="reply" content="댓글 쓰기" />
          <Input
            id="title"
            width="100%"
            color="#000"
            value={replyValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setReplyValue(e.target.value)}
          />
        </ItemContainer>
        <ButtonContainer>
          <CancelButton>
            <Button type="cancel" content="취소" />
          </CancelButton>
          <PrimaryButton>
            <Button type="primary" content="등록" />
          </PrimaryButton>
        </ButtonContainer>
        <ItemContainer>
          <Label type="title" htmlFor="replycount" content= "댓글 2개" />
          <CommentContainer>
            <ReplyProfileInfo/>
              어쿠스틱과 일렉트로닉, 클래식과 팝 음악의 경계에서 완벽하게 자유로웠던 우리 시대 최고의 마에스트로 최고다!!~~~
            <ReplyCreatedDate/>
          </CommentContainer>
          <CommentContainer>
            <ReplyProfileInfo/>
              그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.
              그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.
              그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.
            <ReplyCreatedDate/>
          </CommentContainer>
        </ItemContainer>
        <ButtonContainer>
          <DetailButton>
            <Button type="detail" content="더보기" />
          </DetailButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default CurationDetailPage;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 0rem 3rem 2rem 3rem;
  width: 80rem;
  margin-bottom: 8rem;
`;

const TitleContainer = styled.div`
  margin: 4rem 0rem 2rem 0rem;
  text-align: left;
  font-size: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 43rem;
`;

const DetailInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const DetailInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ContentContainer = styled.div`
  margin: 3rem 0rem;
  text-align: left;
  font-size: 1.2rem;
  line-height: 2.3rem;
`;

const ItemContainer = tw.div`
  bg-inherit
  flex
  flex-col
  mt-14
  w-full
  [> input]:h-20
  [> label]:mb-4 
  [> button]:mb-3
`;

const CommentContainer = styled.div`
  width: 70%;
  margin: .4rem 0rem;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: left;
  font-size: 1rem;
  line-height: 1.6rem;
  background-color: #F8F7F7;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: .6rem;
  margin-right: -0.5rem;
`;

const CancelButton = styled.div`
  margin: .6rem;
`;

const PrimaryButton = styled.div`
  margin: .6rem;
`;

const DetailButton = styled.div`
  margin-right: 22.7rem;
  margin-top: .6rem;
`;
