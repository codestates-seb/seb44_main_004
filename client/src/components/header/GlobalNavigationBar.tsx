import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';

import DropdownMenu from './DropdownMenu';
import WhoseBookLogo from '../../img/whosebook_logo.png';
import DefaultImg from '../../img/profile_img2.png';
import { memberInfoAPI } from '../../api/userApi';
import { saveUserInfo } from '../../store/userSlice';
import { RootState } from '../../store/store';

enum SelectMenu {
  Home = '/',
  Best = '/curation/best',
  New = '/curation/new',
}

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('Authorization');
  const { memberId } = useSelector((state: RootState) => state.user);
  const [selectMenu, setSelectMenu] = useState<SelectMenu>(SelectMenu.Home);
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

  const handleSelectMenu = (e: MouseEvent<HTMLElement>) => {
    if (e.currentTarget.dataset) {
      setSelectMenu(e.currentTarget.dataset.type as SelectMenu);
    } else {
      setSelectMenu(SelectMenu.Home);
    }
  };

  const handleIsDropMenuOpen = () => {
    setDropMenuOpen(!isDropMenuOpen);
  };

  const handleLoginButtonClick = (e: MouseEvent<HTMLElement>) => {
    handleSelectMenu(e);
    navigate('/login');
  };

  const renderLoginMenu = () => {
    return (
      <>
        {!token && (
          <LoginButton onClick={handleLoginButtonClick} className="login-btn">
            로그인
          </LoginButton>
        )}
        {token && (
          <ProfileImg
            src={DefaultImg}
            alt="Default profile image not selected by the user"
            onClick={handleIsDropMenuOpen}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    if (token) {
      memberInfoAPI()
        .then((response) => {
          dispatch(saveUserInfo(response?.data));
        })
        .catch((err) => console.log(err));
    }
  }, [memberId]);

  return (
    <Container>
      <NavbarWrapper>
        <LeftMenuWrap>
          <MenuWrap>
            <Link to="/">
              <LogoImg src={WhoseBookLogo} alt="whose book logo image" />
            </Link>
            <Menu data-type={SelectMenu.Home} onClick={handleSelectMenu}>
              <Link to="/">
                <LogoTitle className="nav-title">후즈북</LogoTitle>
              </Link>
            </Menu>
            <Menu
              data-type={SelectMenu.Best}
              onClick={handleSelectMenu}
              selectMenu={selectMenu === SelectMenu.Best}
            >
              <Link to="/curation/best">Best 큐레이션</Link>
            </Menu>
            <Menu
              data-type={SelectMenu.New}
              onClick={handleSelectMenu}
              selectMenu={selectMenu === SelectMenu.New}
            >
              <Link to="/curation/new">New 큐레이션</Link>
            </Menu>
          </MenuWrap>
        </LeftMenuWrap>
        <RightMenuWrap>
          {renderLoginMenu()}
          {isDropMenuOpen && (
            <DropdownMenu
              handleIsDropMenuOpen={handleIsDropMenuOpen}
              handleSelectMenu={handleSelectMenu}
            />
          )}
        </RightMenuWrap>
      </NavbarWrapper>
    </Container>
  );
};

const Container = tw.div`
  w-full
  fixed
  top-0
  z-10
  px-5
  py-3
  bg-slate-200
`;

const NavbarWrapper = tw.nav`
  w-full
  flex
  justify-between
`;

const LeftMenuWrap = tw.div`
  flex
  items-center
  cursor-pointer
`;

const RightMenuWrap = tw.div`
  mt-2
`;

const MenuWrap = tw.ul`
  flex
  items-center
  [> a > img]:mr-3
  [> li]:odd:ml-7
  [> li]:last:ml-7
`;

const Menu = styled.li<{ selectMenu?: boolean }>`
  font-weight: bold;
  padding-bottom: 0.3rem;
  color: ${({ selectMenu, theme }) =>
    selectMenu ? theme.colors.mainLogoColor : theme.colors.mainLightBlack100};
  border-bottom: ${({ selectMenu, theme }) =>
    selectMenu ? `solid 2px ${theme.colors.mainLogoColor}` : `solid 2px rgba(255, 0, 0, 0)`};
`;

const LogoImg = tw.img`
  w-10
`;

const LogoTitle = tw.h3`
  line-clamp-2
`;

const ProfileImg = tw.img`
  w-12
  h-12
  object-contain
  rounded-full
  cursor-pointer
  border-solid border-[1px] border-sky-300
`;

const LoginButton = tw.button`
  text-[1.05rem]
`;

export default GlobalNavigationBar;
