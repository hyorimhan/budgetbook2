import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { jsonUrl } from '../url/url';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  /* padding: 2rem; */

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Container2 = styled.section`
  border: none;
  border-radius: 16px;
  background-color: rgb(255, 255, 255);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 0;
  width: 750px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: flex;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  width: 750px;
  height: 38px;

  margin: 0 auto;

  justify-content: center;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 10px auto;
  height: 30px;
  border: none;
  border-radius: 4px;
  gap: 10px;
`;

const EditBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  border: none;
  border-radius: 4px;

  background-color: rgb(0, 123, 255);
  color: rgb(255, 255, 255);
  cursor: pointer;
  &:hover {
    background-color: rgb(40, 144, 255);
  }
`;

const DelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  border: none;
  border-radius: 4px;

  background-color: rgb(255, 77, 77);
  color: rgb(255, 255, 255);
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 96, 96);
  }
`;

const BackBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  border: none;
  border-radius: 4px;
  background-color: rgb(108, 117, 125);
  color: rgb(255, 255, 255);
  cursor: pointer;

  &:hover {
    background-color: rgb(122, 128, 133);
  }
`;

const DetailPage = () => {
  const userInfo = useSelector((state) => state.users.userInfo);
  const queryClient = useQueryClient();
  const { detailId } = useParams();
  const dateRef = useRef(null);
  const itemRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.users.token);

  const navigate = useNavigate();

  // 비로그인 접근 x
  useEffect(() => {
    if (!isAuthenticated) {
      alert('로그인한 사용자만 접근 가능합니다');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // 서버에서 클릭한 글 데이터 가져옴
  const fetchDetailById = async ({ queryKey }) => {
    const id = queryKey[1];
    const response = await axios.get(`${jsonUrl}/${id}`);
    return response.data;
  };

  const {
    data: posts = [],
    isPostLoading,
    isPostError,
  } = useQuery({
    queryKey: ['posts', detailId],
    queryFn: fetchDetailById,
  });

  // 삭제
  const deletePost = async (id) => {
    await axios.delete(`${jsonUrl}/${id}`);
  };

  // 수정
  const editPost = async (editInput) => {
    await axios.patch(`${jsonUrl}/${editInput.id}`, editInput);
  };

  // 삭제 요청을 보냄
  const delPostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate('/');
    },
  });

  // 수정 요청을 보냄
  const { mutate: editCash } = useMutation({
    mutationFn: (editInput) => editPost(editInput),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate('/');
    },
  });

  if (isPostLoading) {
    return <div>로딩중입니다</div>;
  }

  if (isPostError) {
    return <div>오류가 발생했습니다</div>;
  }

  // 수정 버튼
  function editClickBtn() {
    const editInput = {
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      id: detailId,
    };

    if (userInfo.id === posts.userId) {
      editCash(editInput);
    } else {
      alert('작성자만 수정할 수 있습니다');
    }
  }

  // 삭제 버튼
  const delClickBtn = () => {
    if (confirm('이 값을 삭제하시겠습니까?')) {
      if (userInfo.id === posts.userId) {
        delPostMutation.mutate(detailId);
      } else {
        alert('작성자만 삭제할 수 있습니다');
      }
    }
  };

  return (
    <Container>
      <Container2>
        <Box>
          <label htmlFor="date">날짜</label>
          <Input
            type="date"
            id="date"
            defaultValue={posts.date}
            ref={dateRef}
          />
        </Box>
        <Box>
          <label htmlFor="item">항목</label>
          <Input
            type="text"
            id="item"
            placeholder="항목"
            defaultValue={posts.item}
            ref={itemRef}
          />
        </Box>
        <Box>
          <label htmlFor="amount">금액</label>
          <Input
            type="number"
            id="amount"
            placeholder="금액"
            defaultValue={posts.amount}
            ref={amountRef}
          />
        </Box>
        <Box>
          <label htmlFor="description">내용</label>
          <Input
            type="text"
            id="description"
            placeholder="지출 내용"
            defaultValue={posts.description}
            ref={descriptionRef}
          />
        </Box>
        <BtnBox>
          <EditBtn onClick={editClickBtn}>수정</EditBtn>
          <DelBtn onClick={delClickBtn}>삭제</DelBtn>
          <BackBtn onClick={() => navigate('/')}>뒤로 가기</BackBtn>
        </BtnBox>
      </Container2>
    </Container>
  );
};

export default DetailPage;
