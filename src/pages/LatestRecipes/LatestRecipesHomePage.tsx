import { Link } from "react-router-dom";
import { Box, Typography, Grid, useMediaQuery, createTheme, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import VisibilityIcon from "@mui/icons-material/Visibility"
import { RecipeDetails } from "../../utilities/type-declaration";
import EastIcon from "@mui/icons-material/East"

const theme = createTheme();

const SearchTitle = styled('div')(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));
  
const SearchBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  width: '325px', 
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  display: "flex",
  alignItems: "flex-start",
}));


const LatestRecipesHomePage = () => {
    const [display, setDisplay] = useState<RecipeDetails[]>([]);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/recipes/latestrecipes");
        const data = await response.json();
        const displayRecipe = getRandomRecipe(data);
        setDisplay(displayRecipe);
      };
      fetchData();
    }, []);

    const getRandomRecipe = (results: RecipeDetails[]) => {
      const recipe1 = Math.floor(Math.random() * results.length);
      let recipe2 = Math.floor(Math.random() * results.length);
      while (recipe2 === recipe1) {
        recipe2 = Math.floor(Math.random() * results.length);
      }
      return [results[recipe1], results[recipe2]];
    };

    return (
        <>
        { !isMobile ? (
        <SearchTitle  >
            <Link to="/recipes/latestrecipes" style={{color:"orange"}}>
          <Typography style={{ display: 'flex', alignItems: 'center' }} variant="h4"  marginLeft="15px" marginTop="5px" color="black" textTransform="uppercase" letterSpacing='0.1em' fontSize="20px" textOverflow="ellipsis" overflow="clip" width="1400px">
            Latest Recipes 
            <EastIcon color="error"/> 
            </Typography>
            </Link>
            </SearchTitle>
        ) : (
        <SearchTitle><Typography style={{ display: 'flex', alignItems: 'center' }} variant="h4"  marginBottom="50px" color="black" textTransform="uppercase" letterSpacing='0.1em' fontSize="28px" textAlign='center' textOverflow="ellipsis" overflow="clip" width="345px">
          Latest Recipes 
          <EastIcon color="error"/>
          </Typography>
          </SearchTitle>
        )}
        <Grid container spacing={-45} sx={{ display: "flex", flexWrap: "wrap" }}>
        {display.map((recipe,index) => (
          <Grid item xs={12} md={6} lg={4} key={index} sx={{ 
          flex: "1 0 33.33%",
          boxSizing: "border-box",
          padding: "0 8px",
          '@media (min-width: 600px)': {
            flex: "1 0 50%",
            maxWidth: "50%",
          },
          '@media (min-width: 960px)': {
            flex: "1 0 33.33%",
            maxWidth: "33.33%",
          },
        }}>

      <SearchBox >
        <Box pr={4} sx={{ height: 150, '&:hover': {opacity: [0.9, 0.8, 0.7],}}}>
          <Link to={`/recipes/${recipe._id}`}>
            <img 
            src={`${recipe.imageurl?.[Math.floor(Math.random() * recipe.imageurl.length)] || recipe.imagefile}`} 
            alt={recipe.recipe} 
            style={{height: "150px", width: "150px", verticalAlign: "top" }} />
          </Link>
        </Box>
        <Box>
          { !isMobile ? (
          <Typography variant="h6" fontFamily="Poppins" color="#0065CC" marginLeft={-2} fontSize="22px" textOverflow="ellipsis" overflow="clip" gutterBottom>
              {recipe.recipe}
          </Typography>
          ) : ( 
          <Typography variant="h6" fontFamily="Poppins" color="#0065CC" fontSize="18px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="clip" width="175px" gutterBottom>
                {recipe.recipe}
          </Typography>
          )}
          <Typography variant="subtitle1" fontSize="15px" fontFamily="Poppins" gutterBottom>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
          <VisibilityIcon fontSize="small" />
          <span style={{ marginLeft: '5px' }}>{recipe.views}</span>
          </div>
          </Typography>
          <Typography variant="subtitle1" fontSize="15px" fontFamily="Poppins" gutterBottom>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
          {typeof(recipe.averagerating) === "string" ? "No Rating" : 
          <Rating
           readOnly
           precision={0.1}
           name="rating"
           value={recipe.averagerating}
        />}
          <span style={{ marginLeft: '5px' }}>{typeof(recipe.averagerating) === "string" ? null : recipe.averagerating}</span>
          </div>
          </Typography>
        </Box>
      </SearchBox>
    </Grid>
  ))}
  </Grid>
  
      </>
    )
}

export default LatestRecipesHomePage