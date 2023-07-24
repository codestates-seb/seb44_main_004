import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import tw from 'twin.macro';
import styled from 'styled-components';

import { images } from '../../utils/importImgUrl';
import { categoryAPI, memberInfoAPI } from '../../api/userApi';
import { saveUserInfo } from '../../store/userSlice';
import { RootState } from '../../store/store';
import { saveCategories } from '../../store/categorySlice';
import DropdownMenu from './DropdownMenu';
import WhoseBookLogo from '../../img/whosebook_logo.png';

enum SelectMenu {
  Home = '/',
  Best = '/curation/best?page=',
  New = '/curation/new?page=',
}

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem('Authorization');
  const { image } = useSelector((state: RootState) => state.user);
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

  useEffect(() => {
    switch (location.pathname) {
      case SelectMenu.Home:
        setSelectMenu(SelectMenu.Home);
        break;
      case SelectMenu.Best:
        setSelectMenu(SelectMenu.Best);
        break;
      case SelectMenu.New:
        setSelectMenu(SelectMenu.New);
        break;
    }
  }, [location]);
  const renderLoginMenu = () => {
    return (
      <>
        {!token && (
          <LoginButton onClick={handleLoginButtonClick} className="login-btn">
            로그인
          </LoginButton>
        )}
        {token && image && (
          <ProfileImg src={image} alt="user select image" onClick={handleIsDropMenuOpen} />
        )}
        {token && !image && (
          <ProfileImg
            src={images.profileImg2}
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
          if (response) {
            dispatch(saveUserInfo(response.data));
          }
        })
        .catch((err) => console.error(err));
    }
    categoryAPI()
      .then((response) => {
        if (response) {
          dispatch(saveCategories(response.data));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

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
              <Link to="/curation/best/1">Best 큐레이션</Link>
            </Menu>
            <Menu
              data-type={SelectMenu.New}
              onClick={handleSelectMenu}
              selectMenu={selectMenu === SelectMenu.New}
            >
              <Link to="/curation/new/1">New 큐레이션</Link>
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
  flex
  justify-between
`;

const LeftMenuWrap = tw.div`
  flex
  items-center
  cursor-pointer
  ml-20
`;

const RightMenuWrap = tw.div`
  mt-2
  mr-20
`;

const MenuWrap = tw.ul`
  flex
  items-center
  [> a > img]:mr-3
  [> li]:(odd:ml-7 last:ml-7)
`;

const Menu = styled.li<{ selectMenu?: boolean }>`
  font-weight: bold;
  padding-bottom: 0.3rem;
  color: ${({ selectMenu, theme }) =>
    selectMenu ? theme.colors.mainLogoColor : theme.colors.mainLightBlack100};
  border-bottom: ${({ selectMenu, theme }) =>
    selectMenu ? `solid 3px ${theme.colors.mainLogoColor}` : `solid 3px rgba(255, 0, 0, 0)`};
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
  object-cover
  rounded-full
  cursor-pointer
  border-solid border-[1px] border-sky-300
`;

const LoginButton = tw.button`
  text-[1.05rem]
`;

export default GlobalNavigationBar;
