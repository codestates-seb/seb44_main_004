import { useState, ChangeEvent } from 'react';
import tw from 'twin.macro';
import styled from "styled-components";

import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import CurationProfileInfo from '../../components/curations/CurationProfileInfo';
import CurationDetailInfo from '../../components/curations/CurationDetailInfo';
import ReplyProfileInfo from '../../components/replies/ReplyProfileInfo';
import BookInfo from '../../components/curations/BookInfo';
import CurationCreatedDate from '../../components/curations/CurationCreatedDate';
import ReplyCreatedDate from '../../components/replies/ReplyCreatedDate';

const CurationDetailPage = () => {
  const [replyValue, setReplyValue] = useState('');

  return (
    <Container>
      <FormContainer>
        <TitleContainer>
          🌝 류이치 사카모토가 살아생전 마지막으로 전하는 이야기
        </TitleContainer>
        <GridContainer>
          <DetailInfoLeft>
            <CurationDetailInfo/>
          </DetailInfoLeft>
          <DetailInfoRight>
            <CurationProfileInfo/>
            <CurationCreatedDate/>
          </DetailInfoRight>
        </GridContainer>
        <ContentContainer>
          활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도
          5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토.
          『나는 앞으로 몇 번의 보름달을 볼 수 있을까』는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘어
          오래도록 기억될 그의 음악과 깊은 사유에 관한 기록이다. 여러 차례 암 수술을 받고 암과 싸우는 것이 아니라, 암과 살아가기”로 마음먹었다고 담담히 당시의 상황을 전하며 시작되는 이야기는
          그간의 음악적 여정을 따라 흘러가되, 때때로 시간의 틀에서 벗어나 그의 세계관과 철학이 엿보이는 깊고 자유로운 사유와 담론으로 이어진다.
          활동가 류이치 사카모토가 살아생전 마지막으로 전하는 이야기. 2020년, 암의 재발과 전이로 인해 치료를 받더라도5년 이상 생존율은 50퍼센트라는 진단을 받고서 시간의 유한함에 직면하게 된 류이치 사카모토.
          『나는 앞으로 몇 번의 보름달을 볼 수 있을까』 는 그런 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.
        </ContentContainer>
        <ItemContainer>
          <Label type="title" htmlFor="title" content="추천하는 책" />
          <BookInfo/>
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
  font-size: 2rem;
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
  font-size: 1.3rem;
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
  padding: 1rem 2rem;
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
