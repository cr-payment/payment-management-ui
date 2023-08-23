/**
 *
 * ListProjectPage
 *
 */
import React, { ChangeEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Card, Table, Stack, Paper, MenuItem, TableBody } from '@mui/material';
import { Avatar, Button, Popover, TableRow } from '@mui/material';
import { TableCell, Container, Typography } from '@mui/material';
import { IconButton, TableContainer, TablePagination } from '@mui/material';
import { Iconify, Label, Loading } from 'app/components';
import USERLIST from '_mock/project';
import {
  Head as ProjectListHead,
  Toolbar as ProjectListToolbar,
} from './components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProjectsSlice } from './slice';
import { Project } from '../ProjectPage/slice/types';
import { selectProjects } from './slice/selectors';

interface Props {}

interface ITableHead {
  id: keyof Project | '';
  label?: string;
  alignRight?: boolean;
}

const TABLE_HEAD: ITableHead[] = [
  { id: 'projectName', label: 'Name', alignRight: false },
  { id: 'noTransaction', label: 'Transaction', alignRight: false },
  { id: 'totalEarned', label: 'Earned ($)', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'createdAt', label: 'Create At', alignRight: false },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export function ListProjectPage(props: Props) {
  const [open, setOpen] = useState<{
    anchorEl: HTMLButtonElement | null;
    id: string;
  }>({ anchorEl: null, id: '' });
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<string>('name');
  const [filterName, setFilterName] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const navigate = useNavigate();
  const { loading, dataProjects } = useSelector(selectProjects);
  const dispatch = useDispatch();
  const { actions } = useProjectsSlice();

  useEffect(() => {
    dispatch(actions.getProjectsRequest());
  }, [actions, dispatch]);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | undefined
  ) => {
    if (id) {
      setOpen({ anchorEl: event.currentTarget, id });
    }
  };

  const handleCloseMenu = () => {
    setOpen({ anchorEl: null, id: '' });
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.projectName);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: string[] = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredProjects = applySortFilter(
    dataProjects,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredProjects.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>List Project</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Project
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/project/create')}
          >
            New Project
          </Button>
        </Stack>

        <Card>
          <ProjectListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          {/* <Scrollbar> */}
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ProjectListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredProjects
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Project) => {
                    const {
                      id,
                      projectName,
                      totalEarned,
                      createdAt,
                      noTransaction,
                      avatarUrl,
                      type,
                    } = row;

                    // const selectedUser = selected.indexOf(projectName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        // selected={selectedUser}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell> */}

                        <TableCell component="th" scope="row">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={projectName} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {projectName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{noTransaction}</TableCell>

                        <TableCell align="left">{totalEarned}</TableCell>

                        <TableCell align="left">
                          <Label
                            color={
                              (type === 'Payment' && 'success') || 'primary'
                            }
                          >
                            {sentenceCase(type || '')}
                          </Label>
                        </TableCell>

                        <TableCell align="left">
                          {/* {type ? 'Yes' : 'No'} */}
                          {createdAt}
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(event) => handleOpenMenu(event, id)}
                          >
                            <Iconify icon={'eva:more-vertical-fill'} />
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
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open.id)}
        anchorEl={open.anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              p: 1,
              width: 160,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => navigate(`/project/${open.id}`)}>
          <Iconify icon={'eva:info-outline'} sx={{ mr: 2 }} />
          Detail
        </MenuItem>

        <MenuItem onClick={() => navigate(`/project/edit/${open.id}`)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem>
          <Iconify icon={'ph:currency-btc-bold'} sx={{ mr: 2 }} />
          Add currency
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {loading && <Loading />}
    </>
  );
}
