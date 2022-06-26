import React from 'react';

import ChartHeader from '../components/charts/ChartHeader';
import StackedChart from '../components/charts/StackedChart';

const stacked = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartHeader category="Stacked" title="Revenue Breakdown" />
    <div className="w-full">
      <StackedChart />
    </div>
  </div>
);

export default stacked;
