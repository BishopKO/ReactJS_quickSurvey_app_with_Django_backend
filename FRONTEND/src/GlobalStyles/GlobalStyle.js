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
    font-family: Inter;
  }
  
   //TODO: MOVE STYLES TO MODAL
  .modal-content{
     border: none;
     display: block;
     font-size: 14px;
     width: 100%;
     text-align: center;
  }
  textarea{
    :focus{
      outline: none;
    }
  
    ::-webkit-scrollbar {
      width: 1em;     
    } 
    
    ::-webkit-scrollbar-thumb {
      background: grey;        
    }
    }
    
  
  
`;

export default GlobalStyle;