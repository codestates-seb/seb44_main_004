import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
  @font-face {
    font-family: 'SpoqaHanSansNeo-Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'EF_jejudoldam';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_jejudoldam.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.mainLightGray200};
    font-family: 'SpoqaHanSansNeo-Regular', 'SpoqaHanSansNeo-Bold', sans-serif;
    padding-top: 6rem !important;
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, dl, dt, dd, ol, ul, li, form, label, table {
    margin: 0;
    padding: 0;
    border: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  
  input:focus {
    outline: none;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  ol, ul{
    list-style: none;
  }

  .ql-editor strong {
    font-weight: bold !important;
  }

  .ql-editor em {
    font-style: italic !important;
  }

  .title {
    font-family: 'EF_jejudoldam';
    font-size: 2.5rem;
  }

  nav {
    li[data-type='/curation/best?page='], li[data-type='/curation/new?page='], .login-btn, .register-btn {
      font-family: 'SpoqaHanSansNeo-Bold';
      font-size: 1.05rem;
    }

    .register-btn {
      padding-left: 1.2rem;
    }
  }

  .nav-title, .footer-title {
    font-family: 'EF_jejudoldam';
    font-size: 1.7rem;
  }

  .dropdown {
    font-family: 'SpoqaHanSansNeo-Bold';
    font-size: 0.9rem;
  }

  .slick-arrow .slick-prev {
    background-color: yellow;
  }

  .content-container, .reply-container {
    font-family: 'SpoqaHanSansNeo-Light';
  }

  .created-date {
    font-family: 'SpoqaHanSansNeo-Light';
    font-size: 0.9rem;
  }
`;

export default GlobalStyles;
