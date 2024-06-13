import { useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

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

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const maxLength = {
      id: 10,
      password: 15,
      nickname: 10,
    };

    if (value.length <= maxLength[name]) {
      setFormData({ ...formData, [name]: value });
    } else {
      alert(`${name}은 ${maxLength[name]}자 까지 입력 가능합니다`);
    }
  };

  //서버에 보내기
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert(response.message);
      navigate('/Login');
      console.log(response);
    } catch (error) {
      alert(`가입에 실패했습니다 ${error.response.data.message}`);
    }

    const minLength = {
      id: 4,
      password: 4,
      nickname: 1,
    };
    const { name, value } = e.target;
    if (value.length >= minLength[name]) {
      setFormData({ ...formData, [name]: value });
    } else {
      alert(`${name}은 ${minLength[name]}자 보다 적게 입력 불가능합니다`);
    }
  };
  return (
    <>
      <Container>
        <Container2>
          <Box>회원가입</Box>
          <Form onSubmit={onSubmitHandler}>
            <Box>
              <label htmlFor="id">아이디</label>
              <Input
                type="text"
                id="id"
                placeholder="아이디"
                onChange={handleChange}
                name="id"
                value={formData.id}
              />
            </Box>
            <Box>
              <label htmlFor="password">비밀번호</label>
              <Input
                type="password"
                id="password"
                placeholder="비밀번호"
                onChange={handleChange}
                name="password"
                value={formData.password}
              />
            </Box>
            <Box>
              <label htmlFor="nickname">닉네임</label>
              <Input
                type="text"
                id="nickname"
                placeholder="닉네임"
                onChange={handleChange}
                name="nickname"
                value={formData.nickname}
              />
            </Box>
            <Box>
              <LoginBtn type="submit">회원가입</LoginBtn>
              <LoginBtn
                type="button"
                onClick={() => {
                  navigate('/Login');
                }}
              >
                로그인
              </LoginBtn>
            </Box>
          </Form>
        </Container2>
      </Container>
    </>
  );
};

export default SignUpPage;
