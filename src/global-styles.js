import { injectGlobal } from 'styled-components';

injectGlobal`
  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    font-family: 'Helvetica', 'Arial', 'PingFang TC', 'Heiti TC', 'Microsoft Jhenghei', sans-serif;
    font-size: 14px;
  }

  #app {
    height: 100%;
  }

  body,
  input {
    background-color: #FAFAFA;
  }

  a {
    text-decoration: none;
  }
`;