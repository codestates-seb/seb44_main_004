import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';
import axios from 'axios';
import ReactQuill from 'react-quill';

import QuillEditor from '../../components/quill/QuillEditor';
import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import SelectBox from '../../components/input/SelectBox';
import SearchModal from '../../components/modals/SearchModal';
import { axiosInstance } from '../../api/axios';
// import { Book, SelectedBook } from './CurationWritePage'; // TODO: 책 API 연동 백엔드 완료 시 작업 예정
import BookInfo from '../../components/curations/BookInfo';

export interface Book {
  authors: [];
  contents: string;
  datetiem: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: [];
  url: string;
}
export interface SelectedBook {
  title: string;
  authors: string;
  publisher: string;
  thumbnail: string;
  url: string;
  isbn: string;
}

export interface Curation {
  isSubscribed: boolean;
  like: number;
  curationId: number;
  emoji: string;
  title: string;
  content: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
  curator: Curator;
  categoryId: number;
  imageIds: number[];
  books: SelectedBook;
}

export interface Curator {
  memberId: string;
  email: string;
  nickname: string;
  introcution: string | null;
}

const CurationEditPage = () => {
  const [curation, setCuration] = useState<Curation>();
  const [titleValue, setTitleValue] = useState(curation?.title);
  const [emojiValue, setEmojiValue] = useState(curation?.emoji);
  const [contentValue, setContentValue] = useState(curation?.content);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [visibilityValue, setVisibilityValue] = useState(curation?.visibility);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [list, setList] = useState<Book[]>([]);
  const [book, setBook] = useState<SelectedBook | null>(null);
  // const [book, setBooks] = useState<SelectedBook | null>(null);
  const quillRef = useRef<ReactQuill | null>(null);
  const { curationId } = useParams();
  const navigate = useNavigate();

  const handleValidation = () => {
    if (!curation?.emoji) {
      alert('이모지를 입력해 주세요 😉'); // TODO: alert 대신 텍스트로 띄워주기, 조건문 한번에 묶기
      return false;
    }

    const emojiCount = curation?.emoji.trim().split(' ').length;
    if (emojiCount > 5) {
      alert('이모지는 최대 5개까지 입력할 수 있어요'); // TODO: alert 대신 텍스트로 띄워주기
      return false;
    }

    if (curation?.title.length === 0 || curation?.title.length > 30) {
      alert('제목은 1자 이상 30자 미만으로 입력해 주세요.'); // TODO: alert 대신 텍스트로 띄워주기
      return false;
    }

    if (curation?.content.length < 10) {
      alert('본문은 10자 이상으로 입력해 주세요.'); // TODO: alert 대신 텍스트로 띄워주기
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetchCuration = async () => {
      try {
        const response = await axiosInstance.get(`/curations/${curationId}`);
        const curationData = response.data;
        setCuration(curationData);
        setEmojiValue(curation?.emoji);
        setTitleValue(curation?.title);
        setContentValue(curation?.content);
        setImageIds(curationData.imageIds);
        setVisibilityValue(curation?.visibility);
        setBook(response.data.books);
        setCategoryId(response.data.categoryId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCuration();
  }, [curation?.content, curation?.emoji, curation?.title, curation?.visibility, curationId]);

  const handleEdit = async () => {
    const isValid = handleValidation();
    if (isValid) {
      try {
        const response = await axiosInstance.patch(`/curations/${curationId}`, {
          title: titleValue,
          emoji: emojiValue,
          content: contentValue,
          visibility: visibilityValue,
          categoryId: categoryId,
          imageIds: imageIds,
          books: book,
        });
        if (response) {
          navigate(`/curations/${curationId}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleCancel = () => {
    setTitle('');
    setList([]);
    setBook(null);
    handleModal();
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const { VITE_KAKAO_API_KEY } = import.meta.env;

  const handleSearch = () => {
    axios
      .get(`https://dapi.kakao.com/v3/search/book?query=${title}&sort=accuracy&size=50`, {
        headers: {
          Authorization: `KakaoAK ${VITE_KAKAO_API_KEY}`,
        },
      })
      .then((res) => {
        setList(res.data.documents);
      });
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedTitle = event.currentTarget.children[1].textContent;
    setTitle(clickedTitle ? clickedTitle : '');
  };

  const handleComplete = () => {
    setTitle('');
    setList([]);
    handleModal();
  };

  return (
    <>
      {isModal && (
        <>
          <SearchModal
            title={title}
            setBook={setBook}
            list={list}
            handleModal={handleModal}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleClick={handleClick}
            handleCancel={handleCancel}
            handleComplete={handleComplete}
          />

          {book && <BookInfo books={book} />}
        </>
      )}
      <TitleContainer>큐레이션 수정하기</TitleContainer>
      <Container>
        <FormContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="제목" />
            <Input
              id="title"
              placeholder="큐레이션의 제목을 입력해 주세요"
              width="100%"
              color="#000"
              value={titleValue || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value)}
            />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="이모지" />
            <Input
              id="emoji"
              placeholder="큐레이션에 어울리는 이모지를 선택해 주세요"
              width="100%"
              color="#000"
              value={emojiValue || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmojiValue(e.target.value)}
            />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="내용" />
            <Label
              type="content"
              htmlFor="content"
              content="마우스 드래그로 영역을 선택하면 서식을 수정하고, 이미지도 넣을 수 있어요!"
            />
            <QuillEditor
              quillRef={quillRef}
              contentValue={curation?.content}
              setContentValue={setContentValue}
            />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="카테고리" />
            <SelectBox />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="추천하는 책" />
            {book && <BookInfo books={book} />}
            <SearchInputContainer>
              <SearchInputButton onClick={handleModal}>
                추천하는 책을 검색해서 등록해 주세요
              </SearchInputButton>
            </SearchInputContainer>
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="큐레이션 공개 여부" />
            <RadioButtonContainer>
              <input
                type="radio"
                id="public"
                name="visibility"
                value="PUBLIC"
                checked={visibilityValue === 'PUBLIC'}
                onChange={() => setVisibilityValue('PUBLIC')}
              />
              <label htmlFor="public">공개</label>
              <input
                type="radio"
                id="secret"
                name="visibility"
                value="SECRET"
                checked={visibilityValue === 'SECRET'}
                onChange={() => setVisibilityValue('SECRET')}
              />
              <label htmlFor="secret">비공개</label>
            </RadioButtonContainer>
          </ItemContainer>
          <ButtonContainer>
            <CancelButton>
              <Button type="cancel" content="취소" onClick={handleCancel} />
            </CancelButton>
            <PrimaryButton>
              <Button type="primary" content="발행" onClick={handleEdit} />
            </PrimaryButton>
          </ButtonContainer>
        </FormContainer>
      </Container>
    </>
  );
};

export default CurationEditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background-color: #efefef;
  border-radius: 2rem;
  padding: 0rem 3rem 2rem 3rem;
  width: 40rem;
  margin-bottom: 8rem;
`;

const TitleContainer = styled.div`
  margin: 4rem 0rem 3rem 0rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
`;

const ItemContainer = tw.div`
  bg-inherit
  flex
  flex-col
  mt-12
  w-full
  [> label]:mb-3
  [> button]:mb-3
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInputButton = styled.label`
  cursor: pointer;
  width: 100%;
  display: block;
  padding: 0.7rem;
  margin-top: 0.4rem;
  text-align: left;
  border: 1px solid #f8f7f7;
  background-color: #f8f7f7;
  border-radius: 0.3rem;
  color: #757575;
  font-size: 0.8rem;
  font-weight: 100;
  &:hover {
    background-color: #e1e1e1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RadioButtonContainer = styled.div`
  margin: 0rem 3rem 3rem -0.3rem;
  cursor: pointer;
  font-size: 15px;
  color: #757575;
`;

const CancelButton = styled.div`
  margin: 10px;
`;

const PrimaryButton = styled.div`
  margin: 10px;
`;
