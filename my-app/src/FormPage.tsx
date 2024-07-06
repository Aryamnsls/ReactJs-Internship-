import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FormPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      setError('All fields are required.');
      return;
    }

    const userDetails = { name, phone, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    navigate('/second');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Enter Your Details</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
      <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} margin="normal" />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>
    </Box>
  );
};

export default FormPage;
