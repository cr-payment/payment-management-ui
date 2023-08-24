/**
 *
 * AddEditProjectPage
 *
 */
import React, { FormEvent, useEffect, useState } from 'react';
import { Dialog, Grid } from '@mui/material';
import { Box, Button, Input, OutlinedInput, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectSlice } from '../ProjectPage/slice';
import { CreateProjectRequest } from '../ProjectPage/slice/types';
import { selectProject } from '../ProjectPage/slice/selectors';
import { Loading } from 'app/components';

interface Props {}

export function AddEditProjectPage(props: Props) {
  const [logo, setLogo] = useState<File | null>(null);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  const { loading, dataAddProject } = useSelector(selectProject);
  const dispatch = useDispatch();
  const { actions } = useProjectSlice();

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(actions.detailProjectRequest(id));
    } else {
      dispatch(actions.clearDataProject());
    }
  }, [actions, dispatch, id]);

  useEffect(() => {
    if (dataAddProject.id) {
      dispatch(actions.clearDataProject());
      navigate(`/project/${dataAddProject.id}`);
    }
  }, [dataAddProject]);

  const handleCreateProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const body: CreateProjectRequest = {
      projectName: data.name as string,
      email: data.email as string,
      walletId: 10,
      apiKey: 'stringApiKey',
      webHook: 'stringWebHook',
    };

    dispatch(actions.createProjectRequest(body));
  };

  const handleAddLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <Box component="form" onSubmit={handleCreateProject} sx={{ px: 3 }}>
      <Grid
        container
        sx={{ justifyContent: 'space-between', mb: 6 }}
        rowGap={3}
      >
        <Grid item xs={6}>
          <Box>
            <Typography variant="h6">Business name</Typography>
            <Typography variant="body2">
              Business name displayed on checkout page
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <OutlinedInput
            fullWidth
            name="name"
            required
            defaultValue={dataAddProject.projectName}
          />
        </Grid>

        <Grid item xs={6}>
          <Box>
            <Typography variant="h6">Business email</Typography>
            <Typography variant="body2">
              Support email displayed to customers in email invoice.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <OutlinedInput
            fullWidth
            name="email"
            required
            defaultValue={dataAddProject.email}
          />
        </Grid>

        <Grid item xs={6}>
          <Box>
            <Typography variant="h6">Business logo</Typography>
            <Typography variant="body2">
              Keep the keys secure since they won't be visible again. Generating
              new keys will overwrite the old ones.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Input
            type="file"
            onChange={handleAddLogo}
            inputProps={{ accept: 'image/*' }}
          />
        </Grid>

        <Grid item xs={6}>
          <Box>
            <Typography variant="h6">API Key</Typography>
            <Typography variant="body2">
              Keep the keys secure since they won't be visible again. Generating
              new keys will overwrite the old ones.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Button children="Generate API Key" variant="contained" />
        </Grid>

        <Grid item xs={6}>
          <Box>
            <Typography variant="h6">Webhook</Typography>
            <Typography variant="body2">
              Keep the secret secure since they won't be visible again.
              Generating new secret will overwrite the old ones.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Button children="Generate Webhook secret" variant="contained" />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6">Your webhook endpoint</Typography>
        </Grid>
        <Grid item xs={4}>
          <OutlinedInput fullWidth name="endpoint" required />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          children="Preview"
          variant="contained"
          sx={{ mr: 5 }}
          onClick={handleOpenPreview}
        />
        <Button
          children={id ? 'Update' : 'Create Project'}
          type="submit"
          variant="contained"
        />
      </Box>

      {loading && <Loading />}

      <Dialog open={openPreview} onClose={handleClosePreview} maxWidth="lg">
        <img
          src={process.env.PUBLIC_URL + '/assets/images/covers/cover_1.jpg'}
          alt="preview"
        />
      </Dialog>
    </Box>
  );
}
