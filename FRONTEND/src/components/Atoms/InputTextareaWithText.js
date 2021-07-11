import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr, 2);
  width: 100%;
  font-size: inherit;
  cursor: pointer;  
`;

const StyledParagraph = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledInput = styled.textarea`  
  border: 1px solid lightgrey;
  border-radius: 5px;  
  padding: 5px;
  resize: none;
  cursor: inherit;
  
  :focus{
    outline: none;
  }
  
  ::-webkit-scrollbar {
    width: 1em;     
  } 
    
  ::-webkit-scrollbar-thumb {
    background: grey;        
  }
`;

const InputTextareaWithText = ({ text, number, actionOnChange }) => {

    const handleOnChange = (element) => {
        actionOnChange({ number: number, state: element.target.value });
    };

    return (
        <StyledWrapper>
            <StyledParagraph>
                {text}
            </StyledParagraph>
            <StyledInput type="textarea" rows={2} onChange={(element) => handleOnChange(element)}/>
        </StyledWrapper>
    );
};

export default InputTextareaWithText;
