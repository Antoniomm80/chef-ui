import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus, X} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import type React from "react";
import {RecipeBackend} from "@/lib/recipeBackend.ts";

interface StepsSectionProps {
    formData: Partial<RecipeBackend>
    setFormData: React.Dispatch<React.SetStateAction<Partial<RecipeBackend>>>;
}

export function StepsSection({formData, setFormData}: StepsSectionProps) {
    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...(formData.recipeSteps || [])]
        updatedSteps[index] = value
        setFormData({
            ...formData,
            recipeSteps: updatedSteps,
        })
    }


    const addStep = () => {
        setFormData({
            ...formData,
            recipeSteps: [...(formData.recipeSteps || []), ""],
        })
    }

    const removeStep = (index: number) => {
        const updatedSteps = [...(formData.recipeSteps || [])]
        updatedSteps.splice(index, 1)
        setFormData({
            ...formData,
            recipeSteps: updatedSteps,
        })
    }
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label>Pasos de la preparación</Label>
                <Button type="button" variant="outline" size="sm" onClick={addStep} className="flex items-center gap-1">
                    <Plus className="h-4 w-4"/> Añadir paso
                </Button>
            </div>

            <Card>
                <CardContent className="p-4 space-y-4">
                    {formData.recipeSteps?.map((step, index) => (
                        <div key={index} className="flex gap-2">
                            <div className="flex-shrink-0 flex items-start pt-2">
                                <div
                                    className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                </div>
                            </div>
                            <div className="flex-grow space-y-1">
                                <Textarea
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                    placeholder={`Step ${index + 1}`}
                                    rows={2}
                                    required
                                />
                                {formData.recipeSteps!.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeStep(index)}
                                        className="h-8 px-2 text-muted-foreground"
                                    >
                                        <X className="h-3 w-3 mr-1"/> Quitar
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}