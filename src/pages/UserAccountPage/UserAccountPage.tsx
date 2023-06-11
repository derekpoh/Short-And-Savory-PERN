import { Link, useNavigate } from "react-router-dom";
import { Grid, Button, Container, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { UserState } from "../../utilities/type-declaration";

const UserAccountPage = ( {user}:{user:UserState} ) => {
  const navigate= useNavigate();
  useEffect(() => {
    if(!user) {
      navigate("/");
      return
    }
  }, [user, navigate])

    return(
        <>
       <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "flex-start",
            minHeight: '100vh',
            paddingTop: theme => theme.spacing(4),
          }}
        >
          <img src="/Homer_Simpson.jpeg" alt="Logo" width="80" style={{borderRadius:"50%"}} />
          <Typography component="h1" variant="h5" align="center" sx={{marginBottom:7, marginTop:1}}>
            User Account
          </Typography>
        <Grid container rowSpacing={5} justifyContent="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
            <Button component={Link}
            to={`/users/account/myrecipes`}
            variant="contained"
            size="large"
            sx={{ width: "100%", 
            backgroundColor: "brown"}}
            >My Recipes</Button>
        </Grid>
        <Grid item xs={6}>
        <Button component={Link}
            to={`/users/account/bookmarks`}
            variant="contained"
            size="large"
            sx={{ width: "100%", 
            backgroundColor: "brown"}}
            >Bookmarks</Button>
        </Grid>
        <Grid item xs={6}>
        <Button component={Link}
            to={`/users/account/createrecipe`}
            variant="contained"
            size="large"
            sx={{ width: "100%", 
            backgroundColor: "brown"}}
            >Create Recipe</Button>
        </Grid>
        </Grid>
        </Box>
        </Container>
       </>
    )
}

export default UserAccountPage