import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineMore } from 'react-icons/ai';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import tw from 'twin.macro';
import styled from 'styled-components';

import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import CurationProfileInfo from '../../components/curations/CurationProfileInfo';
import CurationDetailInfo from '../../components/curations/CurationDetailInfo';
import CurationCreatedDate from '../../components/curations/CurationCreatedDate';
import ReplyProfileInfo from '../../components/replies/ReplyProfileInfo';
import ReplyCreatedDate from '../../components/replies/ReplyCreatedDate';
import { axiosInstance } from '../../api/axios';
import ClockLoading from '../../components/Loading/ClockLoading';
import { useDispatch } from 'react-redux';
import { saveReplies, addReply, deleteReply, updateReply } from '../../store/repliesSlice';
import { RootState } from '../../store/store';

import BookInfo from '../../components/curations/BookInfo';
import { SelectedBook } from './CurationWritePage';
import { paramsProps, getRepliesAPI } from '../../api/replyApi';

interface CurationDetailPageProps {
  selectedBook: SelectedBook;
}

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
  memberId: number;
  email: string;
  nickname: string;
  introcution: string | null;
}
export interface Reply {
  replyId: number;
  memberId: number;
  nickname: string;
  content: string;
  cratedAt: string;
  updatedAt: string;
}
const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CurationDetailPage = () => {
  const [isEditDeleteVisible, setIsEditDeleteVisible] = useState(false);
  const handleToggleEditDelete = () => {
    setIsEditDeleteVisible(!isEditDeleteVisible);
  };
  const [curation, setCuration] = useState<Curation>();
  const [curator, setCurator] = useState<Curator>();
  const [isSubscribe, setIsSubscribe] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editReplyValue, setEditReplyValue] = useState<string>('');
  const [totalElement, setTotalElement] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1);
  const [editingIndexes, setEditingIndexes] = useState<boolean[]>([]);

  const [books, setBooks] = useState<SelectedBook>();
  const { curationId } = useParams();

  const replies = useSelector((state: RootState) => state.replies.replies);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const SIZE = 5;
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
        setIsLiked(curationData.isLiked);
        setBooks(curationData.books[0]);
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
  }, [curationId, navigate, isLiked]);

  const getReplies = async () => {
    setIsLoading(true);

    const params: paramsProps = {
      page: 1,
      size: SIZE * limit,
    };
    const response = await getRepliesAPI(Number(curationId), params);
    if (!response?.data.data.length) {
      setIsLoading(false);
    } else if (response.data.data.length) {
      const newReplies = response.data.data;
      dispatch(saveReplies(newReplies));
      setTotalElement(response.data.pageInfo.totalElement);
    }
    setIsLoading(false);
  };

  //댓글 작성
  const handleCommentRegister = async () => {
    const data = {
      content: replyValue,
    };
    const response = await axiosInstance.post(`/curations/${curationId}/replies`, data);
    if (response) {
      const newReply = response.data;
      dispatch(addReply(newReply));
      setReplyValue('');
      getReplies();
    }
  };

  //댓글 취소
  const handleCommentCancel = () => {
    setReplyValue('');
  };

  //댓글 수정 클릭
  const handleCommentEdit = (content: string, idx: number) => {
    setIsEditing(!isEditing);
    setEditReplyValue(content);
    const updatedIndexes = [...editingIndexes];
    updatedIndexes[idx] = !updatedIndexes[idx];
    setEditingIndexes(updatedIndexes);
  };

  //댓글 수정 완료
  const handleEditComplete = async (replyId: number, idx: number) => {
    const editData = {
      content: editReplyValue,
    };
    const response = await axiosInstance.patch(`/curations/replies/${replyId}`, editData);
    if (response) {
      const updatedReply = {
        replyId: replyId,
        memberId: replies[idx].memberId,
        nickname: replies[idx].nickname,
        content: editReplyValue,
        createdAt: replies[idx].createdAt,
        updatedAt: new Date().toISOString(),
      };
      dispatch(updateReply(updatedReply));

      setIsEditing(!isEditing);
    }
    const updatedIndexes = [...editingIndexes];
    updatedIndexes[idx] = false;
    setEditingIndexes(updatedIndexes);
  };

  //댓글 삭제
  const handleCommentDelete = async (replyId: number) => {
    const response = await axiosInstance.delete(`/curations/replies/${replyId}`);
    if (response) {
      dispatch(deleteReply(replyId));
      getReplies();
    }
  };

  useEffect(() => {
    if (curation && curation.deleted) {
      alert('이 큐레이션은 이미 삭제되었어요 🫥');
      navigate('/');
    }
  }, [curation, navigate]);

  useEffect(() => {
    getReplies();
  }, [limit]);

  const isAuthor = () => {
    if (curation && curator) {
      return curation.curator.memberId === curator.memberId;
    }
    return false;
  };

  if (curation?.visibility === 'SECRET' && !isAuthor()) {
    return null;
  }

  const hanldeMoreComment = () => {
    setLimit((prevLimit) => prevLimit + 1);
  };
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
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
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
              </DetailInfoRight>
            </GridContainer>
            <ContentContainer>
              <div dangerouslySetInnerHTML={{ __html: `${curation.content}` }} />
            </ContentContainer>
            <ItemContainer>
              <Label type="title" htmlFor="title" content="추천하는 책" />
              {books && <BookInfo books={books} />}
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
                <Button type="cancel" content="취소" onClick={handleCommentCancel} />
              </CancelButton>
              <CreateButton>
                <Button type="primary" content="등록" onClick={handleCommentRegister} />
              </CreateButton>
            </ButtonContainer>
            <ItemContainer>
              <Label type="title" htmlFor="replycount" content="댓글 2개" />
              {isLoading && !replies?.length ? (
                <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
              ) : replies?.length ? (
                replies?.map((e, idx) => {
                  const isEditing = editingIndexes[idx];
                  return (
                    <ReplyContainer key={idx}>
                      {isEditing ? (
                        <EditContainer key={`edit ${idx}`}>
                          <Input
                            id="title"
                            width="70%"
                            color="#000"
                            value={editReplyValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setEditReplyValue(e.target.value)
                            }
                          />
                          <Button
                            type="detail"
                            content="수정완료"
                            onClick={() => handleEditComplete(e.replyId, idx)}
                          />
                        </EditContainer>
                      ) : (
                        <CommentContainer key={`comment ${idx}`}>
                          <ReplyProfileInfo
                            key={`comment ${idx}`}
                            replierId={e.memberId}
                            replyId={e.replyId}
                            nickname={e.nickname}
                            content={e.content}
                            handleCommentEdit={() => handleCommentEdit(e.content, idx)}
                            handleCommentDelete={handleCommentDelete}
                          />
                          {e.content}
                          <ReplyCreatedDate />
                        </CommentContainer>
                      )}
                    </ReplyContainer>
                  );
                })
              ) : (
                <div>댓글이 없습니다..</div>
              )}
            </ItemContainer>
            <ButtonContainer>
              <DetailButton>
                {totalElement && replies.length < totalElement && (
                  <Button type="detail" content="더보기" onClick={hanldeMoreComment} />
                )}
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

const EditContainer = tw.div`
  flex  
  gap-[2rem]
  [> input]:h-20
  [> button]:items-center
  
`;
const ReplyContainer = tw.div``;
