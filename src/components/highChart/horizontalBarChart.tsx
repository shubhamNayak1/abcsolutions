import React from 'react';
import HighchartComponent from './highchartComponent';
import Highcharts from 'highcharts';
import Card from '../card/card';

interface HorizontalBarChartProps {
  title: string;
  xAxis: string[];
  series: Highcharts.SeriesOptionsType[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ title, xAxis, series }) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
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

export default HorizontalBarChart;
