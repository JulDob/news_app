import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormContainerMUI from '../../components/FormContainer';
import useAuth from '../../useAuth';
import { validateEmail, validatePassword } from '../../validate/validate';

function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(email, password);
    setEmail('');
    setPassword('');
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

  return (
    <FormContainerMUI>
      <h2>Register new account</h2>
      <TextField
        fullWidth
        margin="normal"
        id="outlined-basic"
        label="e-mail"
        type="email"
        name="email"
        variant="outlined"
        value={email}
        onChange={updateEmail}
        onBlur={hundleBlur}
        placeholder="mango@gmail.com"
        error={emailDirty && emailError}
        helperText="invalid e-mail"
      />

      <TextField
        fullWidth
        margin="normal"
        name="password"
        id="outlined-password-input"
        label="password"
        type="password"
        value={password}
        onChange={updatePassword}
        autoComplete="current-password"
        onBlur={hundleBlur}
        error={passwordDirty && passwordError}
        helperText="must be at least 8 chars long"
      />

      <Stack marginBottom="10px">
        <Button variant="contained" onClick={onSubmit}>
          Registration
        </Button>
      </Stack>
    </FormContainerMUI>
  );
}

export default Register;
