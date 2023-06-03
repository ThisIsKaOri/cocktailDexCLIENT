import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { CocktailType } from "../../models/Cocktail";

const baseUrl = 'http://localhost:3000/v1/cocktails';
const clearUrl = () => window.location.href = "";

export const CocktailDetails = () => {

    let params = useParams();
    let navigate = useNavigate();
    const [cocktail, setCocktail] = useState({
        _id: " ",
        name: " ",
        alcoholic: false,
        ibaFamily: " ",
        family: " ",
        recipe: [{ ingredient: "", qty: "" }],
        glass: " ",
        method: " ",
        garnish: " ",
        history: " ",
        variants: [],
        img: " "
    });

    useEffect(() => {

        let url = `${baseUrl}?name=${params.cocktailName}`;

        axios.get(`${url}`)
            .then(({ data }) => {
                setCocktail(data[0]);
            })
            .catch(error => {

                console.error(error);
            });
    }, [params]);
    return (
        <div className="container" style={{ marginBottom: "100px" }}>
            <div className="actions"
                style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                    style={{ width: "60px", aspectRatio: "1/1", border: "none" }}
                    className="secondary outline"
                    onClick={() => navigate('/cocktails')}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <img src={cocktail.img} style={{ width: "60%", height: "auto" }} />
            <hgroup style={{ textAlign: "left" }}>
                <h1>{`${cocktail.name[0].toUpperCase()}${cocktail.name.slice(1)}`}</h1>
                <h5>{`${cocktail.ibaFamily}`}</h5>
                <h5>{cocktail.alcoholic ? "alcoholic" : "analcoholic"}</h5>
            </hgroup>
            <div style={{ textAlign: "left" }}>
                <h6>Ingredients:</h6>
                {cocktail.recipe.map(item => {
                    return (
                    <p>{item.qty} <Link to={`/ingredients/${item.ingredient}`}>{item.ingredient}</Link></p>
                    );
                })}
                <h6>Glass:</h6>
                <p>{cocktail.glass}</p>
                <h6>Method:</h6>
                <p>{cocktail.method}</p>
                <h6>Garnish:</h6>
                <p>{cocktail.garnish}</p>
                <h6>Variants:</h6>
                {cocktail.variants[0] == '-' ? "none" :
                    cocktail.variants.map(item => {
                        return (
                            <Link to={`/cocktails/${item}`}>
                                <kbd style={{ margin: "2px" }}>{item}</kbd>
                            </Link>
                        );
                    })}
            </div>
        </div>
    )
}