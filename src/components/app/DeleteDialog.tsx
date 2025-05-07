import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {recipesService} from "@/lib/use-recipes.tsx";
import {RecipeBackend} from "@/lib/recipeBackend.ts";
import {toast} from "sonner";
import {useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";

interface DeleteDialogProps {
    recipeId: string;
    recipeName: string;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (isOpen: boolean) => void;
}

export function DeleteDialog({recipeId, recipeName, isDeleteDialogOpen, setIsDeleteDialogOpen}: DeleteDialogProps) {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleDelete = async () => {
        await recipesService.deleteRecipe(parseInt(recipeId));
        //updates the cache
        queryClient.setQueryData<RecipeBackend[]>(["recipes"], (oldData) => {
            if (!oldData) {
                return [];
            }
            return oldData.filter((recipe) => recipe.id !== recipeId);
        })
        toast("La receta se ha eliminado correctamente");
        navigate("/");
    }

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas seguro de que quieres eliminar esta receta?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente la receta "{recipeName}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Borrar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}