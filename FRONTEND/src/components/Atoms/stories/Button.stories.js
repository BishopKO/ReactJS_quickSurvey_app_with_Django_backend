import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../Button';
import styled from 'styled-components';

const colors = ['red', 'green', 'blue', 'grey'];

const StyledNormalWrapper = styled.div`
  display: flex;
  margin-right: 5px;
  button{
    font-family: Inter;
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

const StyledSubmitWrapper = styled.div`  
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 500px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
`;

storiesOf('Atoms/Button', module).add('All', () =>
    <>
        {colors.map(color => {
            return (
                <StyledNormalWrapper>
                    <Button text="Go Back" color={color} type={'outline'}
                            action={() => console.log('Button Action')}/>
                    <Button text="Go Back" color={color}
                            action={() => console.log('Button Action')}/>
                </StyledNormalWrapper>
            );
        })}
        {colors.map(color => {
            return (
                <StyledSubmitWrapper>
                    <Button text="Go Back" color={color} type="submit"
                            action={() => console.log('Button Action')}/>

                </StyledSubmitWrapper>
            )
                ;
        })}

    </>);