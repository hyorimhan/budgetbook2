import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setSaveMonth } from '../store/slices/budgetSlice';
import { postList } from '../api/auth';
import { useQuery } from '@tanstack/react-query';

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
  padding: 20px;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;
const Span = styled.span`
  margin: 1px;
`;
// 누적 값 합계 표시
const SumValue = () => {
  const dispatch = useDispatch();
  const saveMonth = useSelector((state) => state.budget.saveMonth);

  useEffect(() => {
    localStorage.setItem('month', saveMonth);
  }, [saveMonth]);

  useEffect(() => {
    const storeSaveMonth = Number(localStorage.getItem('month'));
    if (storeSaveMonth) {
      dispatch(setSaveMonth(storeSaveMonth));
    }
  }, [dispatch]);

  const {
    data: posts = [],
    isPostLoading,
    isPostError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postList,
  });

  if (isPostLoading) {
    return <div>로딩중입니다</div>;
  }

  if (isPostError) {
    return <div>오류가 발생했습니다</div>;
  }

  const sum = posts.filter((item) => {
    const date = parseInt(item?.date.slice(6, 7));
    return date === saveMonth;
  });

  const monthTotal = sum.reduce((total, item) => {
    return Number(total) + Number(item.amount);
  }, 0);

  if (Number.isNaN(saveMonth)) {
    dispatch(setSaveMonth(5));
  }

  return (
    <Container>
      <Container2>
        <Box>
          <Span>
            {saveMonth}월 총 지출: {monthTotal}원
          </Span>
        </Box>
      </Container2>
    </Container>
  );
};

export default SumValue;
