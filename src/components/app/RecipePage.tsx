import {ChevronLeft} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Link, useParams} from "react-router";
import {useRecipe} from "@/lib/use-recipes.tsx";


export default function RecipePage() {
    const {"recipe-id": recipeId} = useParams();
    if (!recipeId) {
        throw new Error("recipeId is required")
    }
    const recipe = useRecipe(parseInt(recipeId))
    if (!recipe) {
        return;
    }

    return (
        <div className="container px-4 py-8 md:py-12">
            <Button variant="ghost" asChild className="mb-6">
                <Link to="/">
                    <ChevronLeft className="mr-2 h-4 w-4"/>
                    Volver al listado
                </Link>
            </Button>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                        <img src={recipe.imageUrl || "/placeholder.svg"} alt={recipe.name} className="w-full h-full object-cover"/>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">{recipe.name}</h1>
                        <p className="text-muted-foreground mt-2">{recipe.notes}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <span className="font-medium">{recipe.preparationTime} preparación</span>
                                <span className="mx-2">•</span>
                                <span className="font-medium">{recipe.cookingTime} cocina</span>
                                <span className="mx-2">•</span>
                                <span className="font-medium">{recipe.servings} persionas</span>
                            </div>
                        </div>
                    </div>

                    <Separator/>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Ingredientes</h2>
                        <Card className="p-6">
                            <ul className="grid gap-2 sm:grid-cols-2">
                                {recipe.recipeIngredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary"/>
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Instrucciones</h2>
                        <Card className="p-6">


                            <ol className="space-y-4 ml-4 list-decimal">
                                {recipe.recipeSteps.map((step, index) => (
                                    <li key={index} className="pl-2">
                                        <p>{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

