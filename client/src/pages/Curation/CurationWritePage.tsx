import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';
import axios from 'axios';
import { compact } from 'lodash';

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

export interface inputType {
  title: string;
  emoji: string;
  content: string;
  category: number;
  books: null | SelectedBook;
}

type ValueType = string | number | SelectedBook;

const CurationWritePage = () => {
  const navigate = useNavigate();
  // 모달
  const [isModal, setIsModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [list, setList] = useState<Book[]>([]);

  // 폼
  const [imageIds] = useState<string[]>([]);
  const [visibilityValue, setVisibilityValue] = useState('PUBLIC');
  const [inputValue, setInputValue] = useState<inputType>({
    title: '',
    emoji: '',
    content: '',
    category: 0,
    books: null,
  });
  const [inputValid, setInputValid] = useState({
    title: true,
    emoji: true,
    content: true,
    category: true,
    books: true,
  });

  const quillRef = useRef(null);

  const [categoryId, setCategoryId] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<string>('카테고리를 선택하세요');

  // 78번 라인에서 실행되는 함수에서 유효성 검사를 위한 함수
  const handleValidInput = (type: string, value: string | number | SelectedBook | null) => {
    const valid: { [type: string]: (v: ValueType) => boolean } = {
      title: (title: ValueType) => (title as string).length > 0 && (title as string).length < 100,
      emoji: (emoji: ValueType) => (emoji as string).length >= 1 && (emoji as string).length <= 15,
      content: (content: ValueType) => (content as string).length >= 10,
      category: (category: ValueType) => (category as number) > 0,
      books: (books: ValueType) => books !== null,
    };

    value !== null && setInputValid({ ...inputValid, [type]: valid[type](value) });
  };

  // 큐레이션 생성 페이지를 최초에 열고 아무값을 입력안한 상태에서 "생성하기" 눌렀을 때 유효성 검사를 위한 함수
  const handleValidForm = () => {
    const { title, emoji, content, category, books } = inputValue;
    const valid: {
      title: boolean;
      emoji: boolean;
      content: boolean;
      category: boolean;
      books: boolean;
    } = {
      title: title.length > 0 && title.length < 100,
      emoji: emoji.length >= 1 && emoji.length <= 15,
      content: content.length >= 10,
      category: !!category,
      books: books !== null,
    };

    setInputValid(valid);

    return valid;
  };

  const handleCreate = async () => {
    // 서버로 데이터 보내기전에 유효성 검사
    const result = handleValidForm() || {};
    const submitValid = compact(Object.values(result)).length === 5;

    if (submitValid) {
      const { title, emoji, content, category, books } = inputValue;

      try {
        const response = await axiosInstance.post(`/curations`, {
          title,
          emoji,
          content,
          visibility: visibilityValue,
          categoryId: category,
          imageIds: imageIds,
          books,
        });
        navigate(response.headers.location);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModal = () => {
    setIsModal(true);
  };

  const handleComplete = () => {
    setTitle('');
    setList([]);
    setIsModal(false);
  };

  const handleCancel = () => {
    setTitle('');
    setList([]);
    handleChangeInput('books', null);
    setIsModal(false);
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

  return (
    <>
      {isModal && (
        <>
          <SearchModal
            title={title}
            // setBook={(book: SelectedBook) => handleChangeInput('books', book)}
            setBook={(books: SelectedBook) => handleChangeInput('books', books)}
            list={list}
            handleModal={handleModal}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleClick={handleClick}
            handleCancel={handleCancel}
            handleComplete={handleComplete}
          />
          {inputValue.books && <BookInfo books={inputValue.books} />}
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
              value={inputValue.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeInput('title', e.target.value)
              }
            />
            {!inputValid.title && (
              <ValidationText>제목은 1자 이상 100자 미만으로 입력해 주세요</ValidationText>
            )}
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="이모지" />
            <Input
              id="emoji"
              placeholder="큐레이션에 어울리는 이모지를 선택해 주세요"
              width="100%"
              color="#000"
              value={inputValue.emoji}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeInput('emoji', e.target.value)
              }
            />
            {!inputValid.emoji && (
              <ValidationText>이모지를 입력해 주세요 (최대 5개)</ValidationText>
            )}
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
              contentValue={inputValue.content}
              setContentValue={(content: string) => handleChangeInput('content', content)}
            />
            {!inputValid.content && (
              <ValidationText>본문은 10자 이상으로 입력해 주세요</ValidationText>
            )}
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="카테고리" />
            <SelectBox
              setCategoryId={setCategoryId}
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
            />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="추천하는 책" />
            {inputValue.books && <BookInfo books={inputValue.books} />}
            <SearchInputContainer>
              <SearchInputButton onClick={handleModal}>
                추천하는 책을 검색해서 등록해 주세요
              </SearchInputButton>
            </SearchInputContainer>
            {!inputValid.books && (
              <ValidationText>추천하는 책을 검색해서 등록해 주세요</ValidationText>
            )}
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

const ValidationText = tw.p`
  mt-2
  text-right
  text-xs
  text-red-400
  [> p]:last:mt-0
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
