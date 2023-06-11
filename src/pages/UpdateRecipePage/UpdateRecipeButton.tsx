import { Button } from "@mui/material"
import { RecipeDetails } from "../../utilities/type-declaration"
import { useNavigate } from "react-router-dom"


const UpdateRecipeButton = ( {recipe, checkbox}: {recipe: RecipeDetails, checkbox: boolean} ) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(`/recipes/${recipe._id}/update`);
    }
    
    return (
        <Button
        onClick={handleNavigation}
        disabled={!checkbox}
        >
            Update
        </Button>
    )
}

export default UpdateRecipeButton