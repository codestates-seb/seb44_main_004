import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { RoutePath } from '../../Routes';
import { UserPageType } from '../../types';

interface FilterProps {
  type: UserPageType;
  selected: number;
  setSelected: (data: number) => void;
}

const Filter = ({ type, selected, setSelected }: FilterProps) => {
  const navigate = useNavigate();

  const myList: Array<string> = [
    '회원정보 수정',
    '작성한 큐레이션',
    '좋아요한 큐레이션',
    '구독하는 큐레이터',
  ];
  const anotherList: Array<string> = ['작성한 큐레이션', '좋아요한 큐레이션'];

  const handleMyClick = (idx: number) => {
    setSelected(idx);
    localStorage.setItem('selected', idx.toString());
    switch (idx) {
      case 0:
        navigate(RoutePath.MyInfoUpdate);
        break;
      case 1:
        navigate(RoutePath.MyWrittenPage);
        break;
      case 2:
        navigate(RoutePath.MyLikePage);
        break;
      case 3:
        navigate(RoutePath.MySubcriberPage);
        break;
      default:
        break;
    }
  };
  const handleUserClick = (idx: number) => {
    setSelected(idx);
    localStorage.setItem('selected', idx.toString());
    switch (idx) {
      case 0:
        navigate(RoutePath.UserWrittenPage);
        break;
      case 1:
        navigate(RoutePath.UserLikePage);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {type === UserPageType.MYPAGE ? (
        <>
          {myList.map((e, idx) => (
            <ProfileList
              key={`my ${idx}`}
              className={`list ${selected === idx ? 'selected' : ''}`}
              onClick={() => handleMyClick(idx)}
            >
              {e}
            </ProfileList>
          ))}
        </>
      ) : (
        <>
          {anotherList.map((e, idx) => (
            <ProfileList
              key={`another ${idx}`}
              className={`user-list ${selected === idx ? 'selected' : ''}`}
              onClick={() => handleUserClick(idx)}
            >
              {e}
            </ProfileList>
          ))}
        </>
      )}
    </>
  );
};

const ProfileList = styled.li`
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  text-align: left;
  margin: 0.3rem 0;
  cursor: pointer;

  @media (max-width: 1000px) {
    padding: 0.5rem;
  }

  &.selected {
    color: ${({ theme }) => theme.colors.mainLogoColor};
    border-right: 0.3rem solid ${({ theme }) => theme.colors.mainLogoColor};
    font-weight: bold;
    @media (max-width: 1000px) {
      color: ${({ theme }) => theme.colors.mainLogoColor};

      border-bottom: 0.3rem solid ${({ theme }) => theme.colors.mainLogoColor};
      border-right: 0;
    }
  }
`;

export default Filter;
