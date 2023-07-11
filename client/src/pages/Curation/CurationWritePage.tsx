import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from "styled-components";
import axios from 'axios';

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
  title: string,
  authors: string,
  publisher: string,
  thumbnail: string,
  url: string,
}

const CurationWritePage = () => {
  const [curationContent, setCurationContent] = useState('');
  const [emojiValue, setEmojiValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [visibilityValue, setVisibilityValue] = useState("PUBLIC");

  const [isModal, setIsModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [list, setList] = useState<Book[]>([]);
  const [book, setBook] = useState<SelectedBook | null>(null);
  
  const quillRef = useRef(null);
  const navigate = useNavigate(); 

  const handleValidation = () => {
    if (!emojiValue) {
      alert('이모지를 입력해 주세요 😉'); // 텍스트로 띄워주기
      return false;
    }

  const emojiCount = emojiValue.trim().split(' ').length;
  if (emojiCount > 5) {
    alert('이모지는 최대 5개까지 입력할 수 있어요');
    return false;
  }

  if (titleValue.length === 0 || titleValue.length > 30) {
    alert('제목은 1자 이상 30자 미만으로 입력해 주세요.');
    return false;
  }

  if (curationContent.length < 10) {
    alert('본문은 10자 이상으로 입력해 주세요.');
    return false;
  }

  return true;
  };

  const handleCreate = async () => {
    const isValid = handleValidation();
    if (isValid) {
      try {
        const response = await axiosInstance.post(`/curations`, {
          title: titleValue,
          emoji: emojiValue,
          content: curationContent,
          visibility: visibilityValue
        });
        console.log(response.headers)
        const curationId = response.headers.location;
        console.log(curationId)
        navigate(`${response.headers.location}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModal = () => {
    setIsModal(!isModal);
  }

  const handleCancel = () => {
    setTitle('');
    setList([]);
    setBook(null);
    handleModal();
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const {
    VITE_KAKAO_API_KEY
  } = import.meta.env

  const handleSearch = () => {
    axios.get(`https://dapi.kakao.com/v3/search/book?query=${title}&sort=accuracy&size=50`, {
        headers: {
            Authorization:
              `KakaoAK ${VITE_KAKAO_API_KEY}`,
        },
      }
    )
    .then(res => {
      setList(res.data.documents);
    });
  };

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
      const clickedTitle = event.currentTarget.children[1].textContent;
      setTitle(clickedTitle ? clickedTitle : "");
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
          {book && <BookInfo book={book} />}
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
              value={titleValue}
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
              value={emojiValue}
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
              curationContent={curationContent}
              setcurationContent={setCurationContent}
            />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="카테고리" />
            <SelectBox/>
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="추천하는 책" />
              {book && <BookInfo book={book} />}
            <SearchInputContainer>
              <SearchInputButton onClick={handleModal}>추천하는 책을 검색해서 등록해 주세요</SearchInputButton>
            </SearchInputContainer>
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="큐레이션 공개 여부" />
            <RadioButtonContainer>
              <input type="radio" id="select" name="radio" />
              <label htmlFor="select">공개</label>
              <input type="radio" id="select2" name="radio" />
              <label htmlFor="select2">비공개</label>
            </RadioButtonContainer>
          </ItemContainer>
          <ButtonContainer>
            <CancelButton>
              <Button type="cancel" content="취소" />
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
  background-color: #EFEFEF;
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
  margin-top: .4rem;
  text-align: left;
  border: 1px solid #f8f7f7;
  background-color:  #f8f7f7;
  border-radius: 0.3rem;
  color: #757575;
  font-size: .8rem;
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