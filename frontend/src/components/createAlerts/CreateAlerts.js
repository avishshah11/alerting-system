import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { postAlerts } from '../api/postAlerts';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const FormBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
}));

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CreateAlerts = () => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [errors, setErrors] = useState({ message: "", severity: "" });
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setErrors({
      alertMessage: "",
      severity: "",
    });

    let validation = true;
    if (!message) {
      setErrors((prev) => ({ ...prev, message: "Alert message is required" }));
      validation = false;
    }

    if (!severity) {
      setErrors((prev) => ({ ...prev, severity: "Alert severity is required" }));
      validation = false;
    }

    if (validation) {
      setLoading(true)

      try {
        const result = await postAlerts({ message, severity })
        if (result){
          setOpen(true)
          setSnackbarMessage('Alert created successfully!')
        }
      } catch (error) {
        setOpen(true)
        setSnackbarMessage(`Failed to create alert: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCloseSnackbar = () => {
    setOpen(false);
  }

  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Alert
      </Typography>
      <FormBox component="form" onSubmit={handleFormSubmit}>
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={!!errors.message}
          helperText={errors.message}
          style={{ margin: "16px 0" }}
        />
        <FormControlStyled variant="outlined" fullWidth error={!!errors.severity} sx={{ textAlign: 'left' }}>
          <InputLabel>Severity</InputLabel>
          <Select
            label="Severity"
            variant="outlined"
            fullWidth
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <MenuItem value="Low" sx={{ textAlign: 'left' }}>Low</MenuItem>
            <MenuItem value="Medium" sx={{ textAlign: 'left' }}>Medium</MenuItem>
            <MenuItem value="High" sx={{ textAlign: 'left' }}>High</MenuItem>
          </Select>
          <FormHelperText>{errors.severity}</FormHelperText>
        </FormControlStyled>
        <SubmitButton type="submit" variant="contained" color="primary">
          {loading ? 'Submiting...' : 'Create Alert'}
        </SubmitButton>
      </FormBox>
      <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
      >
        <Alert onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default CreateAlerts;
