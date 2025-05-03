import {RecipeBackend} from "@/lib/recipeBackend.ts";
import {RecipeCard} from "@/components/app/RecipeCard.tsx";


interface RecipeGridProps {
    recipes: RecipeBackend[]
}

export default function RecipeGrid({recipes}: RecipeGridProps) {
    if (!recipes || recipes.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No se han encontrado recetas</h2>
                <p className="text-muted-foreground mb-6">Ajusta los criterios de búsqueda.</p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe}/>
            ))}
        </div>
    )
}

