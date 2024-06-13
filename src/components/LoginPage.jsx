import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';
import { loginUser } from '../api/auth';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Container2 = styled.section`
  border: none;
  border-radius: 16px;
  background-color: rgb(255, 255, 255);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 20px 0;
`;

const LoginBtn = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  justify-self: flex-end;
  align-self: flex-end;
  width: 700px;
  height: 50px;
  background-color: #858585;
  margin: 5px;

  font-size: 20px;
  &:hover {
    color: rgb(255, 255, 255);
  }
`;

const Input = styled.input`
  display: flex;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  width: 700px;
  height: 50px;
  justify-content: center;
`;
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onSubmitHandler = async (loginData) => {
    try {
      const response = await loginUser(loginData);
      if (response.success) {
        dispatch(login(response.accessToken));
        navigate('/');
      } else {
        alert('로그인에 실패하였습니다');
      }
    } catch (error) {
      alert(`오류가 발생했습니다 ${error.response.data.message}`);
    }
  };

  return (
    <>
      <Container>
        <Container2>
          <Box>로그인</Box>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitHandler(loginData);
            }}
          >
            <Box>
              <label htmlFor="id">아이디</label>
              <Input
                type="text"
                id="id"
                name="id"
                placeholder="아이디"
                value={loginData.id}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <label htmlFor="password">비밀번호</label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                value={loginData.password}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <LoginBtn type="submit">로그인</LoginBtn>
              <LoginBtn
                type="button"
                onClick={() => {
                  navigate('/SignUp');
                }}
              >
                회원가입
              </LoginBtn>
            </Box>
          </Form>
        </Container2>
      </Container>
    </>
  );
};

export default LoginPage;
