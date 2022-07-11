import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { IntervalType } from '@syncfusion/ej2/heatmap';
import { ChartRangePadding, EdgeLabelPlacement, ValueType } from '@syncfusion/ej2/charts';


const LineChart = ({ lineChartData } : { lineChartData: { x: Date; y: number; }[][] }) => {

    let valueType: ValueType = "DateTime";
    let intervalType: IntervalType = "Months";
    let edgeLabelPlacement: EdgeLabelPlacement = "Shift";
    let rangePadding: ChartRangePadding = "None";


    useEffect(() => {
      setLineSeriesDoc({ ...lineSeriesDoc, dataSource: lineChartData[0]})
      setLineSeriesUrl({ ...lineSeriesUrl, dataSource: lineChartData[1]})
    }, [lineChartData])

    const [lineSeriesDoce, setLineSeriesDoce] = useState([
        [
          { x: new Date(2022, 0, 1) },
          { x: new Date(2022, 1, 1), y: 32 },
          { x: new Date(2022, 2, 1), y: 36 },
          { x: new Date(2022, 3, 1), y: 38 },
          { x: new Date(2022, 3, 4), y: 54 },
          { x: new Date(2022, 4, 1), y: 57 },
          { x: new Date(2022, 5, 1), y: 70 },
        ]
      ])
    const [lineSeriesUrle, setLineSeriesUrle] = useState([
      
        [
          { x: new Date(2022, 0, 1) },
          { x: new Date(2022, 1, 1) },
          { x: new Date(2022, 2, 1), y: 30 },
          { x: new Date(2022, 3, 1), y: 39 },
          { x: new Date(2022, 3, 4), y: 50 },
          { x: new Date(2022, 4, 1), y: 70 },
          { x: new Date(2022, 5, 1), y: 100 },
        ],
      ]);
    
    const [lineSeriesDoc, setLineSeriesDoc] = useState(
        { dataSource: lineChartData[0],
          xName: 'x',
          yName: 'y',
          name: 'Documents',
          width: '2',
          marker: { visible: true, width: 10, height: 10 },
          type: 'Line' }
        )
    const [lineSeriesUrl, setLineSeriesUrl] = useState(
        { dataSource: lineChartData[1],
          xName: 'x',
          yName: 'y',
          name: 'Urls',
          width: '2',
          marker: { visible: true, width: 10, height: 10 },
          type: 'Line' },
      
      );

    const [LinePrimaryXAxis, setLinePrimaryXAxis] = useState({
        valueType: valueType,
        labelFormat: 'y',
        intervalType: intervalType,
        edgeLabelPlacement: edgeLabelPlacement,
        majorGridLines: { width: 0 },
        background: 'white',
      });
      
    const [LinePrimaryYAxis, setLinePrimaryYAxis] = useState({
        labelFormat: '{value}',
        rangePadding: rangePadding,
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
        <SeriesDirective key={0} {...lineSeriesDoc} />
        <SeriesDirective key={1} {...lineSeriesUrl} />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
