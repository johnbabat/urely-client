import React, { useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

const LineChart = () => {

    const [lineChartData, setLineChartData] = useState([
        [
          { x: new Date(2016, 0, 1) },
          { x: new Date(2017, 0, 1) },
          { x: new Date(2018, 0, 1), y: 36 },
          { x: new Date(2019, 0, 1), y: 38 },
          { x: new Date(2020, 0, 1), y: 54 },
          { x: new Date(2021, 0, 1), y: 57 },
          { x: new Date(2022, 0, 1), y: 70 },
        ],
      
        [
          { x: new Date(2016, 0, 1) },
          { x: new Date(2017, 0, 1) },
          { x: new Date(2018, 0, 1), y: 30 },
          { x: new Date(2019, 0, 1), y: 39 },
          { x: new Date(2020, 0, 1), y: 50 },
          { x: new Date(2021, 0, 1), y: 70 },
          { x: new Date(2022, 0, 1), y: 100 },
        ],
      ]);
    
    const [lineCustomSeries, setLineCustomSeries] = useState([
        { dataSource: lineChartData[0],
          xName: 'x',
          yName: 'y',
          name: 'Documents',
          width: '2',
          marker: { visible: true, width: 10, height: 10 },
          type: 'Line' },
      
        { dataSource: lineChartData[1],
          xName: 'x',
          yName: 'y',
          name: 'Urls',
          width: '2',
          marker: { visible: true, width: 10, height: 10 },
          type: 'Line' },
      
      ]);

    const [LinePrimaryXAxis, setLinePrimaryXAxis] = useState({
        valueType: 'DateTime',
        labelFormat: 'y',
        intervalType: 'Years',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 },
        background: 'white',
      });
      
    const [LinePrimaryYAxis, setLinePrimaryYAxis] = useState({
        labelFormat: '{value}',
        rangePadding: 'None',
        minimum: 0,
        maximum: 100,
        interval: 20,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
      });

    

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background="#fff"
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
