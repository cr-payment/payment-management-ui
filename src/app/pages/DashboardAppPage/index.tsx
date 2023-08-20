/**
 *
 * DashboardAppPage
 *
 */
import React from 'react';
import { Grid } from '@mui/material';
import Summary from './components/Summary';
import { useTheme } from '@mui/material/styles';
import ProjectPieChart from './components/ProjectPieChart';
import AppWebsiteVisits from './components/AppWebsiteVisits';

interface Props {}

export function DashboardAppPage(props: Props) {
  const theme = useTheme();
  const projectList = [
    { label: 'Project A', value: 4344 },
    { label: 'Project B', value: 5435 },
    { label: 'Project C', value: 1443 },
    { label: 'Project D', value: 1443 },
    { label: 'Project E', value: 1443 },
  ];
  // TODO fetch "total" field from API
  const stats = [
    {
      title: 'Total Projects',
      total: projectList.length,
      icon: 'mdi:shopping-outline',
    },
    { title: 'Total Earned', total: 10, icon: 'solar:dollar-linear' },
    { title: 'Total Orders', total: 10, icon: 'solar:bill-check-linear' },
    { title: 'Earned this month', total: 10, icon: 'solar:dollar-linear' },
  ];

  const defaultColors = [
    theme.palette.primary.light,
    theme.palette.info.light,
    theme.palette.warning.light,
    theme.palette.error.light,
    theme.palette.success.light,
    theme.palette.secondary.light,
  ];

  const chartColorList = projectList.map(
    (project, i) => defaultColors[i % defaultColors.length]
  );

  return (
    <div>
      <Summary stats={stats} />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4}>
          <ProjectPieChart
            title="Project Breakdown"
            chartData={projectList}
            chartColors={chartColorList}
            subheader={undefined}
          />
        </Grid>
        <Grid item xs={8}>
          <AppWebsiteVisits
            title="Total Earned"
            subheader={undefined}
            chartLabels={[
              '01/02/2023',
              '02/02/2023',
              '03/02/2023',
              '04/02/2023',
              '05/02/2023',
              '06/02/2023',
              '07/02/2023',
              '08/02/2023',
              '09/02/2023',
              '10/02/2023',
              '11/02/2023',
              '12/02/2023',
            ]}
            chartData={[
              {
                name: 'Month total',
                type: 'column',
                fill: 'solid',
                // data được lưu ntn?
                data: [23, 11],
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}
