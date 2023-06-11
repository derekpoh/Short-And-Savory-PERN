import { Link } from "react-router-dom";
import { Box, Typography, Grid, useMediaQuery, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from '@mui/material/Rating';
import { RecipeDetails } from "../../utilities/type-declaration";


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
    padding: theme.spacing(2),
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: "flex",
    alignItems: "flex-start",
}));



const SearchBar = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState<RecipeDetails[]>([]);
    const query = searchParams.get("q") || "";
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const regex = new RegExp(query, "gi")
  
    useEffect(() => {
      const fetchData = async () => {
        if (query) {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data);
        } else {
          setResults([]);
        }
      };
  
      fetchData();
    }, [searchParams]);

    return (
      <>
        { !isMobile ? (
        <SearchTitle><Typography variant="h4" marginTop="50px" marginBottom="50px" color="black" textTransform="uppercase" letterSpacing='0.1em' textOverflow="ellipsis" overflow="clip" width="1400px">Search Results for "{query}"</Typography></SearchTitle>
        ) : (
        <SearchTitle><Typography variant="h4" marginTop="50px" marginBottom="50px" color="black" textTransform="uppercase" letterSpacing='0.1em' fontSize="28px" textAlign='center' textOverflow="ellipsis" overflow="clip" width="345px">Search Results for<br/> "{query}"</Typography></SearchTitle>
        )}

        <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        {results.length > 0 ? 
         (results.map((recipe,index) => (
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
            <img src={`${recipe.imageurl?.[Math.floor(Math.random() * recipe.imageurl.length)] || recipe.imagefile}`}
            alt={recipe.recipe} 
            style={{height: "200px", width: "200px", verticalAlign: "top" }} />
          </Link>
        </Box>
        <Box>
          { !isMobile ? (
          <Typography variant="h6" fontFamily="Poppins" color="#0065CC" fontSize="22px" textOverflow="ellipsis" overflow="clip" gutterBottom>
            {query && recipe.recipe.toLowerCase().includes(query.toLowerCase()) ? (
              <span dangerouslySetInnerHTML={{
                __html: recipe.recipe.replace(regex, match => `<mark>${match}</mark>`)
              }}></span>
            ) : (
              recipe.recipe
            )}
          </Typography>
          ) : ( 
          <Typography variant="h6" fontFamily="Poppins" color="#0065CC" fontSize="18px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="clip" width="175px" gutterBottom>
            {query && recipe.recipe.toLowerCase().includes(query.toLowerCase()) ? (
              <span dangerouslySetInnerHTML={{
                __html: recipe.recipe.replace(regex, match => `<mark>${match}</mark>`)
              }}></span>
            ) : (
                recipe.recipe
            )}
          </Typography>
          )}
          <Typography variant="subtitle1" fontSize="15px" fontFamily="Poppins" gutterBottom>
            Cuisine: {query && recipe.cuisine.toLowerCase().includes(query.toLowerCase()) ? (
              <span dangerouslySetInnerHTML={{
                __html: recipe.cuisine.replace(regex, match => `<mark>${match}</mark>`)
              }}></span>
            ) : (
                recipe.cuisine
            )}
          </Typography>
          <Typography variant="subtitle1" fontSize="15px" fontFamily="Poppins" gutterBottom>
            By {query && recipe.owner.username.toLowerCase().includes(query.toLowerCase()) ? (
              <span dangerouslySetInnerHTML={{
                __html: recipe.owner.username.replace(regex, match => `<mark>${match}</mark>`)
              }}></span>
            ) : (
                recipe.owner.username
            )}
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
  ))) : 
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
  <img src="/Pieman.jpg"  style={{  marginTop: "10px", marginLeft:"420px", height: "310px", marginBottom: '2rem', borderRadius: '50%' }} />
  <Typography variant="h6" fontSize="20px" fontFamily="poppins" fontWeight="bold" color="#595959">
   <span style={{marginLeft:"420px"}}>No Results</span>
    </Typography>
</Box>
}
  </Grid>
  
      </>
    );
  }


  export default SearchBar