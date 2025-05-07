import {RecipeBackend} from "@/lib/recipeBackend.ts";

interface RecipeInfoPanelProps {
    recipe: RecipeBackend;
}

export function RecipeInfoPanel({recipe}: RecipeInfoPanelProps) {
    return (
        <div>
            <h1 className="text-4xl font-bold tracking-tight">{recipe.name}</h1>
            <p className="text-muted-foreground mt-2">{recipe.notes}</p>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium">{recipe.preparationTime} preparación</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{recipe.cookingTime} cocina</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{recipe.servings} personas</span>
                </div>
            </div>
        </div>
    );
}