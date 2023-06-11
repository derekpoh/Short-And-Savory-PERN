import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { useNavigate, Link } from "react-router-dom";
import { RecipeDetails, UserState } from "../../utilities/type-declaration";
import { Box, Typography, Grid, useMediaQuery, createTheme, Rating } from "@mui/material";
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


const BookmarksPage = ( {user}:{user:UserState} ) => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<RecipeDetails[]>([]);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/users/${user._id}/bookmarks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        const data = await response.json(); 
        setBookmarks(data.bookmarksArray);  
      } catch (error) {
        console.log('Error fetching favourites:', error);
      }
    };

    fetchBookmarks();
  }, [user._id, navigate]);  

    return (
      <>
        { !isMobile ? (
        <Typography variant="h4" marginTop="50px" marginBottom="50px" color="black" textTransform="uppercase" letterSpacing='0.1em' textOverflow="ellipsis" overflow="clip" width="1400px">Bookedmarked Recipes</Typography>
        ) : (
        <Typography variant="h4" marginTop="50px" marginBottom="50px" color="black" textTransform="uppercase" letterSpacing='0.1em' fontSize="28px" textAlign='center' textOverflow="ellipsis" overflow="clip" width="345px">Bookedmarked Recipes</Typography>
        )}
        {bookmarks.length > 0 ? 
        <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {bookmarks.map((recipe,index) => (
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
            Cuisine: {recipe.cuisine}
          </Typography>
          <Typography variant="subtitle1" fontSize="15px" fontFamily="Poppins" gutterBottom>
            By {recipe.owner.username}
          </Typography>
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
        </Box>
      </SearchBox>
    </Grid>
  ))}
  </Grid> :
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
  <img src="/Homer_Simpson.jpeg"  style={{  marginTop: "10px", width: "420px", height: "280px", marginBottom: '2rem', borderRadius: '50%' }} />
  <Typography variant="h6" fontSize="20px" fontFamily="poppins" fontWeight="bold" color="#595959">No Bookmarks</Typography>
</Box>
}
      </>
    );
  }


  export default BookmarksPage
