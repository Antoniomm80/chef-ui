import {Separator} from "@/components/ui/separator"
import {useParams} from "react-router";
import {useRecipe} from "@/lib/use-recipes.tsx";
import {DeleteDialog} from "@/components/app/DeleteDialog.tsx";
import {useState} from "react";
import {InstructionsCard} from "@/components/app/InstructionsCard.tsx";
import {IngredientsCard} from "@/components/app/IngredientsCard.tsx";
import {RecipeInfoPanel} from "@/components/app/RecipeInfoPanel.tsx";
import {RecipeImage} from "@/components/app/RecipeImage.tsx";
import {RecipeToolbar} from "@/components/app/RecipeToolbar.tsx";


export default function RecipePage() {
    const {"recipe-id": recipeId} = useParams();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    if (!recipeId) {
        throw new Error("recipeId is required")
    }
    const recipe = useRecipe(parseInt(recipeId))
    if (!recipe) {
        return;
    }

    return (
        <div className="container px-4 py-8 md:py-12 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <RecipeToolbar setIsDeleteDialogOpen={setIsDeleteDialogOpen}/>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                    <RecipeImage imageUrl={recipe.imageUrl} imageAlt={recipe.name}/>
                </div>
                <div className="space-y-6">
                    <RecipeInfoPanel recipe={recipe}/>
                    <Separator/>
                    <IngredientsCard recipeIngredients={recipe.recipeIngredients}/>
                    <InstructionsCard recipeSteps={recipe.recipeSteps}/>
                </div>
            </div>
            <DeleteDialog recipeId={recipeId}
                          recipeName={recipe.name}
                          isDeleteDialogOpen={isDeleteDialogOpen}
                          setIsDeleteDialogOpen={setIsDeleteDialogOpen}/>
        </div>
    )
}

