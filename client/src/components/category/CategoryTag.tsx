import { useEffect } from 'react';
import styled from "styled-components";
import { axiosInstance } from '../../api/axios';

export interface Curation {
  category: string;
}
useEffect(() => {
  const categoryData = async () => {
    try {
      const response = await axiosInstance.get(`/category`);
    } catch (error: unknown) {
      console.error(error);
      }
    }
  };
  categoryData();
}, []);

const CategoryBox = styled.div`
  position: relative;
  width: 100%;
  padding: .6rem;
  border-radius: .3rem;
  background-color: #f8f7f7;
  align-self: center;
  cursor: pointer;
`;

const CategoryLabel = styled.label`
  font-size: .8rem;
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
  height: ${(props) => (props.show ? "110px" : "0")};
  padding: 0;
  border-radius: .3rem;
  background-color: #f8f7f7;
  color: #757575;
`;

const Option = styled.li`
  font-size: .8rem;
  padding: 12px;
  transition: background-color 0.05s ease-in;
  &:hover {
    background-color: #ffffff;
  }
`;

export default CategoryTag;