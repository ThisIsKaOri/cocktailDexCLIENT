import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CocktailType } from '../../models/Cocktail';
import { CocktailItem } from './CocktailItem';
import { Link } from 'react-router-dom';

const baseUrl = 'http://localhost:3000/v1/cocktails'

export const CocktailsList = () => {

    const [name, setName] = useState("");
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {

        let url = baseUrl;

        name ? url += `?name=${name}` : url = url;

        axios.get(`${url}`)
            .then(response => {

                setCocktails(response.data);
            })
            .catch(error => {
                setCocktails([]);
            });
    }, [name]);

    return (
        <>
            <input type="search" id="search" name="search" placeholder="Search by name"
                style={{ margin: "16px", maxWidth: "90%" }}
                onChange={(event) => setName(event.target.value)}
            />
            {cocktails.length == 0 && <p>no cocktails found..</p>}
            {cocktails.map((item: CocktailType, index) => {
                return (
                    <Link to={`/cocktails/${item.name}`}>
                        <CocktailItem cocktail={item} />
                    </Link>
                )
            }
            )}
        </>
    );
}
