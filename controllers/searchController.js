const Recipe = require("../models/Recipe");
const User = require("../models/User");


const calculateAverageRating = (ratings) => {
  let total = 0;
  ratings.forEach((r) => {
    total += r.rating;
  });
  const averageRating = (total / ratings.length).toFixed(2);
  if (isNaN(averageRating) || !averageRating ) return "No Rating"
  return parseFloat(averageRating);
};

const search = async (req, res) => {
    try {
      const searchQuery = req.query.q;
      const regexQuery = new RegExp(searchQuery, 'i');
      const matchingOwner = await User.find ({username: regexQuery});
      const ownerIds = matchingOwner.map(owner => owner._id)
      const recipes = await Recipe.find({
        $or: [
          { recipe: regexQuery },
          { description: regexQuery },
          { cuisine: regexQuery },
          { owner:  {$in: ownerIds } },
          { "ingredients.name": regexQuery },
        ],
      }).populate("owner");
      const recipeArray = []
      recipes.forEach(recipe => {
        const averageRating = calculateAverageRating(recipe.rating)
        recipeArray.push({
          ...recipe.toJSON(),
          averagerating: averageRating
        })
    })
      res.status(200).json(recipeArray);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Search Error" });
    }
  };
  
module.exports = { 
    search 
};