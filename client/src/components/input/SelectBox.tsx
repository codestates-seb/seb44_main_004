import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../api/axios';

interface OptionData {
  name: string;
  categoryId: number;
}
interface CategorySelectBoxProps {
  categoryName?: string;
  setCategoryId: (categoryId: number) => void;
}
const CategorySelectBox = ({ categoryName, setCategoryId }: CategorySelectBoxProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [category, setCategory] = useState<OptionData[]>();
  const [currentValue, setCurrentValue] = useState<string>('카테고리를 선택해주세요.');

  const getCategory = async () => {
    const response = await axiosInstance.get('/category');
    if (response) {
      const data = response.data;
      if (data) {
        setCategory(data);
      }
    }
  };

  const handleOnClick = (category: OptionData) => {
    setCategoryId(category.categoryId);
    setCurrentValue(category.name);
  };

  useEffect(() => {
    getCategory();
    if (categoryName) setCurrentValue(categoryName);
  }, [categoryName]);

  return (
    <SelectBox onClick={() => setIsShow((prev) => !prev)}>
      <CategoryLabel>{currentValue}</CategoryLabel>
      <SelectOptions show={isShow}>
        {category?.map((category, idx) => {
          return (
            <Option key={idx} value={category.name} onClick={() => handleOnClick(category)}>
              {category.name}
            </Option>
          );
        })}
      </SelectOptions>
    </SelectBox>
  );
};

export default CategorySelectBox;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.3rem;
  background-color: #f8f7f7;
  align-self: center;
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    top: 4px;
    right: 12px;
    color: #3173f6;
    font-size: 1.25rem;
  }
`;

const CategoryLabel = styled.label`
  font-size: 0.8rem;
  margin: 5px;
  text-align: center;
  color: #757575;
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 2.4rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  overflow: auto;
  height: ${(props) => (props.show ? '110px' : '0')};
  padding: 0;
  border-radius: 0.3rem;
  background-color: #f8f7f7;
  color: #757575;
`;

const Option = styled.li`
  font-size: 0.8rem;
  padding: 12px;
  transition: background-color 0.05s ease-in;
  &:hover {
    background-color: #ffffff;
  }
`;
