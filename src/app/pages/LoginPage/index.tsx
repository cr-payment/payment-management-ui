/**
 *
 * LoginPage
 *
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import { Iconify, Logo } from 'app/components';
import LoginForm from './components/LoginForm';

interface Props {}

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: (theme as any).customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export function LoginPage(props: Props) {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to CR-Payment
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:google-fill"
                  width={22}
                  sx={{ color: '#DF3E30', height: 22 }}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:facebook-fill"
                  sx={{ color: '#1877F2', height: 22 }}
                  width={22}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:twitter-fill"
                  sx={{ color: '#1C9CEA', height: 22 }}
                  width={22}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
