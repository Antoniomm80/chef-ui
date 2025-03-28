"use client"

import type React from "react"
import {useEffect, useState} from "react"

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Recipe} from "@/lib/recipe.ts";


interface RecipeFormProps {
    initialData?: Recipe
}

export default function RecipeForm({initialData}: RecipeFormProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        image: initialData?.image || "",
        prepTime: initialData?.prepTime || "",
        cookTime: initialData?.cookTime || "",
        servings: initialData?.servings || 4,
        ingredientsText: initialData?.ingredients ? initialData.ingredients.join("\n") : "",
        stepsText: initialData?.steps ? initialData.steps.join("\n\n") : "",
    })

    const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "")

    // Update image preview when image URL changes
    useEffect(() => {
        setImagePreview(formData.image || "")
    }, [formData.image])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: Number.parseInt(value) || 0,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Convert text areas to arrays
        const ingredients = formData.ingredientsText.split("\n").filter((line) => line.trim() !== "")

        const steps = formData.stepsText.split("\n\n").filter((step) => step.trim() !== "")

        // Create the recipe object
        const recipeData = {
            title: formData.title,
            description: formData.description,
            image: formData.image,
            prepTime: formData.prepTime,
            cookTime: formData.cookTime,
            servings: formData.servings,
            ingredients,
            steps,
            id: initialData?.id || Date.now().toString(),
            totalTime: `${formData.prepTime} + ${formData.cookTime}`,
        }

        console.log("Recipe data:", recipeData)
        alert("Recipe saved successfully!")
        // In a real app, you would redirect to the recipe page or list
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Recipe Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter recipe title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Briefly describe your recipe"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            required
                        />
                        <p className="text-sm text-muted-foreground">
                            Enter a URL to an image (e.g., https://example.com/my-recipe.jpg)
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="prepTime">Prep Time</Label>
                            <Input
                                id="prepTime"
                                name="prepTime"
                                value={formData.prepTime}
                                onChange={handleChange}
                                placeholder="e.g. 15 min"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cookTime">Cook Time</Label>
                            <Input
                                id="cookTime"
                                name="cookTime"
                                value={formData.cookTime}
                                onChange={handleChange}
                                placeholder="e.g. 30 min"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="servings">Servings</Label>
                            <Input
                                id="servings"
                                name="servings"
                                type="number"
                                min="1"
                                value={formData.servings}
                                onChange={handleNumberChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Image Preview</Label>
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            {imagePreview ? (
                                <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Recipe preview"
                                    className="w-full aspect-square object-cover"
                                    onError={() => setImagePreview("https://placehold.co/600x400/png")}
                                />
                            ) : (
                                <div className="w-full aspect-square bg-muted flex items-center justify-center text-muted-foreground">
                                    <img
                                        src="https://placehold.co/600x400/png"
                                        alt="Placeholder"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="ingredientsText">Ingredients</Label>
                    <p className="text-sm text-muted-foreground mb-2">Enter each ingredient on a new line</p>
                    <Textarea
                        id="ingredientsText"
                        name="ingredientsText"
                        value={formData.ingredientsText}
                        onChange={handleChange}
                        placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup sugar&#10;..."
                        rows={8}
                        required
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="stepsText">Preparation Steps</Label>
                    <p className="text-sm text-muted-foreground mb-2">Enter each step separated by a blank line</p>
                    <Textarea
                        id="stepsText"
                        name="stepsText"
                        value={formData.stepsText}
                        onChange={handleChange}
                        placeholder="Preheat the oven to 350°F.&#10;&#10;Mix all dry ingredients in a large bowl.&#10;&#10;Add wet ingredients and stir until combined."
                        rows={10}
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                    <a href="/">Cancel</a>
                </Button>
                <Button type="submit">Save Recipe</Button>
            </div>
        </form>
    )
}

