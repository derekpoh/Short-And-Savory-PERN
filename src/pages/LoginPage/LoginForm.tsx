import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../utilities/users-service"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SetUserType } from '../../utilities/type-declaration';

const LoginForm = ( {setUser}: {setUser : SetUserType} ) => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
      });
      const [error, setError] = useState("");
      const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
        setError("");
      }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await login(credentials);
            setUser(getUser());
            navigate("/");
          } catch {
            setError('Log In Failed - Try Again');
          }
      };

    return(
        <Box component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          value={credentials.password}
          onChange={handleChange}
          label="Password"
          type="password"
          id="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/users/register" variant="body2">
              Don't have an account? Sign Up
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

export default LoginForm