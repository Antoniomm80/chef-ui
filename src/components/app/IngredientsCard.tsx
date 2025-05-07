import {Card} from "@/components/ui/card.tsx";

interface IngredientsCardProps {
    recipeIngredients: string[];
}

export function IngredientsCard({recipeIngredients}: IngredientsCardProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Ingredientes</h2>
            <Card className="p-6">
                <ul className="grid gap-2 sm:grid-cols-2">
                    {recipeIngredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"/>
                            <span>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}