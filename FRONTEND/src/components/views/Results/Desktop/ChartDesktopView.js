import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    MainWrapperChart,
    MainQuestionWrapperChart,
    ChartWrapper,
    AnswersWrapperChart,
    CounterWrapperChart,
} from './styledComponents';


const backgroundChartColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
];

const questionsColors = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
];

const borderColors = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
];

const prepare_data = (data) => {
    return {
        labels: data.map((item, index) => index + 1),
        datasets: [
            {
                data: data,
                backgroundColor: backgroundChartColors,
                borderColor: borderColors,
                borderWidth: 2,
            },
        ],
    };
};

const options = {
    plugins: {
        legend: { display: false },
    },
};

const ChartDesktopView = ({ chartResults }) => {
    const count = Object.values(chartResults).length;
    useEffect(() => {
        console.log(count);
    });

    return (
        <MainWrapperChart>
            <CounterWrapperChart>All answers: {count}</CounterWrapperChart>
            {Object.values(chartResults).map((item) => {
                return (
                    <MainQuestionWrapperChart>
                        <AnswersWrapperChart>
                            <span style={{ fontWeight: 'bold' }}>{item.question}</span>
                            {item.answers && item.answers.map(function(answer, index) {
                                return (
                                    <div>
                                        <span
                                            style={{ color: questionsColors[index] }}>
                                            {answer} - {((item.counter[index] * 100) / this).toFixed(3)}%
                                        </span>
                                    </div>
                                );
                            }, [item.counter.reduce((acc, item) => acc + item)])}
                        </AnswersWrapperChart>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ChartWrapper>
                                <Bar data={item.counter && prepare_data(item.counter)}
                                     options={options}/>
                            </ChartWrapper>
                        </div>

                    </MainQuestionWrapperChart>

                );
            })}
        </MainWrapperChart>

    );

};

export default ChartDesktopView;