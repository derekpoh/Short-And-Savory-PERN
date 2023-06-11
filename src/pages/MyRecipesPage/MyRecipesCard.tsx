import DeleteRecipeButton from "../DeleteRecipeButton/DeleteRecipeButton"
import { Checkbox } from "@mui/material"
import UpdateRecipeButton from "../UpdateRecipePage/UpdateRecipeButton"
import { useState } from "react"
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { RecipeDetails } from "../../utilities/type-declaration";
import { Box, Typography, Grid,Rating, createTheme,  useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility"

const theme = createTheme();


const SearchBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  display: "flex",
  alignItems: "flex-start",
}));


const MyRecipesCard = ( {recipe}:{recipe:RecipeDetails} ) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [checkbox, setCheckbox] = useState(false)
    return (
        <>
    <Grid item xs={12} md={6} lg={4} sx={{ 
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
    <Box pr={4} sx={{ height: 200, '&:hover': {opacity: [0.9, 0.8, 0.7],}}}>
        <Link to={`/recipes/${recipe._id}`}>
        <img 
        src={`${recipe.imageurl?.[Math.floor(Math.random() * recipe.imageurl.length)] || recipe.imagefile}`}
        alt={recipe.recipe} 
        style={{height: "200px", width: "200px", verticalAlign: "top" }} />
        </Link>
    </Box>
    <Box>
        { !isMobile ? (
        <Typography variant="h6" fontFamily="Poppins" color="#0065CC" fontSize="22px" textOverflow="ellipsis" overflow="clip" gutterBottom>
            {recipe.recipe}
        </Typography>
        ) : ( 
        <Typography variant="h6" fontFamily="Poppins" color="#0065CC" fontSize="18px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="clip" width="175px" gutterBottom>
            {recipe.recipe}
        </Typography>
        )}
        <Typography variant="subtitle1" fontSize="15px" fontFamily="Poppins" gutterBottom>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <VisibilityIcon fontSize="small" />
        <span style={{ marginLeft: '5px' }}>{recipe.views}</span>
        </div>
        </Typography>
        <Typography variant="subtitle1" fontSize="15px" fontFamily="Poppins" gutterBottom>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <div style={{ marginLeft: "-10px" }} >
        <Checkbox 
        onClick={() => setCheckbox(!checkbox)}
        />
        <UpdateRecipeButton recipe={recipe} checkbox={checkbox} />
        <DeleteRecipeButton recipe={recipe} checkbox={checkbox} /> <br/>
        </div>
    </Box>
    </SearchBox>
    </Grid>


        </>
    )
} 

export default MyRecipesCard


