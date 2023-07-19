import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import { logout } from '../../store/userSlice';
import { useDispatch } from 'react-redux';

interface IProps {
  handleIsDropMenuOpen: () => void;
  handleSelectMenu: (e: MouseEvent<HTMLElement>) => void;
}

const DropdownMenu = ({ handleIsDropMenuOpen, handleSelectMenu }: IProps) => {
  const dispatch = useDispatch();

  const handleDropMenuClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleSelectMenu(e);
    handleIsDropMenuOpen();
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <Container className="dropdown" onClick={handleDropMenuClose}>
      <MenuWrapper>
        <MenuList>
          <Menu>
            <Link to="/write">큐레이션 작성하기</Link>
          </Menu>
          <Menu>
            <Link to="/mypage">마이페이지</Link>
          </Menu>
          <Menu>
            <Link to="/" onClick={handleLogout}>
              로그아웃
            </Link>
          </Menu>
        </MenuList>
      </MenuWrapper>
    </Container>
  );
};

const Container = tw.div`
  fixed
  top-0
  right-0
  w-full
  h-full
  bg-transparent

`;

const MenuWrapper = tw.div`
  bg-white
  absolute
  z-30
  top-20
  right-8
  px-8
  pt-10
  pb-5
  rounded-lg
  shadow-2xl
  shadow-gray-300
  text-[1.05rem]
`;

const MenuList = tw.ul`
  flex
  flex-col
`;

const Menu = tw.li`
  pb-5
  cursor-pointer
  hover:text-blue-500
`;

export default DropdownMenu;
