import axios from 'axios';
import { useEffect, useState } from 'react'
import { IngredientType } from '../../models/Ingredient';
import { IngredientItem } from './IngredientItem';
import { useSearchParams, Link } from 'react-router-dom';

const baseUrl = 'http://localhost:3000/v1/ingredients';

export const IngredientsList = () => {

    const [searchParams, setSearchParams] = useSearchParams({});

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {

        let url = baseUrl;

        searchParams ? url += `?${searchParams}` : url = url;

        axios.get(`${url}`)
            .then(response => {

                setIngredients(response.data);
            })
            .catch(error => {

                console.error(error);
            });
    }, [searchParams, name]);

    return (
        <div style={{textAlign: "left"}}>
        <h1 style={{margin: "16px 0 0 24px"}}>Ingredients</h1>
            <input type="search" id="search" name="search" placeholder="Search by name"
                style={{ margin: "16px", maxWidth: "90%" }}
                onChange={(event) => {
                    event.target.value ? setSearchParams({ name: event.target.value }) :
                    setSearchParams({});
                    setName(event.target.value)
                }}
            />
            {ingredients.map((item: IngredientType, index) => {
                return (
                    <div key={`ingredient${index}`}>
                    <Link to={`/ingredients/${item.name}`}>
                        <IngredientItem ingredient={item} />
                    </Link>
                    </div>
                )
            }
            )}
        </div>
    );
}