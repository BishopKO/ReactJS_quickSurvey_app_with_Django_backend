import React from 'react';
import { useParams } from 'react-router';

const ChartDesktopView = () => {
    const { id } = useParams();

    return (
        <div>
            CHART {id}
        </div>
    );
};

export default ChartDesktopView;