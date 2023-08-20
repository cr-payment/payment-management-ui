import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  toggleNotification,
  useInfoSlice,
} from 'app/pages/SettingPage/slice/infoReducer';
import React from 'react';
import { RootState } from 'types';
import { Button, Grid, Switch, TextField } from '@mui/material';
import { selectAuth } from 'app/pages/LoginPage/slice/selectors';

const PasswordField = ({ title, defaultVal, name }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <h3>{title}</h3>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <TextField
          name={name}
          defaultValue={defaultVal}
          type="password"
          size="small"
        />{' '}
      </Grid>
    </Grid>
  );
};
// TODO retype password
const PasswordForm = () => {
  const dispatch = useDispatch();

  const password = useSelector((state: RootState) => state.info.password);

  const handleChangePassword = (event) => {
    event.preventDefault();
    const content = event.target.password.value;
    dispatch(changePassword(content));
  };
  return (
    <form onSubmit={handleChangePassword}>
      <PasswordField title="Password" defaultVal={password} name="password" />
      <PasswordField
        title="Retype password"
        defaultVal={password}
        name="retype"
      />
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
  const checked = useSelector((state: RootState) => state.info.notification);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <h3>Notification email</h3>
        <div>Receive notification emails from successful payments</div>
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
  // const email = useSelector((state : RootState) => state.info.email);
  const { actions } = useInfoSlice();

  const email = useSelector((state: RootState) => state.info.email);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <h3>Email</h3>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            name="email"
            value={email}
            type="text"
            size="small"
            disabled
          />
        </Grid>
      </Grid>
      <PasswordForm />
      <Notif />
    </div>
  );
};

export default Info;
