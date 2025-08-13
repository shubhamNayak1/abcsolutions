import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface HighchartComponentProps {
  options: Highcharts.Options;
}

const HighchartComponent: React.FC<HighchartComponentProps> = ({ options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HighchartComponent;
