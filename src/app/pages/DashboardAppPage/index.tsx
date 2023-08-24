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
    { label: 'Larson - Kutch', value: 5344 },
    { label: 'Willms LLC', value: 4435 },
    { label: 'Lubowitz Group', value: 1443 },
    { label: 'Kassulke - Homenick', value: 1103 },
    { label: 'Other', value: 943 },
  ];
  // TODO fetch "total" field from API
  const stats = [
    {
      title: 'Total Projects',
      total: 26,
      icon: 'mdi:shopping-outline',
    },
    { title: 'Total Earned ($)', total: 144663, icon: 'solar:dollar-linear' },
    { title: 'Total Orders', total: 167, icon: 'solar:bill-check-linear' },
    { title: 'Earned this month', total: 6845, icon: 'solar:dollar-linear' },
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
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
            ]}
            chartData={[
              {
                name: 'Month total',
                type: 'column',
                fill: 'solid',
                data: [19262, 15346, 21035, 20134, 15243, 19262, 13346, 21035],
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}
