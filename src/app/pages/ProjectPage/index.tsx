/**
 *
 * ProjectPage
 *
 */

import { faker } from '@faker-js/faker';
import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Iconify, Loading } from 'app/components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AppWidgetSummary from '../DashboardAppPage/components/AppWidgetSummary';
import { useProjectSlice } from './slice';
import { selectProject } from './slice/selectors';

interface Props {}

export function ProjectPage(props: Props) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { loading, dataPayments, dataProject } = useSelector(selectProject);
  const dispatch = useDispatch();
  const { actions } = useProjectSlice();

  const stats = [
    {
      title: 'Total Earned',
      total: +faker.finance.amount(1000, 10000, 2),
      icon: 'solar:dollar-linear',
    },
    {
      title: 'Total Orders',
      total: dataPayments.length,
      icon: 'solar:bill-check-linear',
    },
  ];

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(actions.detailProjectRequest(id));
    }
  }, [id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataPayments.length) : 0;

  const isNotFound = !dataPayments.length;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item key={index} xs={6} md={3}>
            <AppWidgetSummary
              title={stat.title}
              total={stat.total}
              icon={stat.icon}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              py: 5,
              px: 4,
              boxShadow: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              height: '238px',
              color: (theme) => theme.palette.primary.dark,
              bgcolor: (theme) => (theme.palette.primary as any).lighter,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">API Public Key: </Typography>
                <Typography variant="body2">{dataProject?.apiKey} </Typography>
                <Iconify icon="ph:eye-light" width={25} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">Webhook URL: </Typography>
                <Typography variant="body2">{dataProject?.webHook}</Typography>
              </Box>
            </Box>

            <Box>
              <StyledIcon
                sx={{
                  color: (theme) => theme.palette.primary.dark,
                  backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(
                      theme.palette.primary.dark,
                      0
                    )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/project/edit/${id}`)}
              >
                <Iconify icon="ep:setting" width={24} />
              </StyledIcon>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 3, overflow: 'auto' }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.alignRight ? 'right' : 'left'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {dataPayments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    amount,
                    avatarUrl,
                    createdAt,
                    currency,
                    transactionHash,
                    name,
                  } = row;

                  return (
                    <TableRow hover key={index} tabIndex={-1} role="checkbox">
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src={avatarUrl} />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">
                        {`${transactionHash?.slice(
                          0,
                          6
                        )}...${transactionHash?.slice(-4)}`}
                      </TableCell>

                      <TableCell align="left">{currency}</TableCell>

                      <TableCell align="left">{amount}</TableCell>

                      <TableCell align="left">{createdAt}</TableCell>

                      <TableCell align="right">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={handleOpenMenu}
                        >
                          <Iconify icon={'ic:outline-find-in-page'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataPayments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              p: 1,
              width: 140,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {loading && <Loading />}
    </Box>
  );
}

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
}));

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'transactionHash', label: 'Transaction Hash', alignRight: false },
  { id: 'currency', label: 'Currency', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'createdAt', label: 'Create At', alignRight: false },
  { id: 'detail', label: 'Detail', alignRight: false },
];
