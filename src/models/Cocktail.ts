type RecipeIgredient = {

    ingredient: string;
    qty?: string;
    oz?: string;
};

export type CocktailType = {

    _id?: string;
    name: string;
    alcoholic: boolean;
    ibaFamily?: string;
    family?: string;
    recipe: RecipeIgredient[];
    glass: string;
    method: string;
    garnish: string;
    history?: string;
    variants?: string[],
    img?: string;
};