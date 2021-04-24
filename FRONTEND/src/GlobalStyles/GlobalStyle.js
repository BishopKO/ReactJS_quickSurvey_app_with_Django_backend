import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .modal-content{
     border: none;
     display: block;
     font-size: 14px;
     width: 100%;
     text-align: center;
  }
  
  .btn-outline-dark{
    opacity: 0.9;
  }
  
`;

export default GlobalStyle;