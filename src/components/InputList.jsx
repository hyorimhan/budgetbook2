import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { postList } from '../api/auth';
import { useEffect } from 'react';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Container2 = styled.section`
  border: none;
  border-radius: 16px;
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
  padding: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgb(233, 236, 239);

  font-size: 18px;
  border-radius: 16px;
  height: 65px;
  padding: 20px;
  margin-top: 10px;

  &:hover {
    background-color: #2ec4b6;
    /* color: white; */
  }
`;

const Box2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Span = styled.span`
  display: inline-block;
  margin: 10px;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 인풋값 가져와서 맞는 달에 뿌리기

const InputList = () => {
  const saveMonth = useSelector((state) => state.budget.saveMonth);
  const isAuthenticated = useSelector((state) => state.users.token);
  const navigate = useNavigate();

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['items'],
    queryFn: postList,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      alert('로그인 정보가 만료되었습니다');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>로딩중입니다</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다</div>;
  }

  const filterList = items.filter((item) => {
    const date = Number(item.date.slice(6, 7));
    return date === saveMonth;
  });

  return (
    <Container>
      <Container2>
        {filterList.map((item) => {
          return (
            <Link
              to={`/detail/${item.id}`}
              style={{ textDecoration: 'none' }}
              key={item.id}
            >
              <Box>
                <Box2>
                  <Span>{item.date}</Span>
                  <Span>항목: {item.item}</Span>
                  <Span>작성자: {item.userId || item.createdBy}</Span>
                </Box2>
                <Box2>
                  <Span>내용: {item.description}</Span>
                  <Span>금액: {item.amount}원</Span>
                </Box2>
              </Box>
            </Link>
          );
        })}
      </Container2>
    </Container>
  );
};

export default InputList;
