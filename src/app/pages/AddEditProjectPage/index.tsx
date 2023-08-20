/**
 *
 * AddEditProjectPage
 *
 */
import React from 'react';
import { Grid } from '@mui/material';
import { Box, Button, Input, OutlinedInput, Typography } from '@mui/material';

interface Props {}

export function AddEditProjectPage(props: Props) {
  return (
    <Box>
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
          <OutlinedInput fullWidth />
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
          <OutlinedInput fullWidth />
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
          <Input type="file" />
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
          <OutlinedInput fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
        <Button children="Create Project" variant="contained" />
      </Box>
    </Box>
  );
}
