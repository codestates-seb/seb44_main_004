import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMore } from 'react-icons/ai';
import { AxiosError } from 'axios';

import tw from 'twin.macro';
import styled from 'styled-components';

import Modal from '../../components/modals/Modal';
import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import ProfileImg from '../../img/profile_img2.png';
import BookInfo from '../../components/curations/BookInfo';
import ClockLoading from '../../components/Loading/ClockLoading';
import CurationProfileInfo from '../../components/curations/CurationProfileInfo';
import CurationDetailInfo from '../../components/curations/CurationDetailInfo';
import CurationCreatedDate from '../../components/curations/CurationCreatedDate';
import ReplyProfileInfo from '../../components/replies/ReplyProfileInfo';

import { ModalType } from '../../types';
import { RootState } from '../../store/store';
import { axiosInstance } from '../../api/axios';
import { SelectedBook } from './CurationWritePage';
import { customAlert } from '../../components/alert/sweetAlert';
import { saveReplies, addReply, deleteReply, updateReply } from '../../store/repliesSlice';
import { getRepliesAPI, postReplyAPI, updateReplyAPI, deleteReplyAPI } from '../../api/replyApi';
import Footer from '../../components/Footer/Footer';

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
  books: SelectedBook;
  category: string;
}

export interface Curator {
  memberId: number;
  email: string;
  nickname: string;
  introcution: string | null;
  image: string | null;
}
export interface Reply {
  replyId: number;
  memberId: number;
  nickname: string;
  content: string;
  cratedAt: string;
  updatedAt: string;
  imgaeUrl: string;
}
const loadingStyle = {
  width: '80vw',
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CurationDetailPage = () => {
  const [isModal, setIsModal] = useState<boolean>();

  const [isEditDeleteVisible, setIsEditDeleteVisible] = useState(false);
  const handleToggleEditDelete = () => {
    setIsEditDeleteVisible(!isEditDeleteVisible);
  };
  const [curation, setCuration] = useState<Curation>();
  const [curator, setCurator] = useState<Curator>();
  const [isSubscribe, setIsSubscribe] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [books, setBooks] = useState<SelectedBook>();

  const [replyValue, setReplyValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndexes, setEditingIndexes] = useState<boolean[]>([]);
  const [editReplyValue, setEditReplyValue] = useState<string>('');

  const [totalElement, setTotalElement] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1);

  const replies = useSelector((state: RootState) => state.replies?.replies);
  const { memberId } = useSelector((state: RootState) => state.user);
  const { curationId } = useParams();

  const [deleteId, setDeleteId] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const { from } = location.state || { from: '/' };
  const SIZE = 5;

  const handleEdit = () => {
    if (curation && !curation.deleted) {
      navigate(`/edit/${curationId}`);
    } else {
      customAlert({
        title: '삭제 완료',
        text: '이 큐레이션은 이미 삭제되었어요 🫥',
        icon: 'info',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
      });
      navigate(from);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/curations/${curationId}`);
      customAlert({
        title: '삭제 완료',
        text: '이 큐레이션은 이미 삭제되었어요 🫥',
        icon: 'info',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
      });
      navigate(from);
    } catch (error) {
      console.error(error);
      customAlert({
        title: '큐레이션 찾기 실패',
        text: '큐레이션을 찾을 수 없어요 😔',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
      });
      navigate(from);
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
          customAlert({
            title: '삭제 완료',
            text: '이 큐레이션은 이미 삭제되었어요 🫥',
            icon: 'info',
            confirmButtonText: '확인',
            confirmButtonColor: '#d33',
          });
          navigate(from);
        } else if ((error as AxiosError)?.response?.status === 403) {
          customAlert({
            title: '비밀 글',
            text: '비밀 글로 작성된 큐레이션 이에요 🔒',
            icon: 'info',
            confirmButtonText: '확인',
            confirmButtonColor: '#d33',
          });
          navigate(from);
        }
      }
    };

    fetchCuration();
  }, []);

  const getReplies = async () => {
    setIsLoading(true);

    const params = {
      page: 1,
      size: SIZE * limit,
    };
    const response = await getRepliesAPI(Number(curationId), params);
    if (!response?.data.data.length) {
      const newReplies = response?.data.data;
      dispatch(saveReplies(newReplies));
      setIsLoading(false);
    } else if (response.data.data.length) {
      const newReplies = response.data.data;
      dispatch(saveReplies(newReplies));
      setTotalElement(response.data.pageInfo.totalElement);
    }
    setIsLoading(false);
  };

  const handleCommentRegister = async () => {
    if (!replyValue.length) {
      customAlert({
        title: '내용을 입력해주세요.',
        text: '내용입력을 필수로 해주셔야 등록이 가능합니다!',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#eba430',
      });
    } else {
      const data = {
        content: replyValue,
      };
      const response = await postReplyAPI(Number(curationId), data);
      if (response) {
        const newReply = response.data;
        dispatch(addReply(newReply));
        setReplyValue('');
        getReplies();
      } else {
        customAlert({
          title: '댓글 실패',
          text: '댓글은 로그인 기능 이후 가능합니다.',
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleCommentCancel = () => {
    setReplyValue('');
  };

  const handleCommentEdit = (content: string, idx: number) => {
    setIsEditing(!isEditing);
    setEditReplyValue(content);
    const updatedIndexes = [...editingIndexes];
    updatedIndexes[idx] = !updatedIndexes[idx];
    setEditingIndexes(updatedIndexes);
  };
  const isValidReply = (data: string) => {
    if (data.length === 0) return false;
    return true;
  };
  const handleEditComplete = async (replyId: number, idx: number) => {
    if (isValidReply(editReplyValue)) {
      const editData = {
        content: editReplyValue,
      };

      const response = await updateReplyAPI(replyId, editData);
      if (response) {
        const updatedReply = {
          replyId,
          imageUrl: replies[idx].imageUrl,
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
    }
  };
  const handleModal = () => {
    setIsModal(!isModal);
  };
  const handleCommentDelete = async (replyId: number) => {
    handleModal();
    setDeleteId(replyId);
  };
  const handleCompleteCommentDelete = async () => {
    const response = await deleteReplyAPI(deleteId);
    if (response) {
      dispatch(deleteReply(deleteId));
      getReplies();
      handleModal();
    }
  };
  const hanldeMoreComment = () => {
    setLimit((prevLimit) => prevLimit + 1);
  };

  useEffect(() => {
    if (curation && curation.deleted) {
      customAlert({
        title: '삭제 완료',
        text: '이 큐레이션은 이미 삭제되었어요 🫥',
        icon: 'info',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
      });
      navigate(from);
    }
  }, [curation, navigate]);

  useEffect(() => {
    getReplies();
  }, [limit]);

  const isAuthor = () => {
    if (curation && curator) {
      //큐레이션 작성자의 memberId 와 로그인 된 유저의 memberId 비교
      return memberId === curator.memberId;
    }
    return false;
  };

  if (curation?.visibility === 'SECRET' && !isAuthor()) {
    return null;
  }

  return (
    <>
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
                    curationId={Number(curationId)}
                    category={curation.category}
                  />
                </DetailInfoLeft>
                <DetailInfoRight>
                  <CurationProfileInfo
                    curator={curator?.nickname}
                    curatorId={curator?.memberId}
                    curatorImage={curator?.image}
                    isSubscribe={isSubscribe}
                    setIsSubscribe={setIsSubscribe}
                  />
                  <CurationCreatedDate createdAt={curation.createdAt} />
                </DetailInfoRight>
              </GridContainer>
              <ContentContainer className="content-container">
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
                <RepliesTitle>댓글 {replies?.length | 0}개</RepliesTitle>
                {isLoading && !replies?.length ? (
                  <ClockLoading color="#3173f6" style={{ ...loadingStyle }} />
                ) : replies?.length ? (
                  replies?.map((e, idx: number) => {
                    const isEditing = editingIndexes[idx];
                    return (
                      <ReplyContainer key={idx} className="reply-container">
                        {isEditing ? (
                          <EditContainer key={`edit ${idx}`}>
                            <UserInfo>
                              <ProfileImage>
                                <DefaultImg src={e.imageUrl || ProfileImg} alt="profileImg" />
                              </ProfileImage>
                              <Nickname>{e.nickname}</Nickname>
                            </UserInfo>
                            <Input
                              id="title"
                              width="100%"
                              color="#000"
                              value={editReplyValue}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setEditReplyValue(e.target.value)
                              }
                            />
                            {!isValidReply(editReplyValue) && <Valid>댓글을 적어주세요.</Valid>}
                            <ButtonZone>
                              <Button
                                type="detail"
                                content="수정완료"
                                onClick={() => handleEditComplete(e.replyId, idx)}
                              />
                            </ButtonZone>
                          </EditContainer>
                        ) : (
                          <CommentContainer key={`comment ${idx}`}>
                            <ReplyProfileInfo
                              key={`comment ${idx}`}
                              replierId={e.memberId}
                              replyId={e.replyId}
                              nickname={e.nickname}
                              imageUrl={e.imageUrl}
                              content={e.content}
                              handleCommentEdit={() => handleCommentEdit(e.content, idx)}
                              handleCommentDelete={() => handleCommentDelete(e.replyId)}
                            />
                            {e.content}
                            <CurationCreatedDate createdAt={e.createdAt} />
                          </CommentContainer>
                        )}
                      </ReplyContainer>
                    );
                  })
                ) : (
                  <Comment className="reply-container">첫 댓글의 큐레이터가 되어 주세요 😊</Comment>
                )}
              </ItemContainer>

              <ButtonContainer>
                <DetailButton>
                  {replies.length < totalElement && (
                    <Button type="detail" content="더보기" onClick={hanldeMoreComment} />
                  )}
                </DetailButton>
              </ButtonContainer>
            </>
          )}
        </FormContainer>

        {isModal && (
          <Modal
            type={ModalType.REPLY}
            handleCloseModal={handleModal}
            handleCompleteCommentDelete={handleCompleteCommentDelete}
          />
        )}
      </Container>
      <Footer />
    </>
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
  width: 60rem;
  margin-bottom: 8rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
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
  font-family: 'SpoqaHanSansNeo-Regular';
`;

const DeleteButton = styled.button`
  padding: 1rem 1.2rem 0.3rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  border-top: 0.06rem solid #ccc;
  color: #fd8f8f;
  font-family: 'SpoqaHanSansNeo-Regular';
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
  display: flex;
  justify-content: space-between;
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
  align-items: flex-end;
`;

const ContentContainer = styled.div`
  margin: 3rem 0rem;
  text-align: left;
  font-size: 1rem;
  line-height: 1.7rem;
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

const UserInfo = tw.div`
    flex
    items-center
    mb-2
`;

const ProfileImage = tw.div`
  rounded-full
  w-8
  h-8
  mr-3
  overflow-hidden
  flex
  justify-center
  border-solid border-[1px] border-gray-300
`;

const DefaultImg = styled.img`
  height: inherit;
  object-fit: cover;
`;

const CommentContainer = styled.div`
  width: 100%;
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
  margin-right: 0.5rem;
  margin-top: 0.6rem;
`;

const EditContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0.4rem 0rem;
  text-align: left;
  font-size: 1rem;
  line-height: 1.6rem;
  background-color: ${({ theme }) => theme.colors.mainLightGray200};
  padding: 1.5rem;
  border-radius: 0.5rem;
  > input {
    width: 100%;
    height: 5rem;
    margin-top: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.mainLightGray400};
  }
`;

const ButtonZone = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Nickname = tw.p`
    text-xl
    font-thin
`;

const Valid = tw.div`
    text-red-500
    pt-[0.5rem]
    pl-[0.5rem]
    text-[0.7rem]
    font-semibold
`;

const ReplyContainer = tw.div``;

const RepliesTitle = tw.label`
  mb-[1rem]
  text-[1rem]
  font-bold
  text-black
`;

const Comment = tw.div`
  
`;
