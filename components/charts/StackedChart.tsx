import React, { useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';

const StackedChart = ({ width, height } : { width: string, height: string }) => {

    const [stackedChartData, setStackedChartData] = useState([
        [
          { x: 'Jan', y: 111.1 },
          { x: 'Feb', y: 127.3 },
          { x: 'Mar', y: 143.4 },
          { x: 'Apr', y: 159.9 },
          { x: 'May', y: 159.9 },
          { x: 'Jun', y: 159.9 },
          { x: 'July', y: 159.9 },
        ],
        [
          { x: 'Jan', y: 111.1 },
          { x: 'Feb', y: 127.3 },
          { x: 'Mar', y: 143.4 },
          { x: 'Apr', y: 159.9 },
          { x: 'May', y: 159.9 },
          { x: 'Jun', y: 159.9 },
          { x: 'July', y: 159.9 },
        ],
      ]);

    const [stackedCustomSeries, setStackedCustomSeries] = useState([

        { dataSource: stackedChartData[0],
          xName: 'x',
          yName: 'y',
          name: 'Documents',
          type: 'StackingColumn',
          background: 'blue',
      
        },
      
        { dataSource: stackedChartData[1],
          xName: 'x',
          yName: 'y',
          name: 'Urls',
          type: 'StackingColumn',
          background: 'red',
      
        },
      
      ]);

    const [stackedPrimaryXAxis, setStackedPrimaryXAxis] = useState({
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category',
      });
      
    const [stackedPrimaryYAxis, setStackedPrimaryYAxis] = useState({
        lineStyle: { width: 0 },
        minimum: 100,
        maximum: 400,
        interval: 100,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '{value}',
      });

  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background="#fff"
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default StackedChart;