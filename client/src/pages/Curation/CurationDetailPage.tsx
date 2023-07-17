import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';
import { AiOutlineMore } from 'react-icons/ai';
import { AxiosError } from 'axios';

import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import CurationProfileInfo from '../../components/curations/CurationProfileInfo';
import CurationDetailInfo from '../../components/curations/CurationDetailInfo';
import CurationCreatedDate from '../../components/curations/CurationCreatedDate';
import ReplyProfileInfo from '../../components/replies/ReplyProfileInfo';
import ReplyCreatedDate from '../../components/replies/ReplyCreatedDate';
import { axiosInstance } from '../../api/axios';
// import BookInfo from '../../components/curations/BookInfo';
// import { SelectedBook } from './CurationWritePage';

// interface CurationDetailPageProps {
//   selectedBook: SelectedBook;
// }

export interface Curation {
  isSubscribed: boolean;
  curationLikeCount: number;
  curationId: number;
  emoji: string;
  title: string;
  content: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
  curator: Curator;
  deleted: boolean;
}

export interface Curator {
  memberId: number; //바뀐 부분 -> string 에서 number
  email: string;
  nickname: string;
  introcution: string | null;
}

const CurationDetailPage = () => {
  const [isEditDeleteVisible, setIsEditDeleteVisible] = useState(false);
  const handleToggleEditDelete = () => {
    setIsEditDeleteVisible(!isEditDeleteVisible);
  };
  const [curation, setCuration] = useState<Curation>();
  const [curator, setCurator] = useState<Curator>();
  const [isSubscribe, setIsSubscribe] = useState<boolean>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState('');
  const { curationId } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (curation && !curation.deleted) {
      navigate(`/edit/${curationId}`);
    } else {
      alert('이 큐레이션은 이미 삭제되었어요 🫥');
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/curations/${curationId}`);
      alert('큐레이션이 정상적으로 삭제되었어요!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('큐레이션을 찾을 수 없어요 😔');
    }
  };
  useEffect(() => {
    const fetchCuration = async () => {
      try {
        const response = await axiosInstance.get(`/curations/${curationId}`);
        const curationData = response.data;
        setCuration(curationData);
        setCurator(curationData.curator);
        setIsSubscribe(curationData.isSubscribed);
      } catch (error: unknown) {
        console.error(error);
        if ((error as AxiosError)?.response?.status === 404) {
          alert('이 큐레이션은 이미 삭제되었어요 🫥');
          navigate('/');
          // TODO: 404 에러 페이지로 연결 예정
        } else if ((error as AxiosError)?.response?.status === 403) {
          alert('비밀 글로 작성된 큐레이션 이에요 🔒');
          navigate('/');
        }
      }
    };
    fetchCuration();
  }, [curationId, navigate, isLike]);

  useEffect(() => {
    if (curation && curation.deleted) {
      alert('이 큐레이션은 이미 삭제되었어요 🫥');
      navigate('/');
    }
  }, [curation, navigate]);

  const isAuthor = () => {
    if (curation && curator) {
      return curation.curator.memberId === curator.memberId;
    }
    return false;
  };

  if (curation?.visibility === 'SECRET' && !isAuthor()) {
    return null;
  }

  return (
    <Container>
      <FormContainer>
        {curation && (
          <>
            <TitleContainer>
              {curation.emoji}
              <DoubleSpace />
              {curation.title}
              {isAuthor() && (
                <EditDeleteContainer onClick={handleToggleEditDelete}>
                  <AiOutlineMore />
                  {isEditDeleteVisible && (
                    <EditDeleteButton isVisible={isEditDeleteVisible}>
                      <EditButton onClick={handleEdit}>수정하기</EditButton>
                      <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                    </EditDeleteButton>
                  )}
                </EditDeleteContainer>
              )}
            </TitleContainer>
            <GridContainer>
              <DetailInfoLeft>
                <CurationDetailInfo
                  isLike={isLike}
                  setIsLike={setIsLike}
                  curationLikeCount={curation?.curationLikeCount}
                  curatorId={curator?.memberId}
                  curationId={curationId}
                />
              </DetailInfoLeft>
              <DetailInfoRight>
                <CurationProfileInfo
                  curator={curator?.nickname}
                  curatorId={curator?.memberId}
                  isSubscribe={isSubscribe}
                  setIsSubscribe={setIsSubscribe}
                />
                <CurationCreatedDate createdAt={curation.createdAt} />
                {/* TODO: createdAt 업로드 일자로 반영 */}
              </DetailInfoRight>
            </GridContainer>
            <ContentContainer>
              <div dangerouslySetInnerHTML={{ __html: `${curation.content}` }} />
            </ContentContainer>
            <ItemContainer>
              <Label type="title" htmlFor="title" content="추천하는 책" />
              {/* {curation && <BookInfo book={curation.selectedBook} />} */}
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
              <CreateButton>
                <Button type="primary" content="등록" />
              </CreateButton>
            </ButtonContainer>
            <ItemContainer>
              <Label type="title" htmlFor="replycount" content="댓글 2개" />
              <CommentContainer>
                <ReplyProfileInfo />
                어쿠스틱과 일렉트로닉, 클래식과 팝 음악의 경계에서 완벽하게 자유로웠던 우리 시대
                최고의 마에스트로 최고다!!~~~
                <ReplyCreatedDate />
              </CommentContainer>
              <CommentContainer>
                <ReplyProfileInfo />
                그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑, 자연과 철학, 그리고
                시간을 뛰어넘는다. 그가 삶의 마지막 고비에서 되돌아본 인생과 예술, 우정과 사랑,
                자연과 철학, 그리고 시간을 뛰어넘는다. 그가 삶의 마지막 고비에서 되돌아본 인생과
                예술, 우정과 사랑, 자연과 철학, 그리고 시간을 뛰어넘는다.
                <ReplyCreatedDate />
              </CommentContainer>
            </ItemContainer>
            <ButtonContainer>
              <DetailButton>
                <Button type="detail" content="더보기" />
              </DetailButton>
            </ButtonContainer>
          </>
        )}
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 4rem 0rem 2rem 0rem;
  text-align: left;
  font-size: 1.5rem;
`;

const EditDeleteContainer = styled.div`
  position: relative;
  margin: 0.6rem;
  margin-left: auto;
`;

const EditButton = styled.button`
  padding: 0.3rem 1.2rem;
  padding: 0.7rem;
  cursor: pointer;
  font-size: 1rem;
  color: #3173f6;
`;

const DeleteButton = styled.button`
  padding: 1rem 1.2rem 0.3rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  border-top: 0.06rem solid #ccc;
  color: #fd8f8f;
`;

const EditDeleteButton = styled.div<{ isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 7.5rem;
  background-color: #fff;
  padding: 0.6rem;
  margin: 0.625rem;
  border: 0.06rem solid #ccc;
  border-radius: 0.3rem;
  align-items: center;
  visibility: ${(props) => (props.isVisible ? 'PUBLIC' : 'SECRET')};
`;

const DoubleSpace = styled.span`
  margin-right: 0.5em;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
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
  line-height: 2rem;
  img {
    max-width: 100%;
    height: auto;
  }
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
  margin: 0.4rem 0rem;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: left;
  font-size: 1rem;
  line-height: 1.6rem;
  background-color: #f8f7f7;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.6rem;
  margin-right: -0.5rem;
`;

const CancelButton = styled.div`
  margin: 0.6rem;
`;

const CreateButton = styled.div`
  margin: 0.6rem;
`;

const DetailButton = styled.div`
  margin-right: 22.7rem;
  margin-top: 0.6rem;
`;
