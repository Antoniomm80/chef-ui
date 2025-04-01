export interface ScrappedRecipe {
    name: string;
    description: string;
    ingredients: string[];
    steps: string[];
    servings: number;
    preparationTime: number;
    cookingTime: number;
    imageUrls: string[];
    recipeUrl: string;
}
