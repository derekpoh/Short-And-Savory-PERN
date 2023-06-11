import SimpleImageSlider from "react-simple-image-slider";
import { useNavigate } from "react-router-dom";
import LatestRecipesHomePage from "../LatestRecipes/LatestRecipesHomePage";
import MostViewsHomePage from "../MostViews/MostViewsHomePage";
import "./Homepage.css"



const HomePage = () => {
    const navigate = useNavigate();

    const images = [
        { url: "/breakfast.jpeg",
        idx: 0,
        event: "/search?q=breakfast",
        },
        { url: "/coffee1.jpeg",
        idx: 1,
        event: "/search?q=coffee"
        },
        { url: "/seafood.jpeg",
        idx: 2,
        event: "/search?q=seafood"
        },
        { url: "/icecream.jpeg",
        idx: 3,
        event: "/search?q=ice cream"
        },
        { url: "/chocolate.jpeg",
        idx: 4,
        event: "/search?q=chocolate"
        },
        { url: "/coffee2.jpeg",
        idx: 5, 
        event: "/search?q=coffee"
        },
        ];
    
    return(
        <div className="homepage">
        <div className="carousel">
        <SimpleImageSlider
          width={540}
          height={510}
          images={images}
          showBullets={false}
          showNavs={true}
          onClick = {(idx) => (navigate(`${images[idx].event}`))}
          navMargin={0}
          navStyle={2}
          autoPlay={true}
        />
      </div>
      <div style={{ marginLeft: '20px' }}>
        <LatestRecipesHomePage />
      </div>
      <MostViewsHomePage />
      </div>

    )
}

export default HomePage