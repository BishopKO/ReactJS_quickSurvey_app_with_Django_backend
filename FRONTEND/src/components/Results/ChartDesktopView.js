import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 20px;
`

const MainQuestionWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 20px;
`

const AnswersWrapper = styled.div`
display: flex;
flex-direction: column;
`

const ChartWrapper = styled.div`    
  width: 50%;
  margin-left: 50px;
`

const backgroundChartColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
]

const questionsColors = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
]

const borderColors = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
]

const prepare_data = (data) => {
    return {
        labels: data.map(() => ''),
        datasets: [
            {
                data: data,
                backgroundColor: backgroundChartColors,
                borderColor: borderColors,
                borderWidth: 2,
            },
        ],
    }
}

// TODO: ADD ALL ANSWERS COUNT ON THE PAGE TOP
// TODO: ADD FLOAT PRECISION
const ChartDesktopView = ({ chartResults }) => {
    useEffect(() => {
        console.log(chartResults)
    })

    return (
        <MainWrapper>
            {Object.values(chartResults).map((item) => {
                return (
                    <MainQuestionWrapper>
                        <AnswersWrapper>
                            <span style={{ fontWeight: 'bold' }}>{item.question}</span>
                            {item.answers && item.answers.map(function(answer, index) {
                                return (
                                    <div>
                                        <span
                                            style={{ color: questionsColors[index] }}>
                                            {answer} - {((item.counter[index] * 100) / this).toFixed(2)}%
                                        </span>
                                    </div>
                                )
                            }, [item.counter.reduce((acc, item) => acc + item)])}
                        </AnswersWrapper>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ChartWrapper>
                                <Bar data={item.counter && prepare_data(item.counter)}/>
                            </ChartWrapper>
                        </div>

                    </MainQuestionWrapper>

                )
            })}
        </MainWrapper>

    )

}

export default ChartDesktopView