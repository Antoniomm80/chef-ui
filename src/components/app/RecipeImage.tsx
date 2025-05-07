interface RecipeImageProps {
    imageUrl: string;
    imageAlt: string;
}

export function RecipeImage({imageUrl, imageAlt}: RecipeImageProps) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
            <img src={imageUrl || "/placeholder.svg"} alt={imageAlt} className="w-full h-full object-cover"/>
        </div>
    );
}