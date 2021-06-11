import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,*::before, *::after{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  
  #root{
    width: 100vw;   
    display: flex;    
    flex-direction: column;       
    align-items: center;
  }
  
   //TODO: MOVE STYLES TO MODAL
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