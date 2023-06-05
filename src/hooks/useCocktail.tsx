import { useEffect, useReducer } from "react";
import { CocktailType } from "../models/Cocktail";
import cocktailReducer from "../utils/cocktailReducer";
import axios from "axios";

const initialState: CocktailType = {

    name: " ",
    alcoholic: false,
    ibaFamily: " ",
    recipe: [{ ingredient: "", qty: "" }],
    glass: " ",
    method: " ",
    garnish: " ",
    history: " ",
    variants: [''],
    img: " "
};


export const useCocktail = (url: string) => {
    
    const [cocktail, dispatchCocktail] = useReducer(cocktailReducer, initialState);
    
    useEffect(() => {


        axios.get(`${url}`)
            .then(({ data }) => {

                dispatchCocktail({ type: 'update_name', payload: data[0].name });
                dispatchCocktail({ type: 'update_alcoholic', payload: data[0].alcoholic });
                dispatchCocktail({ type: 'update_ibaFamily', payload: data[0].ibaFamily });
                dispatchCocktail({ type: 'update_recipe', payload: data[0].recipe });
                dispatchCocktail({ type: 'update_glass', payload: data[0].glass });
                dispatchCocktail({ type: 'update_method', payload: data[0].method });
                dispatchCocktail({ type: 'update_garnish', payload: data[0].garnish });
                dispatchCocktail({ type: 'update_history', payload: data[0].history });
                dispatchCocktail({ type: 'update_variants', payload: data[0].variants });
                dispatchCocktail({ type: 'update_img', payload: data[0].img });
            })
            .catch(error => {

                console.error(error);
            });
    }, []);

    return [cocktail, dispatchCocktail];
}