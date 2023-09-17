import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormContainerMUI from '../../components/FormContainer';
import useAuth from '../../useAuth';
import { validateEmail } from '../../validate/validate';

function ForgotPassword() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setError(!validateEmail(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    forgotPassword(email);
    setEmail('');
  };
  const hundleBlur = (e) => {
    setEmailDirty(true);
  };
  return (
    <FormContainerMUI submitForm={onSubmit}>
      <h2>Forgot Password ?</h2>

      <TextField
        fullWidth
        margin="normal"
        id="outlined-basic"
        type="email"
        label="login"
        variant="outlined"
        value={email}
        onChange={changeEmail}
        onBlur={hundleBlur}
        placeholder="mango@gmail.com"
        error={emailDirty && error}
        helperText="invalid e-mail"
      />

      <Stack marginBottom="10px">
        <Button variant="contained">Send e-mail</Button>
      </Stack>
    </FormContainerMUI>
  );
}

export default ForgotPassword;
