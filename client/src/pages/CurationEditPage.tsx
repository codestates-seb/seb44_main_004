import styled from "styled-components";
import { useState, useRef } from 'react';
import QuillEditor from '../components/quill/QuillEditor';

const CurationWritePage = () => {
  const [curationContent, setCurationContent] = useState("");
  const quillRef = useRef(null);

  return (
    <Container>
      <MainTitle>큐레이션 수정하기</MainTitle>
      <FormContainer>
        <Form>
          <FormLabel>제목</FormLabel>
          <FormInput placeholder="큐레이션의 제목을 입력해 주세요" />
        </Form>
        <Form>
          <FormLabel>이모지</FormLabel>
          <FormInput placeholder="큐레이션에 어울리는 이모지를 선택해 주세요" />
        </Form>
        <Form>
            <FormLabel>내용</FormLabel>
              <QuillEditor quillRef={quillRef} curationContent={curationContent} setcurationContent={setCurationContent} />
        </Form>
        <Form>
          <FormLabel>카테고리</FormLabel>
          <FormInput placeholder="추천하는 책의 카테고리를 입력해 주세요" />
        </Form>
        <Form>
          <FormLabel>책 정보 등록</FormLabel>
          <FormInput placeholder="추천하는 책을 검색 후 등록해 주세요" />
        </Form>
        <Form>
          <FormLabel>이미지 첨부</FormLabel>
          <FileInputContainer>
            <FileInput
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              id="fileInput"
            />
            <FileInputLabel htmlFor="fileInput">이미지를 찾아 업로드 해주세요</FileInputLabel>
            <FileInputButton htmlFor="fileInput">이미지 찾기</FileInputButton>
          </FileInputContainer>
        </Form>
        <ButtonContainer>
          <Button variant="secret">비공개로 발행</Button>
          <Button variant="cancel">취소</Button>
          <Button variant="create">발행</Button>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainTitle = styled.div`
  margin: 4rem 0rem 3rem 0rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
`;

const FormContainer = styled.div`
  background-color: #f8f7f7;
  border-radius: 0.3rem;
  padding: 3rem;
  width: 40rem;
  margin-bottom: 8rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.7rem;
  height: 9rem;
  font-weight: 100;
  border: 0.06rem solid #ffffff;
  border-radius: 0.3rem;
`;

const FormInput = styled.textarea`
  width: 100%;
  padding: 0.7rem;
  height: 2.5rem;
  font-weight: 100;
  border: 0.06rem solid #ffffff;
  border-radius: 0.3rem;
`;

const FileInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  height: 2.5rem;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  border-radius: 0.3rem;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
`;

const FileInputLabel = styled.label`
  cursor: pointer;
  width: 80%;
  display: block;
  padding: 0.6rem;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  border-radius: 0.3rem;
  color: #757575;
  font-size: 13px;
  font-weight: 100;
`;

const FileInputButton = styled.label`
  cursor: pointer;
  width: 18%;
  display: block;
  padding: 0.6rem;
  text-align: center;
  border: 1px solid #f8f7f7;
  background-color:  #dbdbdb;
  border-radius: 0.3rem;
  color: #757575;
  font-size: 13px;
  font-weight: 100;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
`;

const Button = styled.div<{ variant: string }>`
  padding: 0.6rem;
  background-color: #ffffff;
  color: #3173f6;
  border-color: #3173f6;
  border: 0.1rem solid;
  border-radius: 0.3rem;
  cursor: pointer;
  font-weight: 500;

  ${({ variant }) => {
    if (variant === "secret") {
      return `
        color: #3173f6;
        border-color: #3173f6;
        margin-right: 19.4rem;
      `;
    } else if (variant === "cancel") {
      return `
        color: #fd8f8f;
        border-color: #fd8f8f;
        margin-right: 1rem;
      `;
    } else if (variant === "create") {
      return `
        color: #3173f6;
        border-color: #3173f6;
      `;
    }
  }}
`;

export default CurationWritePage;
