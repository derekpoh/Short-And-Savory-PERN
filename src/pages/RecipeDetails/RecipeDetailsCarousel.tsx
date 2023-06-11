import "./RecipeDetailsCarousel.css"
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


export default function RecipeDetailsCarousel({recipes}: {recipes:string[]}) {

   const [activeImageNum, setCurrent] = useState(0);
   const length = recipes.length;
   const nextSlide = () => {
      setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
   };
   const prevSlide = () => {
      setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
   };
   if (!Array.isArray(recipes) || recipes.length <= 0) {
      return null;
   }

   return (
      <div>
         <section className = "book-image">
          
            <div className = "left">
               <ArrowBackIosIcon onClick = {prevSlide} />
            </div>
            <div className="right"> 
               <ArrowForwardIosIcon onClick = {nextSlide} />
            </div>
          
            {recipes.map((currentSlide, ind) => {
               return (
                  <div
                     className={ind === activeImageNum ? "currentSlide active" : "currentSlide"}
                     key={ind}
                  >
                     {ind === activeImageNum && <img src={currentSlide} className="image" alt="No Image" />}
                  </div>
               );
            })}
         </section>
      </div>
   );
}