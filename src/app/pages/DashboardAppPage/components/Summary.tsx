import { Grid } from '@mui/material';
import React from 'react';
import AppWidgetSummary from './AppWidgetSummary';
import { Iconify } from '../../../components/Iconify/index';
// src\app\components\Iconify\index.tsx
// src\app\components\DashboardAppPage\Summary.tsx\
// src\app\pages\DashboardAppPage\components\AppWidgetSummary.tsx
// src\app\pages\DashboardAppPage\components\Summary.tsx

const Summary = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={stat.title}
            total={stat.total}
            icon={stat.icon}
            sx={undefined}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default Summary;
