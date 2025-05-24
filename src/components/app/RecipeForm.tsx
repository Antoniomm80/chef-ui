import type React from "react"
import {useState} from "react"
import {BotIcon as Robot} from "lucide-react"
import {LoadingButton} from '@/components/ui/loadingbutton';
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {RecipeBackend} from "@/lib/recipeBackend.ts";
import {recipesService} from "@/lib/use-recipes.tsx";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {ScrappedRecipe} from "@/lib/scrappedRecipe.ts";
import axios from "axios";
import {useQueryClient} from "@tanstack/react-query";
import {ImagePreview} from "@/components/app/ImagePreview.tsx";
import {IngredientsSection} from "@/components/app/IngredientsSection.tsx";
import {StepsSection} from "@/components/app/StepsSection.tsx";


interface RecipeFormProps {
    initialData?: RecipeBackend;
    onUpdateComplete?: () => void;
    onCancelEdit?: () => void;
}

export default function RecipeForm({initialData, onUpdateComplete, onCancelEdit}: RecipeFormProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<Partial<RecipeBackend>>({
        name: "",
        notes: "",
        recipeUrl: "",
        imageUrl: "",
        preparationTime: 0,
        cookingTime: 0,
        servings: 2,
        recipeIngredients: [""],
        recipeSteps: [""],
        ...initialData,
    })
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);


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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData && initialData.id) {
            // Update existing recipe
            await recipesService.updateRecipe(initialData.id, formData);
            await queryClient.invalidateQueries({queryKey: ['recipes', initialData.id]});
            // also invalidate the list of recipes
            await queryClient.invalidateQueries({ queryKey: ['recipes'] });
            toast("La receta se ha actualizado correctamente");
            onUpdateComplete?.();
        } else {
            // Create new recipe
            const newRecipe = await recipesService.createRecipe(formData);
            //updates the cache
            queryClient.setQueryData<RecipeBackend[]>(["recipes"], (oldData) => {
                if (!oldData) return [];
                return [...oldData, newRecipe];
            })
            toast("La receta se ha guardado correctamente");
            navigate("/");
        }
    }

    const handleParseUrl = async () => {
        if (!formData.recipeUrl) {
            alert("Please enter a recipe URL to parse")
            return
        }
        setLoading(true);
        const result = await axios.post<ScrappedRecipe>(`/chef/api/v1/recipes/scrape`, {url: formData.recipeUrl});
        const scrappedRecipe = result.data;
        setLoading(false);
        /*const scrappedRecipe = JSON.parse("{\n" +
            "    \"name\": \"Pierna de cerdo al horno\",\n" +
            "    \"description\": \"Cocinar esta receta de pierna de cerdo al horno es una gran satisfacción tanto para quien la prepara como para sus destinatarios. La piel cortada en pequeños rombos es muy crujiente por fuera y muy jugosa por dentro, y probarla produce prácticamente la misma sensación que cuando comes torreznos. La carne, con un increíble sabor gracias al adobo o marinada, está riquísima tanto en caliente, recién hecha, como días después usándola como fiambre.\",\n" +
            "    \"ingredients\": [\n" +
            "        \"Paletilla de cerdo con hueso de 5 kg aproximadamente\",\n" +
            "        \"Sal gruesa abundante, para la zona de la piel\",\n" +
            "        \"Diente de ajo para el adabo\",\n" +
            "        \"2 Orégano seco para el adobo\",\n" +
            "        \"Aceite de oliva virgen extra para el adobo\",\n" +
            "        \"Vinagre de Jerez para el adobo\",\n" +
            "        \"Pimentón dulce para el adobo\",\n" +
            "        \"Tomillo seco para el adobo\",\n" +
            "        \"Romero seco para el adobo\",\n" +
            "        \"Romero fresco dos ramitas para aromatizar, en la bandeja del horno\",\n" +
            "        \"Sal y pimienta al gusto para el adobo\"\n" +
            "    ],\n" +
            "    \"steps\": [\n" +
            "        \"Cortamos la manita o pezuña de la paletilla y la reservamos para otras preparaciones.\",\n" +
            "        \"Con un cuchillo bien afilado, hacemos unos cortes en forma de rombos en la parte de la piel.\",\n" +
            "        \"Salamos con sal gruesa abundante esta zona, procurando que la sal penetre por donde hemos dado los cortes.\",\n" +
            "        \"Preparamos un adobo mezclando las distintas hierbas aromáticas a partes iguales y las mezclamos con aceite y vinagre al gusto y los dientes de ajo muy picados.\",\n" +
            "        \"Damos otros cortes en la parte de la carne del jamón o pierna y cubrimos con el adobo, procurando que penetre en los cortes.\",\n" +
            "        \"Dejamos la pierna así preparada dentro de la nevera durante al menos doce horas.\",\n" +
            "        \"Asamos la pierna en la bandeja del horno, colocando la rejilla sobre esta.\",\n" +
            "        \"En la bandeja, ponemos unas ramitas de romero fresco y agua abundante para que la cocción sea al vapor.\",\n" +
            "        \"Calentamos el horno a 175ºC y horneamos la carne cubierta con papel aluminio durante dos horas.\",\n" +
            "        \"Transcurrido ese tiempo, retiramos el papel aluminio y subimos la temperatura a 190ºC para que la carne se termine de dorar y la piel tome un bonito color dorado y textura crujiente.\",\n" +
            "        \"Serán necesarios otros treinta minutos aproximadamente.\",\n" +
            "        \"Si es preciso, finalizamos con otros cinco minutos de gratinado, para que la piel sufle y reviente en burbujas, con el calor.\"\n" +
            "    ],\n" +
            "    \"servings\": 8,\n" +
            "    \"preparationTime\": 165,\n" +
            "    \"cookingTime\": 15,\n" +
            "    \"imageUrls\": [\n" +
            "        \"https://i.blogs.es/e3afcd/pierna-cerdo-asada-latam/450_1000.jpg\",\n" +
            "        \"https://i.blogs.es/093f03/blob/original.jpeg\",\n" +
            "        \"https://i.blogs.es/c5bf4e/pierna-de-cerdo-al-horno-los-pasos/450_1000.jpg\",\n" +
            "        \"https://i.blogs.es/c5bf4e/pierna-de-cerdo-al-horno-los-pasos/450_1000.jpg\",\n" +
            "        \"https://img.youtube.com/vi/VVAsryPlcHE/mqdefault.jpg\",\n" +
            "        \"https://img.youtube.com/vi/ifOhpcpsetQ/mqdefault.jpg\",\n" +
            "        \"https://img.youtube.com/vi/boss9VZNtJk/mqdefault.jpg\"\n" +
            "    ],\n" +
            "    \"recipeUrl\": \"https://www.directoalpaladar.com/recetas-de-carnes-y-aves/pierna-cerdo-al-horno-deliciosa-receta-pernil-asado-para-celebraciones-familiares-amigos\"\n" +
            "}");*/
        setFormData({
            ...formData,
            name: scrappedRecipe.name || "",
            notes: scrappedRecipe.description || "",
            recipeIngredients: scrappedRecipe.ingredients || [],
            recipeSteps: scrappedRecipe.steps || [],
            imageUrl: scrappedRecipe.imageUrls[0] || "",
            recipeUrl: scrappedRecipe.recipeUrl || "",
            preparationTime: scrappedRecipe.preparationTime || 0,
            cookingTime: scrappedRecipe.cookingTime || 0,
            servings: scrappedRecipe.servings || 0,
        })
        setImageUrls([...scrappedRecipe.imageUrls])
        setCurrentImageIndex(0)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Título</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            placeholder="Título de la receta"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Descripción</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes || ""}
                            onChange={handleChange}
                            placeholder="Describe brevemente la receta"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="recipeUrl">URL Receta</Label>
                        <div className="flex gap-2">
                            <Input
                                id="recipeUrl"
                                name="recipeUrl"
                                value={formData.recipeUrl || ""}
                                onChange={handleChange}
                                placeholder="Url de la receta original"
                            />
                            <LoadingButton loading={loading} type="button" onClick={handleParseUrl} className="shrink-0" variant="secondary">
                                <Robot className="h-4 w-4 mr-2"/>
                                Procesar
                            </LoadingButton>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Pulsa el botón Procesar para generar la receta con IA a partir de la URL
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">URL Imagen</Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl || ""}
                            onChange={handleChange}
                            placeholder="URL de la imagen de la receta"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="preparationTime">Tiempo preparación</Label>
                            <Input
                                id="preparationTime"
                                name="preparationTime"
                                value={formData.preparationTime || ""}
                                onChange={handleChange}
                                placeholder="e.g. 15"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cookingTime">Tiempo cocina</Label>
                            <Input
                                id="cookingTime"
                                name="cookingTime"
                                value={formData.cookingTime || ""}
                                onChange={handleChange}
                                placeholder="e.g. 30"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="servings">Personas</Label>
                            <Input
                                id="servings"
                                name="servings"
                                type="number"
                                min="1"
                                value={formData.servings || ""}
                                onChange={handleNumberChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <ImagePreview imageUrls={imageUrls} formData={formData} setFormData={setFormData} currentImageIndex={currentImageIndex}
                              setCurrentImageIndex={setCurrentImageIndex}/>
            </div>
            <IngredientsSection formData={formData} setFormData={setFormData}/>
            <StepsSection formData={formData} setFormData={setFormData}/>


            <div className="flex justify-end gap-4">
                {initialData && initialData.id ? (
                    <Button type="button" variant="outline" onClick={onCancelEdit}>
                        Cancelar
                    </Button>
                ) : (
                    <Button type="button" variant="outline" asChild>
                        <a href="/">Cancelar</a>
                    </Button>
                )}
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    )
}

