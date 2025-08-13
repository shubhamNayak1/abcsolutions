import React from 'react';
import HighchartComponent from './highchartComponent';
import Highcharts from 'highcharts';
import Card from '../card/card';

interface BarChartProps {
  title: string;
  xAxis: string[];
  series: Highcharts.SeriesOptionsType[];
}

const BarChart: React.FC<BarChartProps> = ({ title, xAxis, series }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: xAxis,
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: series,
    credits: {
      enabled: false,
    },
  };

  return (
    <Card>
      <HighchartComponent options={options} />
    </Card>
  );
};

export default BarChart;
