import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';
import axios from 'axios';

import useInput from '../../hooks/useInput';
import QuillEditor from '../../components/quill/QuillEditor';
import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import SelectBox from '../../components/input/SelectBox';
import SearchModal from '../../components/modals/SearchModal';
import BookInfo from '../../components/curations/BookInfo';
import { axiosInstance } from '../../api/axios';

export interface Book {
  authors: [];
  contents: string;
  datetime: string;
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

const CurationWritePage = () => {
  const navigate = useNavigate();
  // form
  const [title, titleValid, handleChangeTitle, handleValidateTitle] = useInput<string>(
    '',
    (title: string) => title.length > 0 && title.length < 100
  );
  const [emoji, emojiValid, handleChangeEmoji, handleValidateEmoji] = useInput<string>(
    '',
    (emoji: string) => emoji.length > 1 && emoji.length < 30
  );
  const [contents, contentsValid, handleChangeContents, handleValidateContents] = useInput<string>(
    '',
    (contents: string) => contents.length >= 10
  );
  const [category, categoryValid, handleChangeCategory, handleValidateCategory] = useInput<number>(
    0,
    (category: number) => category !== 0
  );
  const [book, bookValid, handleChangeBook, handleValidateBook] = useInput<SelectedBook | null>(
    null,
    (book: SelectedBook | null) => book !== null
  );
  const [imageIds] = useState<string[]>([]);
  const [visibilityValue, setVisibilityValue] = useState('PUBLIC');

  // modal
  const [isModal, setIsModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState<Book[]>([]);

  const quillRef = useRef(null);

  const handleValidationBeforeSubmit = () => {
    // INFO: 해당 부분 handleValidateTitle() && handleValidateEmoji()... 식으로 줄이면 안됌
    const isTitleValid = handleValidateTitle(title);
    const isEmojiValid = handleValidateEmoji(emoji);
    const isContentsValid = handleValidateContents(contents);
    const isCategoryValid = handleValidateCategory(category);
    const isBookValid = handleValidateBook(book);

    return isTitleValid && isEmojiValid && isContentsValid && isCategoryValid && isBookValid;
  };

  const handleCreate = async () => {
    const isValid = handleValidationBeforeSubmit();

    if (isValid) {
      try {
        const response = await axiosInstance.post(`/curations`, {
          title,
          emoji,
          content: contents,
          categoryId: category,
          books: book,
          visibility: visibilityValue,
          imageIds: imageIds,
        });
        navigate(response.headers.location);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // modal Open 함수 -> 토글형식보단 명확한 오픈 함수와 클로즈 함수를 사용하는게 좋을것 같음
  const handleModalOpen = () => {
    setIsModal(true);
  };

  // modal Close 함수
  const handleModalClose = () => {
    setSearch('');
    setList([]);
    setIsModal(false);
  };

  // 큐레이션 작성 페이지 취소 버튼 함수
  const handleCancel = () => {
    handleModalClose();
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { VITE_KAKAO_API_KEY } = import.meta.env;

  const handleSearch = () => {
    axios
      .get(`https://dapi.kakao.com/v3/search/book?query=${search}&sort=accuracy&size=50`, {
        // 환경변수로 뺴야함 replace 활용
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
    setSearch(clickedTitle ? clickedTitle : '');
  };

  const handleComplete = () => {
    setSearch('');
    setList([]);
    setIsModal(false);
  };

  return (
    <>
      {isModal && (
        <>
          <SearchModal
            title={search}
            setBook={handleChangeBook}
            list={list}
            handleModalOpen={handleModalOpen}
            handleModalClose={handleModalClose}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleClick={handleClick}
            handleComplete={handleComplete}
          />
          {book && <BookInfo books={book} />}
        </>
      )}
      <TitleContainer>큐레이션 작성하기</TitleContainer>
      <Container>
        <FormContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="제목" />
            <Input
              id="title"
              placeholder="큐레이션의 제목을 입력해 주세요"
              width="100%"
              color="#000"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeTitle(e.target.value)}
            />
            {!titleValid && (
              <ValidationText>제목은 1자 이상 100자 미만으로 입력해 주세요</ValidationText>
            )}
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="emoji" content="이모지" />
            <Input
              id="emoji"
              placeholder="큐레이션에 어울리는 이모지를 선택해 주세요"
              width="100%"
              color="#000"
              value={emoji}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmoji(e.target.value)}
            />
            {!emojiValid && <ValidationText>이모지를 입력해 주세요 (최대 5개)</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="content" content="내용" />
            <QuillEditor
              quillRef={quillRef}
              contentValue={contents}
              setContentValue={handleChangeContents}
            />
            {!contentsValid && <ValidationText>본문은 10자 이상으로 입력해 주세요</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type="title" content="카테고리" />
            <SelectBox setCategoryId={handleChangeCategory} />
            {!categoryValid && <ValidationText>카테고리를 선택해 주세요</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type="title" content="추천하는 책" />
            {book && <BookInfo books={book} />}
            <SearchInputContainer>
              <SearchInputButton onClick={handleModalOpen}>
                추천하는 책을 검색해서 등록해 주세요
              </SearchInputButton>
            </SearchInputContainer>
            {!bookValid && <ValidationText>추천하는 책을 검색해서 등록해 주세요</ValidationText>}
          </ItemContainer>
          <ItemContainer>
            <Label type="title" content="큐레이션 공개 여부" />
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
              <Button type="primary" content="발행" onClick={handleCreate} />
            </PrimaryButton>
          </ButtonContainer>
        </FormContainer>
      </Container>
    </>
  );
};

export default CurationWritePage;

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

const ValidationText = tw.p`
  mt-2
  text-right
  text-xs
  text-red-400
  [> p]:last:mt-0
`;
