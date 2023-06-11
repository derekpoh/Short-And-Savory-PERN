import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UpdateRecipeForm from './UpdateRecipeForm';
import { UserState } from '../../utilities/type-declaration';




const theme = createTheme();

const UpdateRecipePage = ( {user}:{user:UserState} ) => {
    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Update Recipe
            </Typography>
            <UpdateRecipeForm user={user}/>
          </Box>
        </Container>
      </ThemeProvider>
    )
}

export default UpdateRecipePage