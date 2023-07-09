import styled from "styled-components";
import { useState, MouseEventHandler } from 'react';

interface OptionData {
  value: string;
  key: string;
}

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

const CategorySelectBox = () => {
  return (
    <CustomSelect
    optionData={[
      { value: "카테고리를 선택해 주세요", key: "1" },
      // { value: "가정/육아", key: "5" },
      // { value: "건강", key: "6" },
      // { value: "경영/경제", key: "8" },
      // { value: "과학/공학", key: "20" },
      // { value: "만화", key: "14" },
      // { value: "문학", key: "21" },
      // { value: "사회과학", key: "22" },
      // { value: "소설", key: "2" },
      // { value: "수험서", key: "19" },
      // { value: "시/에세이", key: "3" },
      // { value: "역사/문화", key: "11" },
      // { value: "외국어", key: "13" },
      // { value: "요리", key: "18" },
      // { value: "유아", key: "23" },
      // { value: "인문", key: "4" },
      // { value: "자기계발", key: "9" },
      // { value: "정치/사회", key: "10" },
      // { value: "종교", key: "12" },
      // { value: "재테크", key: "24" },
      // { value: "스포츠", key: "7" },
      // { value: "여행", key: "15" },
      // { value: "잡지", key: "17" },
      // { value: "IT", key: "16" },
      // { value: "커리어", key: "16" },
    ]}
  />
)}

export default CategorySelectBox;

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
    top: 4px;
    right: 12px;
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
  overflow: auto;
  height: ${(props) => (props.show ? "110px" : "0")};
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
