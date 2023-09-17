import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const FormContainerMUI = styled(Container)(() => ({
  border: '1px solid gray',
  borderRadius: '4px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  width: '350px',
}));

export default FormContainerMUI;
