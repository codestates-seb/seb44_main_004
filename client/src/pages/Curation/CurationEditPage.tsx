import { useState, useRef, ChangeEvent } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import axios from 'axios';

import QuillEditor from '../../components/quill/QuillEditor';
import Input from '../../components/input/Input';
import Label from '../../components/label/Label';
import Button from '../../components/buttons/Button';
import SelectBox from '../../components/input/SelectBox';
import SearchModal from '../../components/modals/SearchModal';
import { Book, SelectedBook } from './CurationWritePage';

const CurationEditPage = () => {
  const [curationContent, setCurationContent] = useState('');
  const [emojiValue, setEmojiValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const [isModal, setIsModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [list, setList] = useState<Book[]>([]);
  const [/* book */ _, setBook] = useState<SelectedBook | null>(null);

  const quillRef = useRef(null);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        'http://ec2-54-180-18-106.ap-northeast-2.compute.amazonaws.com:8080/curations',
        {
          emoji: emojiValue,
          title: titleValue,
          content: curationContent,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
    {isModal && 
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
    }
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
              value={titleValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value)}
            />
          </ItemContainer>
          <ItemContainer>
            <Label type="text" htmlFor="emoji" content="이모지" />
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
            <Label type="title" htmlFor="title" content="책 카테고리" />
            <SelectBox />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="책 정보 등록" />
            <SearchInputContainer>
              <SearchInputLabel>추천하는 책을 검색 후 등록해 주세요</SearchInputLabel>
              <SearchInputButton onClick={handleModal}>책 검색하기</SearchInputButton>
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

const SearchInputLabel = styled.label`
  cursor: pointer;
  width: 80%;
  display: block;
  padding: 0.6rem;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  border-radius: 0.3rem;
  color: #757575;
  font-size: 0.8rem;
  font-weight: 100;
`;

const SearchInputButton = styled.label`
  cursor: pointer;
  width: 18%;
  display: block;
  padding: 0.6rem;
  text-align: center;
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
