import {ChevronRight} from "lucide-react"

import {Button} from "@/components/ui/button"
import RecipeGrid from "@/components/app/RecipeGrid.tsx";
import {Link} from "react-router";
import {RecipeBackend} from "@/lib/recipeBackend.ts";
import {useRecipes} from "@/lib/use-recipes.tsx";

export default function HomePage() {
    const recipes: RecipeBackend[] = useRecipes();
    return (
        <div className="container px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Chef</h1>
                    <p className="text-muted-foreground mt-2">Recetas para cualquier ocasión</p>
                </div>
                <Button asChild>
                    <Link to="/recipes/new">
                        Añadir receta
                        <ChevronRight className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
            </div>
            <RecipeGrid recipes={recipes}/>
        </div>
    )
}

