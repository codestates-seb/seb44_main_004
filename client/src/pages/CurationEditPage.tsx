import { useState, useRef, ChangeEvent, MouseEventHandler } from 'react';
import tw from 'twin.macro';
import styled from "styled-components";

import QuillEditor from '../components/quill/QuillEditor';
import Input from '../components/input/Input';
import Label from '../components/label/Label';
import Button from '../components/buttons/Button';

interface OptionData {
  value: string;
  key: string;
}

const CurationWritePage = () => {
  const [curationContent, setCurationContent] = useState('');
  const [emojiValue, setEmojiValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const quillRef = useRef(null);

  const CustomSelect = ({ optionData }: { optionData: OptionData[] }) => {
    const [currentValue, setCurrentValue] = useState(optionData[0].value);
    const [showOptions, setShowOptions] = useState(false);
  
    const handleOnChangeSelectValue: MouseEventHandler<HTMLLIElement> = (e) => {
      setCurrentValue(e.currentTarget.getAttribute("value") || "");
    };

    return (
      <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
        <CategoryLabel>{currentValue}</CategoryLabel>
        <SelectOptions show={showOptions}>
          {optionData.map((data: OptionData) => (
            <Option
              key={data.key}
              value={data.value}
              onClick={handleOnChangeSelectValue}
            >
              {data.value}
            </Option>
          ))}
        </SelectOptions>
      </SelectBox>
    );
  };

  return (
    <>
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
            <CustomSelect
              optionData={[
                { value: "카테고리를 선택해 주세요", key: "1" },
                { value: "역사", key: "2" },
                { value: "스포츠", key: "3" },
                { value: "수험서", key: "4" }
              ]}
            />
          </ItemContainer>
          <ItemContainer>
            <Label type="title" htmlFor="title" content="책 정보 등록" />
            <SearchInputContainer>
              <SearchInputLabel>추천하는 책을 검색 후 등록해 주세요</SearchInputLabel>
              <SearchInputButton>책 검색하기</SearchInputButton>
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
              <Button type="primary" content="발행" />
            </PrimaryButton>
          </ButtonContainer>
        </FormContainer>
      </Container>
    </>
  );
};

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

const SearchInputLabel = styled.label`
  cursor: pointer;
  width: 80%;
  display: block;
  padding: 0.6rem;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  border-radius: 0.3rem;
  color: #757575;
  font-size: .8rem;
  font-weight: 100;
`;

const SearchInputButton = styled.label`
  cursor: pointer;
  width: 18%;
  display: block;
  padding: 0.6rem;
  text-align: center;
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

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  padding: .6rem;
  border-radius: .3rem;
  background-color: #ffffff;
  align-self: center;
  cursor: pointer;
  &::before {
  content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #3173f6;
    font-size: 1.25rem;
  }
`;

const CategoryLabel = styled.label`
  font-size: .8rem;
  margin: 5px;
  text-align: center;
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 2.4rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: ${(props) => (props.show ? "147px" : "0")};
  padding: 0;
  border-radius: .3rem;
  background-color: #f8f7f7;
  color: #000000;
`;

const Option = styled.li`
  font-size: .8rem;
  padding: 12px;
  transition: background-color 0.05s ease-in;
  &:hover {
    background-color: #ffffff;
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

export default CurationWritePage;
