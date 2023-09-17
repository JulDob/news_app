import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import useAuth from '../../useAuth';
import FormContainerMUI from '../../components/FormContainer';
import { validateEmail, validatePassword } from '../../validate/validate';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const updateLogin = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
  };

  const hundleBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setEmail('');
    setPassword('');
    console.log('email');
  };

  return (
    <FormContainerMUI>
      <h2>Login into account</h2>
      <Box>
        <TextField
          fullWidth
          margin="normal"
          id="outlined-basic"
          label="e-mail"
          type="email"
          variant="outlined"
          value={email}
          onBlur={hundleBlur}
          onChange={updateLogin}
          placeholder="mango@gmail.com"
          error={emailDirty && emailError}
          helperText="invalid e-mail"
          name="email"
        />

        <TextField
          fullWidth
          margin="normal"
          id="outlined-password-input"
          label="password"
          type="password"
          value={password}
          onBlur={hundleBlur}
          onChange={updatePassword}
          autoComplete="current-password"
          name="password"
          error={passwordDirty && passwordError}
          helperText="must be at least 8 chars long"
        />
      </Box>
      <Stack direction="row" spacing={2} marginBottom="10px">
        <Button type="submit" variant="contained" onClick={onSubmit}>
          Login
        </Button>
        <Button component={Link} to="/forgot-password" variant="outlined">
          Forgot password
        </Button>
      </Stack>
    </FormContainerMUI>
  );
}

export default Login;
