import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { UserState } from '../../utilities/type-declaration';
import CreateRecipeForm from './CreateRecipeForm';



const theme = createTheme();

const CreateRecipePage = ( {user}:{user:UserState} ) => {
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
              New Recipe
            </Typography>
            <CreateRecipeForm user={user} />
          </Box>
        </Container>
      </ThemeProvider>
    )
}

export default CreateRecipePage