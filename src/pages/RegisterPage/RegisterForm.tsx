import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUser, signUp } from "../../utilities/users-service";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SetUserType } from '../../utilities/type-declaration';

const RegisterForm = ( {setUser}: {setUser : SetUserType} ) => {

  const [form , setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
})
  const disable = form.password !== form.confirm;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUp(form);
      setUser(getUser());
      navigate("/");
    } catch (error: any) {
      if (error.message.includes("email")) {
        setError("This email is already used");
      } else {
        setError(error.message);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
        ...form,
        [event.target.name]:event.target.value
    })
};

    return(
        <Box sx={{ mt: 3 }}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  inputProps= {{ minLength: 3, maxLength: 30 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  label="Re-type Password"
                  type="password"
                  id="confirm"
                  inputProps= {{ minLength: 3, maxLength: 30 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={disable}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/users/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Typography
        variant="body2"
        color="error"
        align="center"
        sx={{ marginTop: 5 }}
      >
        {error}
      </Typography>
          </Box>
    )
}

export default RegisterForm