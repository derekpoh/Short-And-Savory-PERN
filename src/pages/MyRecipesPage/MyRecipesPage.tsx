import { useState, useEffect } from "react"
import MyRecipesCard from "./MyRecipesCard";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../utilities/type-declaration";
import { Box, Typography, Grid, useMediaQuery, createTheme } from "@mui/material";

const theme = createTheme();




const MyRecipesPage = ( {user}:{user:UserState} ) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (!user) {
          navigate("/");
          return;
        }
        const fetchRecipes = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`/api/recipes/${user._id}/myrecipes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
          const recipes = await response.json();
          setRecipes(recipes)
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [user._id]);

    return(
      <>
        { !isMobile ? (
        <Typography variant="h4" marginTop="50px" marginBottom="50px" color="black" textTransform="uppercase" letterSpacing='0.1em' textOverflow="ellipsis" overflow="clip" width="1400px">My Recipes</Typography>
        ) : (
        <Typography variant="h4" marginTop="50px" marginBottom="50px" color="black" textTransform="uppercase" letterSpacing='0.1em' fontSize="28px" textAlign='center' textOverflow="ellipsis" overflow="clip" width="345px">My Recipes</Typography>
        )}
        {recipes.length > 0 ? 
        <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {recipes.map((recipe,index) => (
          <MyRecipesCard recipe={recipe} key={index}  />

  ))}
  </Grid> :
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
  <img src="/Homer_Simpson.jpeg"  style={{  marginTop: "10px", width: "420px", height: "280px", marginBottom: '2rem', borderRadius: '50%' }} />
  <Typography variant="h6" fontSize="20px" fontFamily="poppins" fontWeight="bold" color="black">No Recipes</Typography>
</Box>
}
      </>
    )
}

export default MyRecipesPage