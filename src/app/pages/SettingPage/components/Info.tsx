import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  toggleNotification,
  useInfoSlice,
} from 'app/pages/SettingPage/slice/infoReducer';
import React from 'react';
import { RootState } from 'types';
import {
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { selectAuth } from 'app/pages/LoginPage/slice/selectors';
import { selectEmail, selectNotification } from '../slice/selectors';

const PasswordField = ({ title, defaultVal, name }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          name={name}
          defaultValue={defaultVal}
          type="password"
          size="small"
          sx={{width:300}}
        />{' '}
      </Grid> 
    </Grid>
  );
};
// TODO retype password
const PasswordForm = () => {
  const dispatch = useDispatch();

  const handleChangePassword = (event) => {
    event.preventDefault();
    const content = event.target.password.value;
    dispatch(changePassword(content));
  };
  return (
    <form onSubmit={handleChangePassword}>
      <PasswordField
        title="Password"
        defaultVal="passwordpassword"
        name="password"
      />
      <Box flexGrow={15} my={2}></Box>
      <PasswordField
        title="Retype password"
        defaultVal="passwordpassword"
        name="retype"
      />
      <Box flexGrow={15} my={2}></Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const Notif = () => {
  const dispatch = useDispatch();
  const checked = useSelector(selectNotification);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h6">Notification email</Typography>
        <Typography variant="body1">
          Receive notification emails from successful payments
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Switch
          checked={checked}
          onChange={() => dispatch(toggleNotification(checked))}
        />
      </Grid>
    </Grid>
  );
};

const Info = () => {
  const { actions } = useInfoSlice();
  const email = useSelector(selectEmail);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6">Email</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            name="email"
            value={email}
            type="text"
            size="small"
            disabled
            sx={{width:300}}
          />
        </Grid>
      </Grid>
      <Box flexGrow={15} my={2}></Box>
      <PasswordForm />
      <Box flexGrow={15} my={2}></Box>
      <Notif />
    </div>
  );
};

export default Info;
