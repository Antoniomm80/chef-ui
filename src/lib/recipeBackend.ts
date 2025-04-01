export interface RecipeBackend {
    id: string,
    name: string,
    notes: string,
    ingredients: string,
    steps: string,
    recipeUrl: string,
    imageUrl: string,
    servings: number,
    preparationTime: number,
    cookingTime: number,
    recipeSteps: string[],
    recipeIngredients: string[],
}

