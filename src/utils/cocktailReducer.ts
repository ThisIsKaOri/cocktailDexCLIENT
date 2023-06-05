import { CocktailType } from "../models/Cocktail";
import { IngredientType } from "../models/Ingredient";

type UpdateNameAction = {

    type: 'update_name';
    payload: string;
};

type UpdateIbaFamilyAction = {

    type: 'update_ibaFamily';
    payload: string;
}

type UpdateAlcoholicAction = {

    type: 'update_alcoholic';
    payload: boolean;
};

type UpdateRecipeAction = {

    type: 'update_recipe';
    payload: IngredientType[];
};

type UpdateIngredientAction = {

    type: 'update_ingredient';
    index: number;
    payload: string;
};

type UpdateQtyAction = {

    type: 'update_qty';
    index: number;
    payload: string;
};

type RemoveIngredientAction = {

    type: 'remove_ingredient';
    index: number;
};

type AddIngredientAction = {

    type: 'add_ingredient';
};

type UpdateGlassAction = {

    type: 'update_glass';
    payload: string;
};

type UpdateMethodAction = {

    type: 'update_method';
    payload: string;
};

type UpdateGarnishAction = {

    type: 'update_garnish';
    payload: string;
};

type UpdateHistoryAction = {

    type: 'update_history';
    payload: string;
};

type UpdateVariantsAction = {

    type: 'update_variants';
    payload: string[];
};

type UpdateVariantAction = {

    type: 'update_variant';
    index: number;
    payload: string;
};

type RemoveVariantAction = {

    type: 'remove_variant';
    index: number;
};

type AddVariantAction = {

    type: 'add_variant';
};

type UpdateImgAction = {

    type: 'update_img';
    payload: string;
}

type CocktailReducerActions =

    | UpdateNameAction
    | UpdateIbaFamilyAction
    | UpdateAlcoholicAction
    | UpdateRecipeAction
    | UpdateIngredientAction
    | UpdateQtyAction
    | RemoveIngredientAction
    | AddIngredientAction
    | UpdateGlassAction
    | UpdateMethodAction
    | UpdateGarnishAction
    | UpdateHistoryAction
    | UpdateVariantsAction
    | UpdateVariantAction
    | RemoveVariantAction
    | AddVariantAction
    | UpdateImgAction;

const cocktailReducer = (cocktail: CocktailType, action: CocktailReducerActions): CocktailType | any => {

    switch (action.type) {
        case 'update_name':
            return { ...cocktail, name: action.payload };
        case 'update_alcoholic':
            return { ...cocktail, alcoholic: action.payload };
        case 'update_ibaFamily':
            return { ...cocktail, ibaFamily: action.payload };
        case 'update_recipe':
            return { ...cocktail, recipe: [...action.payload] };
        case 'update_ingredient':
            return {
                ...cocktail,
                // ? creo una copia di recipe col map e appena arrivo all'index
                // ? sostituisco il valore di ingredient con il payload.
                recipe: cocktail.recipe.map((ingredient, index) =>
                    index === action.index ? (
                        { ...ingredient, ingredient: action.payload }
                    ) : ingredient
                )
            };
        case 'update_qty':
            return {
                ...cocktail,
                recipe: cocktail.recipe.map((ingredient, index) =>
                    index === action.index ? (
                        { ...ingredient, qty: action.payload }
                    ) : ingredient
                )
            };
        case 'remove_ingredient':
            // ? easy clono recipe e gli levo l'ingredient all'index
            const updatedRecipe = [...cocktail.recipe]
            updatedRecipe.splice(action.index, 1);
            return { ...cocktail, recipe: updatedRecipe };
        case 'add_ingredient':
            return {
                ...cocktail,
                recipe: [...cocktail.recipe, { ingredient: '', qty: '' }]
            };
        case 'update_glass':
            return { ...cocktail, glass: action.payload };
        case 'update_glass':
            return { ...cocktail, glass: action.payload };
        case 'update_method':
            return { ...cocktail, method: action.payload };
        case 'update_garnish':
            return { ...cocktail, garnish: action.payload };
        case 'update_history':
            return { ...cocktail, history: action.payload };
        case 'update_variants':
            return { ...cocktail, variants: action.payload };
        case 'update_variant':
            return {
                ...cocktail,
                // ? creo una copia di variants col map e appena arrivo all'index
                // ? sostituisco la variante con il payload.
                variants: cocktail.variants!.map((variant, index) =>
                    index === action.index ? action.payload : variant)
            };
        case 'remove_variant':
            // ? easy clono recipe e gli levo l'ingredient all'index
            const updatedVariants = [...cocktail.variants!]
            updatedVariants.splice(action.index, 1);
            return { ...cocktail, variants: updatedVariants };
        case 'add_variant':
            return { ...cocktail, variants: [...cocktail.variants!, ''] };
        case 'update_img':
            return { ...cocktail, img: action.payload };
        default:
            return cocktailReducer;
    };
};

export default cocktailReducer;