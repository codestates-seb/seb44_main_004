import tw from 'twin.macro';
import styled from 'styled-components';
import { axiosInstance } from '../../api/axios';
import Button from '../../components/buttons/Button';
import { useState, useEffect } from 'react';
interface CategoryTagValue {
  name: string;
  categoryId: number;
}
interface CategoryTagsProps {
  handleSetSelectCategory: (selectedValue: number) => void;
  selectCategory: number;
}
const CategoryTags = ({ handleSetSelectCategory, selectCategory }: CategoryTagsProps) => {
  const [category, setCategory] = useState<CategoryTagValue[]>();

  const getCategory = async () => {
    const response = await axiosInstance.get('/category');
    if (response) {
      setCategory(response.data);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <CategoryContainer>
      {category?.map((category: CategoryTagValue) => (
        <Category
          key={category.categoryId}
          onClick={() => {
            handleSetSelectCategory(category.categoryId);
          }}
        >
          <Button
            type="category"
            content={category.name}
            isSelected={category.categoryId === selectCategory}
          />
        </Category>
      ))}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  ${tw`
    flex
    flex-wrap
    items-center
    justify-center
    my-10
    gap-x-4
    gap-y-4
  `}
`;

const Category = styled.div`
  ${tw`
    rounded-full
    w-10
    h-10
    mr-24
  `}
`;

export default CategoryTags;
