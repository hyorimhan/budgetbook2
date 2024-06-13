import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../store/slices/userSlice';
import { fetchUserInfo } from '../api/account';
import { updateUser } from '../api/auth';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 60px;

  display: flex;
  flex-direction: column;
`;

const Profiles = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 0 auto;
  border-bottom: 1px solid black;
  width: 450px;
  background-color: white;
  border: none;
  border-radius: 10px;
`;

const Profile = styled.span`
  display: flex;
  font-size: 20px;
`;
const Nickname = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 auto;
  border: none;
  background-color: #2ec4b6;
  border-radius: 10px;
  font-size: 20px;
  margin-bottom: 20px;
  padding: 5px;
  width: 300px;
`;

const Form = styled.form`
  display: flex;
  margin: 20px auto 0 auto;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  display: flex;
  width: 300px;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #c7c7c7;
  border-radius: 10px;
  height: 30px;
  font-size: 20px;
`;

const Img = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 80px;
  height: 80px;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.token);
  const userInfo = useSelector((state) => state.users.userInfo);

  useEffect(() => {
    const loginData = async () => {
      if (!isAuthenticated) {
        alert('로그인이 필요합니다');
        navigate('/login');
      } else {
        await fetchUserInfo(isAuthenticated, dispatch);
      }
    };
    loginData();
  }, [isAuthenticated, navigate, dispatch]);

  const handleNicknameChange = async (e) => {
    e.preventDefault();
    try {
      const updateData = await updateUser(
        userName,
        userAvatar,
        isAuthenticated
      );
      if (updateData.success) {
        const updateUserInfo = {
          ...userInfo,
          nickname: updateData.nickname,
          avatar: updateData.avatar || userInfo.avatar,
        };
        dispatch(setUserInfo(updateUserInfo));
        alert('닉네임이 변경되었습니다');
        setUserName('');
        setUserAvatar(null);
      } else {
        alert('닉네임 변경에 실패했습니다');
      }
    } catch (error) {
      console.error('Failed to update nickname:', error);
      alert('닉네임 변경에 실패했습니다');
      return null;
    }
  };

  return (
    <Container>
      <Profiles>
        <Profile>
          <Form onSubmit={handleNicknameChange}>
            <Avatar>
              {userInfo && userInfo.avatar ? (
                <Img src={userInfo.avatar} alt="사용자 이미지" />
              ) : (
                <Img src="/default-user-profile.png" alt="기본 이미지" />
              )}
            </Avatar>
            <Input
              type="file"
              ref={fileRef}
              onChange={(e) => {
                setUserAvatar(e.target.files[0]);
              }}
            />
            <Input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="새 닉네임"
              autoFocus
            />
            <Nickname type="submit">수정</Nickname>
          </Form>
        </Profile>
      </Profiles>
    </Container>
  );
};

export default UserProfile;
