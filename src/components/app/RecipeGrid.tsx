import {Clock, Users} from "lucide-react"

import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Link} from "react-router";
import {RecipeBackend} from "@/lib/recipeBackend.ts";


interface RecipeGridProps {
    recipes: RecipeBackend[]
}

export default function RecipeGrid({recipes}: RecipeGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (

                <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="block">
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative aspect-square">
                            <img
                                src={recipe.imageUrl || "https://placehold.co/600x400/png"}
                                alt={recipe.name}
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                        </div>
                        <CardContent className="p-4">
                            <h2 className="font-semibold text-xl line-clamp-1">{recipe.name}</h2>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{recipe.notes}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1"/>
                                <span>{recipe.totalTime}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1"/>
                                <span>{recipe.servings} servings</span>
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

