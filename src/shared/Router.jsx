import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = useSelector((state) => !!state.users.token);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const PublicRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = useSelector((state) => !!state.users.token);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/myPage" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/signUp" element={<PublicRoute element={SignUp} />} />
        <Route path="/myPage" element={<PrivateRoute element={MyPage} />} />
        <Route path="/signUp/myPage" element={<Navigate to="/myPage" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
