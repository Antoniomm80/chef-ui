import React, {useEffect, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RecipeBackend} from "@/lib/recipeBackend.ts";

interface ImagePreviewProps {
    imageUrls: string[];
    formData: Partial<RecipeBackend>
    setFormData: React.Dispatch<React.SetStateAction<Partial<RecipeBackend>>>;
    currentImageIndex: number;
    setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function ImagePreview({imageUrls, formData, setFormData, currentImageIndex, setCurrentImageIndex}: ImagePreviewProps) {

    const [imagePreview, setImagePreview] = useState<string>(imageUrls[currentImageIndex]);
    const handleImageCycle = (direction: "prev" | "next") => {
        let newIndex = currentImageIndex;
        if (direction === "prev" && currentImageIndex > 0) {
            newIndex--;
        } else if (direction === "next" && currentImageIndex < imageUrls.length - 1) {
            newIndex++;
        }
        setCurrentImageIndex(newIndex);
        if (imageUrls.length > 0) {
            setFormData({
                ...formData,
                imageUrl: imageUrls[newIndex],
            })
        }
    }
    useEffect(() => {
        setImagePreview(formData.imageUrl || "")
    }, [formData.imageUrl]);

    return (
        <div className="space-y-4">
            <Label>Vista Previa</Label>

            {imagePreview ? (
                <img
                    src={imagePreview || "https://placehold.co/600x400/png"}
                    alt="Recipe preview"
                    className="w-full aspect-square object-cover rounded-md shadow-md"
                    onError={() => setImagePreview("https://placehold.co/600x400/png")}
                />
            ) : (
                <div className="w-full aspect-square bg-muted flex items-center justify-center text-muted-foreground">
                    La vista de la imagen se mostrará aquí
                </div>
            )}
            {imageUrls.length > 1 && (
                <div className="flex justify-between gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleImageCycle("prev")}
                        disabled={currentImageIndex === 0}
                    >
                        Anterior
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleImageCycle("next")}
                        disabled={currentImageIndex === imageUrls.length - 1}
                    >
                        Siguiente
                    </Button>
                </div>
            )}
            {imageUrls.length > 0 && (
                <p className="text-sm text-center text-muted-foreground">
                    Imagen {currentImageIndex + 1} de {imageUrls.length}
                </p>
            )}

        </div>
    );
}