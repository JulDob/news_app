import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormContainerMUI from '../../components/FormContainer';
import useAuth from '../../useAuth';
import { validatePassword } from '../../validate/validate';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function RestorePassword() {
  const { restorePassword } = useAuth();
  const query = useQuery();

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const changePassword = (e) => {
    setPassword1(e.target.value);
    setError(!validatePassword(e.target.value));
  };

  const changeDublePassword = (e) => {
    setPassword2(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert('fields do not match');
      return;
    }

    restorePassword(password1, password2, query.get('token'));
    setPassword1('');
    setPassword2('');
  };

  const hundleBlur = () => {
    setPasswordDirty(true);
  };

  return (
    <FormContainerMUI submitForm={onSubmit}>
      <h2>Enter your new password</h2>

      <TextField
        fullWidth
        margin="normal"
        type="password"
        label="New password"
        variant="outlined"
        value={password1}
        onChange={changePassword}
        onBlur={hundleBlur}
        placeholder="new password"
        error={passwordDirty && error}
        helperText="must be at least 8 chars long"
      />

      <TextField
        fullWidth
        margin="normal"
        type="password"
        label="New password (Confirmation)"
        variant="outlined"
        value={password2}
        onChange={changeDublePassword}
        placeholder="new password"
      />

      <Stack marginBottom="10px">
        <Button variant="contained">Restore password</Button>
      </Stack>
    </FormContainerMUI>
  );
}

export default RestorePassword;
