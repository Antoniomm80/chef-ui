import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Clock, Users} from "lucide-react";
import {Link} from "react-router";
import {RecipeBackend} from "@/lib/recipeBackend.ts";

interface RecipeCardProps {
    recipe: RecipeBackend;
}

export function RecipeCard({recipe}: RecipeCardProps) {
    return (
        <Link to={`/recipes/${recipe.id}`} className="block">
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow pt-0">

                <img
                    src={recipe.imageUrl || "https://placehold.co/600x400/png"}
                    alt={recipe.name}
                    className="w-full aspect-3/2 md:aspect-square object-cover transition-transform hover:scale-105"
                />

                <CardContent className="p-4 flex-grow">
                    <h2 className="font-semibold text-xl line-clamp-1">{recipe.name}</h2>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{recipe.notes}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1"/>
                        <span>{`${recipe.preparationTime + recipe.cookingTime} minutos `}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1"/>
                        <span>{recipe.servings} personas</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}