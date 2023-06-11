import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { RecipeDetails } from "../../utilities/type-declaration";


const DeleteRecipeButton = ( {recipe, checkbox}: {recipe: RecipeDetails, checkbox: boolean} ) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/recipes/${recipe._id}`, {
              method: "Delete",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            });
            await response.json();
            if (response.ok) {
              navigate(`/users/account`)
            } else {
              throw new Error("Failed to delete recipe")
            }
          } catch (error: any) {
            console.log(error.message)
          }
    }

    return (
        <Button
        onClick={handleDelete}
        disabled={!checkbox}
        >
            Delete
        </Button>
    )
}

export default DeleteRecipeButton