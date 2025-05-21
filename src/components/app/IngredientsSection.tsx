import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus, X} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import type React from "react";
import {RecipeBackend} from "@/lib/recipeBackend.ts";

interface IngredientsSectionProps {
    formData: Partial<RecipeBackend>
    setFormData: React.Dispatch<React.SetStateAction<Partial<RecipeBackend>>>;
}

export function IngredientsSection({formData, setFormData}: IngredientsSectionProps) {
    const handleIngredientChange = (index: number, value: string) => {
        const updatedIngredients = [...(formData.recipeIngredients || [])]
        updatedIngredients[index] = value
        setFormData({
            ...formData,
            recipeIngredients: updatedIngredients,
        })
    }

    const addIngredient = () => {
        setFormData({
            ...formData,
            recipeIngredients: [...(formData.recipeIngredients || []), ""],
        })
    }

    const removeIngredient = (index: number) => {
        const updatedIngredients = [...(formData.recipeIngredients || [])]
        updatedIngredients.splice(index, 1)
        setFormData({
            ...formData,
            recipeIngredients: updatedIngredients,
        })
    }
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label>Ingredients</Label>
                <Button type="button" variant="outline" size="sm" onClick={addIngredient} className="flex items-center gap-1">
                    <Plus className="h-4 w-4"/> Agregar ingrediente
                </Button>
            </div>

            <Card>
                <CardContent className="p-4 space-y-3">
                    {formData.recipeIngredients?.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                placeholder={`Ingredient ${index + 1}`}
                                required
                            />
                            {formData.recipeIngredients!.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeIngredient(index)}
                                    className="h-8 w-8 shrink-0"
                                >
                                    <X className="h-4 w-4"/>
                                    <span className="sr-only">Quitar</span>
                                </Button>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}