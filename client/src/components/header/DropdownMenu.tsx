import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

interface IProps {
  handleIsDropMenuOpen: () => void;
}

const DropdownMenu = ({ handleIsDropMenuOpen }: IProps) => {
  const handleDropMenuClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleIsDropMenuOpen();
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <Container className="dropdown">
      <MenuWrapper onClick={handleDropMenuClose}>
        <MenuList>
          <Menu>
            <Link to="/write">큐레이션 작성하기</Link>
          </Menu>
          <Menu>
            <Link to="/mypage">마이페이지</Link>
          </Menu>
          <Menu>
            <Link to="/logout" onClick={handleLogout}>
              로그아웃
            </Link>
          </Menu>
        </MenuList>
      </MenuWrapper>
    </Container>
  );
};

const Container = tw.div`
  w-full
  h-full
`;

const MenuWrapper = tw.div`
  bg-gray-300
  absolute
  z-20
  top-20
  right-8
  px-4
  pt-5
  rounded-lg
  shadow-xl
  shadow-gray-200
  text-[1.05rem]
`;

const MenuList = tw.ul`
  flex
  flex-col
`;

const Menu = tw.li`
  pb-5
  cursor-pointer
  hover:text-white
`;

export default DropdownMenu;
