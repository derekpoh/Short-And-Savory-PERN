import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { RecipeDetails, UserState } from '../../utilities/type-declaration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, TextField, useMediaQuery } from '@mui/material';
import "./RecipeDetailsPage.css"
import RecipeDetailsCarousel from './RecipeDetailsCarousel';
import { BookmarkBorderOutlined, Bookmark } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { sortIngredients } from './RecipeSort';



const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  100: '#eaeef2',
  300: '#afb8c1',
  900: '#24292f',
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
  },
});



const RecipeDetailsPage = ( {user}:{user:UserState} ) => {
  const  { id }  = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [recipe, setRecipe] = useState<RecipeDetails>({
    owner: user,
    recipe: "",
    cuisine: "",
    ingredients: [{ name: '', quantity: '' }],
    instructions: [],
    views: 0,
  });
  const [rating, setRating] = useState<number|null>(5);
  const [hover, setHover] = useState(-1);
  const [averageRating, setAverageRating] = useState<number|"No Rating">("No Rating");
  const [comment, setComment] = useState("");
  const [reversedComment, setReversedComment] = useState([{
    name: "",
    content: "",
    createdAt: "",
  }])
  const [imageArray, setImageArray] = useState<string[]>([])
  const [isBookmark, setIsBookmark] = useState(false);
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);
  const [metricActive, setMetricActive] = useState(true)
  const [cupArray, metricArray] = sortIngredients(recipe.ingredients)


  useEffect(() => {
        const fetchRecipe = async () => {
        try {
          const response = await fetch(`/api/recipes/${id}`);
          const res = await response.json();
          setRecipe(res.recipe)
          setAverageRating(res.averageRating)
          const reversedArray = res.recipe.comments.reverse()
          setReversedComment(reversedArray)
          setImageArray([...res.recipe.imageurl.filter((url: string) => url), res.recipe.imagefile].filter(item => item));
        } catch (err) {
          console.error(err);
        }
      };
      fetchRecipe();
    }, [id]);

    useEffect(() => {
      const checkBookmark = async () => {
        if (user) {
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
          setIsBookmark(data.bookmarks.find((bookmark: RecipeDetails) => bookmark?._id?.toString() === id));
        } catch (err) {
          console.error(err);
        }}
      };
      checkBookmark();
    }, [id]);


  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/recipes/${id}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify( {rating, user} ), 
      });
      const averageRating = await response.json();
      if (response.ok) {
        setAverageRating(averageRating)
      } else {
        throw new Error("Failed to submit rating")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/recipes/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify( {comment, user} ), 
      });
      const updatedRecipe = await response.json();
      if (response.ok) {
        setRecipe(updatedRecipe)
        const reversedArray = updatedRecipe.comments.reverse()
        setReversedComment(reversedArray)
        setComment("")
      } else {
        throw new Error("Failed to submit comment")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
       const token = localStorage.getItem("token");
       const method = isBookmark ? 'DELETE' : 'POST';
       const response = await fetch(`/api/recipes/${id}/bookmark`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({_id: user._id}),
      });
      if (response.ok && method == "POST") {
        setIsBookmark(!isBookmark); 
        setIsBookmarkAdded(true);
      } else if (response.ok) {
        setIsBookmark(!isBookmark);
        setIsBookmarkAdded(false);
      }   
      else if (response.status === 400) {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

    return(
  
     <ThemeProvider theme={theme}>

    <RecipeDetailsCarousel recipes={imageArray}/>


    {!isMobile && !user ? (
      <div className="recipeName" style={{ color:"black" }}>{recipe?.recipe}</div>
        ) : isMobile && !user ? (
      <div className="recipeName" style={{ color:"black" }}>{recipe?.recipe}</div>
        ) : !isMobile && user ? (
      <div className="recipeName" style={{ color:"black" }}>{recipe?.recipe}</div>
        ) : (
      <div className="recipeName" style={{color:"black" }}>{recipe?.recipe}</div>
        )}

<div className="creatorName">Views: {recipe.views} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rating: {averageRating}</div>

        { !user? (
                <></>
              ) : (
              <IconButton
                className="bookmark-button"
                size="large"
                aria-label="your bookmarks"
                color='inherit'
                title="Add Recipe to Your Bookmarks"
                onClick={handleBookmark}
              >
                  {isBookmark ? (
                  <>
                  <Bookmark color='success' />
                  </>
                  ) : (
                    <>
                  <BookmarkBorderOutlined color='inherit' />
                  </>
                  )}
                  {isBookmarkAdded ? (
                    <>
                  <span className="addedText">Recipe Bookmarked</span>
                    </>
                  ) : (
                    <></>
                  )}
              </IconButton>
              )}

         { !user? (
                <></>
              ) : (
         <div className="set-rating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
         <span>{hover !== -1 ? hover : rating}</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="rating"
              value={rating}
              precision={0.5}
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />

          </div>
          <Button 
          variant="outlined"
          onClick={(event)=>handleRating(event)} 
          style={{ marginTop: '10px' }}
          >
            Submit Rating
          </Button> 
        </div>
        )}


        <hr className="hr-line" />

        <div className="summary">
                  <h3>Description</h3>
                  {recipe.description || "No description"} <p/>
                </div>
                
                <hr className="hr-line" />

                <Button 
        className="metric-button"
        onClick={() => {setMetricActive(true)}}
        variant={metricActive ? "contained" : "outlined"}
        >Metric
        </Button>
        <Button 
        className="metric-button"
        onClick={() => {setMetricActive(false)}}
        variant={metricActive ? "outlined" : "contained"}
        >Cups
        </Button>

        {metricActive ?
        <div className="summary">
          <h3>Ingredients</h3>
        <ul>
        {metricArray?.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.measurement} {ingredient.name}
            </li>
        )
        )}
        </ul>
        </div> :
                <div className="summary">
                <h3>Ingredients</h3>
              <ul>
              {cupArray?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.measurement} {ingredient.name}
                  </li>
              )
              )}
              </ul>
              </div>
              }


        <div className="summary">
          <h3>Instructions</h3>
        <ul>
        {recipe?.instructions?.map((instruction, index) => (
          <li key={index}>
            Step {index+1}: {instruction}
            </li>
        )
        )}
        </ul>
        </div>

        <div className="parent">
        <div className="textarea-container">
          <TextField
            className="textarea"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Leave a comment"
            multiline
            rows={4}
          />
        </div>
        { !user? (
                <></>
              ) : ( 
        <Button  
        onClick={(event)=>handleComment(event)}
        >
          Submit Comment
        </Button>
        )}
      </div>


    <div className="parent2">
      <div className="textarea-container">
        <div className="commenttitle" style={{color:"black"}}>
          {recipe?.comments?.length} Comment(s)
        </div> <br/>
          <ul className='commentlist'>
            {reversedComment.map((comment, index) => (
          <li className='commentpoint' key={index}>
          <span className='commentname'> 
            {comment.name} ( {comment.createdAt && new Date(comment.createdAt).toLocaleString()} )
            </span> <br/><br/>
           <span style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</span>  
            </li>
        )
        )}
        </ul>
        </div>
        </div>

             

      </ThemeProvider>
    )
}

export default RecipeDetailsPage