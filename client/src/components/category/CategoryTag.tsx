import tw from 'twin.macro';
import styled from 'styled-components';

import Button from '../../components/buttons/Button';

interface CategoryTagValue {
  value: string;
  key: number;
}

const CategoryTags = () => {
  const categoryData: CategoryTagValue[] = [
    { value: "가정/육아", key: 1 },
    { value: "건강", key: 2 },
    { value: "경영/경제", key: 3 },
    { value: "과학/공학", key: 4 },
    { value: "만화", key: 5 },
    { value: "문학", key: 6 },
    { value: "사회과학", key: 7 },
    { value: "소설", key: 8 },
    { value: "수험서", key: 9 },
    { value: "스포츠", key: 10 },
    { value: "시/에세이", key: 11 },
    { value: "역사/문화", key: 12 },
    { value: "외국어", key: 13 },
    { value: "여행", key: 14 },
    { value: "요리", key: 15 },
    { value: "유아", key: 16 },
    { value: "인문", key: 17 },
    { value: "자기계발", key: 18 },
    { value: "잡지", key: 19 },
    { value: "정치/사회", key: 20 },
    { value: "종교", key: 21 },
    { value: "재테크", key: 22 },
    { value: "커리어", key: 23 },
    { value: "IT", key: 24 },
  ];

  return (
    <CategoryContainer>
      {categoryData.map((category: CategoryTagValue) => (
        <Category key={category.key}>
          <Button type="category" content={category.value} />
        </Category>
      ))}
    </CategoryContainer>
  );
}

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
