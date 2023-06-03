import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IngredientType } from '../../models/Ingredient';
import { Link } from 'react-router-dom';
import { IngredientItem } from './IngredientItem';

const baseUrl = 'http://localhost:3000/v1/ingredients';

export const IngredientsList = () => {

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {

        let url = baseUrl;

        name ? url += `?name=${name}` : url = url;

        axios.get(`${url}`)
            .then(response => {

                setIngredients(response.data);
            })
            .catch(error => {

                console.error(error);
            });
    }, [name]);

    return (
        <>
            <input type="search" id="search" name="search" placeholder="Search by name"
                style={{ margin: "16px", maxWidth: "90%" }}
                onChange={(event) => setName(event.target.value)}
            />
            {ingredients.map((item: IngredientType, index) => {
                return (
                    <Link to={`/ingredients/${item.name}`}>
                        <IngredientItem ingredient={item} />
                    </Link>
                )
            }
            )}
        </>
    );
}