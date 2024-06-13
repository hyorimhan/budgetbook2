import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserInfo } from '../store/slices/userSlice';
import { fetchUserInfo } from '../api/account';
import { useQuery } from '@tanstack/react-query';

const Navbar = styled.div`
  width: 100%;
  background-color: #808080;
  display: flex;
  justify-content: space-around;
  padding: 0.625rem;
  gap: 5px;
  margin-bottom: 1.25rem;
`;
const ProfileBtn = styled.button`
  display: flex;
  border: none;
  background-color: white;
  padding: 0.625rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #2ec4b6;
  }
`;

const HomeBtn = styled.button`
  display: flex;
  border: none;
  background-color: white;
  padding: 0.625rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #2ec4b6;
  }
`;

const LoginBtn = styled.button`
  display: flex;
  align-items: center;

  border: none;
  background-color: white;
  padding: 0.625rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #2ec4b6;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const Img = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 60px;
  height: 60px;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Nickname = styled.span`
  font-size: 20px;
  color: white;
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.users.token);
  const userInfo = useSelector((state) => state.users.userInfo);

  const { isLoading, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfo(isAuthenticated, dispatch),
    enabled: !!isAuthenticated,
    onSuccess: (data) => {
      dispatch(setUserInfo(data));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const logoutClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Navbar>
        <Main>
          <HomeBtn>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              Home
            </Link>
          </HomeBtn>
        </Main>
        <User>
          {isAuthenticated && userInfo ? (
            <>
              <Avatar>
                {userInfo.avatar ? (
                  <Img src={userInfo.avatar} alt="사용자 이미지" />
                ) : (
                  <Img src="/default-user-profile.png" alt="기본 이미지" />
                )}
              </Avatar>
              <Nickname>{userInfo.nickname} 님</Nickname>
            </>
          ) : null}
          {!isAuthenticated ? (
            <LoginBtn>
              <Link
                to="/Login"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                로그인
              </Link>
            </LoginBtn>
          ) : null}

          {isAuthenticated ? (
            <LoginBtn onClick={logoutClick}>로그아웃</LoginBtn>
          ) : null}
          <ProfileBtn>
            <Link
              to="/SignUp/MyPage"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              내 정보
            </Link>
          </ProfileBtn>
        </User>
      </Navbar>
    </>
  );
};

export default Header;
