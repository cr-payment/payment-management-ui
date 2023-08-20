import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, Box } from '@mui/material';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import React, { useEffect, FormEvent } from 'react';
import { Alert, Iconify, Loading } from 'app/components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/LoginPage/slice/selectors';
import { useAuthSlice } from 'app/pages/LoginPage/slice';
import { AuthRequest } from 'app/pages/LoginPage/slice/types';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { loading, dataAuth, error } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();

  const navigate = useNavigate();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const body: AuthRequest = {
      email,
      password,
    };
    dispatch(actions.loginRequest(body));
  };

  useEffect(() => {
    if (Boolean(dataAuth)) {
      navigate('/app', { replace: true });
    } else if (error) {
      setOpenAlert(true);
    }
  }, [dataAuth, navigate, error]);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box component="form" onSubmit={handleSignIn}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          required
          defaultValue="example@gmail.com"
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormControlLabel control={<Checkbox />} label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained">
        Login
      </Button>

      {loading ? <Loading /> : null}
      <Alert
        message="Incorrect email or password"
        open={openAlert}
        onClose={handleCloseAlert}
        severity="error"
      />
    </Box>
  );
}
