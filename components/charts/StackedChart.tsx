import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts';


const StackedChart = ({ width, height, stackedChartData } : { width: string, height: string, stackedChartData: {x: string, y: number}[][] }) => {

    type ValueType = "Category" | "Double" | "DateTime" | "Logarithmic" | "DateTimeCategory";
    type LabelIntersectAction = "None" | "Rotate45" | "Hide" | "Trim" | "Wrap" | "MultipleRows" | "Rotate90";
    let valueType: ValueType = "Category";
    let labelIntersectAction: LabelIntersectAction = "Rotate45";

    useEffect(() => {
      setSeriesDoc({ ...customSeriesDoc, dataSource: stackedChartData[0]})
      setSeriesUrl({ ...customSeriesUrl, dataSource: stackedChartData[1]})
    }, [stackedChartData])
    

    const [customSeriesDoc, setSeriesDoc] = useState({ 
      dataSource: stackedChartData[0],
      xName: 'x',
      yName: 'y',
      name: 'Documents',
      type: 'StackingColumn',
      background: 'blue'
    })

    const [customSeriesUrl, setSeriesUrl] = useState({ 
      dataSource: stackedChartData[1],
      xName: 'x',
      yName: 'y',
      name: 'Urls',
      type: 'StackingColumn',
      background: 'red'
    })

    const [stackedPrimaryXAxis, setStackedPrimaryXAxis] = useState({
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: labelIntersectAction,
        valueType: valueType,
      });
      
    const [stackedPrimaryYAxis, setStackedPrimaryYAxis] = useState({
        lineStyle: { width: 0 },
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
        <SeriesDirective key={0} {...customSeriesDoc} />
        <SeriesDirective key={1} {...customSeriesUrl} />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default StackedChart;