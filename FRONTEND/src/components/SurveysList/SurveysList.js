import React, { useEffect, useState } from 'react';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import { sendQueryUsingTokens } from '../../utils/jwt';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 30px auto;
  justify-content: center;  
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 5px;
`;

const ButttonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2px; 
  
`;

const listGroupStyle = {
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'wrap-around',
    background: 'lightgrey',
    marginTop: '5px',
};

const TestWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 2px;
  margin-top: 5px;

`;

// TODO: data order by date

const SurveysList = () => {
    const [surveysList, setSurveysList] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem('username');

        sendQueryUsingTokens('surveys_list', {
            username: username,
            order: 'date',
        }).then(response => setSurveysList(response.data)).catch(error => console.log(error));
    }, []);

    return (
        <MainWrapper>
            {surveysList.map(item => {
                return (
                    <TestWrapper>
                        <ListGroup>
                            <span style={{ textAlign: 'center' }}>{item.date}</span>
                            <ListGroup.Item variant="secondary">{item.title}</ListGroup.Item>
                        </ListGroup>
                        <ButttonsWrapper>
                            <ButtonGroup>
                                <Button size="sm" variant="outline-success">Results</Button>
                                <Button size="sm" variant="outline-primary">Edit</Button>
                            </ButtonGroup>
                            <Button size="sm" variant="outline-danger">Delete</Button>
                        </ButttonsWrapper>

                    </TestWrapper>
                );
            })}


        </MainWrapper>
    );
};

export default SurveysList;
