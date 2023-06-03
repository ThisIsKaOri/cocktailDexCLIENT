import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { IngredientType } from "../../models/Ingredient";

const baseUrl = 'http://localhost:3000/v1/ingredients';
const clearUrl = () => window.location.href = "";

export const IngredientDetails = () => {

    let params = useParams();
    let navigate = useNavigate();
    const [ingredient, setIngredient] = useState({
        _id: " ",
        name: " ",
        strength: " ",
        replacements: [],
        description: " ",
        cocktails: [],
        img: " ",
    });

    useEffect(() => {

        let url = `${baseUrl}?name=${params.ingredientName}`;

        axios.get(`${url}`)
            .then(({ data }) => {
                setIngredient(data[0]);
            })
            .catch(error => {

                console.error(error);
            });
    }, [params]);
    return (
        <div className="container" style={{marginBottom: "100px"}}>
            <div className="actions"
                style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                    style={{ width: "60px", aspectRatio: "1/1", border: "none" }}
                    className="secondary outline"
                    onClick={() => navigate('/ingredients')}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <img src={ingredient.img} style={{ width: "60%", height: "auto" }} />
            <hgroup style={{ textAlign: "left" }}>
                <h1>{`${ingredient.name[0].toUpperCase()}${ingredient.name.slice(1)}`}</h1>
                <h5>{`Strenghth: ${ingredient.strength ? ingredient.strength : "analcoholic"}`}</h5>
            </hgroup>
            <div style={{textAlign: "left"}}>
                <p>{ingredient.description}</p>
                <h6>Used in:</h6>
                {ingredient.cocktails.map(item => {
                    return (
                        <Link to={`/cocktails/${item}`}>
                            <kbd style={{ margin: "2px" }}>{item}</kbd>
                        </Link>
                    );
                })}
                <h6>Replacements:</h6>
                {ingredient.replacements[0] == '-' ? "none" : 
                ingredient.replacements.map(item => {
                    return (
                        <Link to={`/ingredients/${item}`}>
                            <kbd style={{ margin: "2px" }}>{item}</kbd>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}