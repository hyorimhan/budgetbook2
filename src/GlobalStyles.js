import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  body {
    background-color: #2ec4b6;
    margin: 0 auto;
    font-family: 'Pretendard-Regular', sans-serif;

  }
  * {
  font-family: 'Pretendard-Regular', sans-serif;
  user-select: none;
  }

`;

export default GlobalStyles;
