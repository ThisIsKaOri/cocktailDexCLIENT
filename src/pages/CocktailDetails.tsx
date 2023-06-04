import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import useAuth, { AuthData } from "../hooks/useAuth";

const baseUrl = 'http://localhost:3000/v1/cocktails';

export const CocktailDetails = () => {

    const { user } = useAuth() as AuthData;

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
                <button className="secondary outline" 
                    onClick={() => navigate('/cocktails')}
                    style={{
                        color: "#f4511e",
                        width: "60px",
                        aspectRatio: "1/1",
                        border: "none"
                    }}  
                ><i className="bi bi-x-lg"></i></button>
            </div>

            <img src={cocktail.img} style={{ width: "60%", height: "auto" }} />
            
            <hgroup style={{ textAlign: "left" }}>
                <h1>
                    {`${cocktail.name[0].toUpperCase()}${cocktail.name.slice(1)}`}
                </h1>
                <h5>{`${cocktail.ibaFamily}`}</h5>
                <h5>{cocktail.alcoholic ? "alcoholic" : "analcoholic"}</h5>
            </hgroup>

            <div style={{ textAlign: "left", marginBottom: "70px"}}>
                <h6>Ingredients:</h6>
                {cocktail.recipe.map(item => {
                    return (
                        <p style={{marginBottom: "8px"}}>{item.qty} <Link to={`/ingredients/${item.ingredient}`}>{item.ingredient}</Link></p>
                    );
                })}
                <h6 style={{marginBottom: "8px"}}>Glass:</h6>
                <p>{cocktail.glass}</p>
                <h6 style={{marginBottom: "8px"}}>Method:</h6>
                <p>{cocktail.method}</p>
                <h6 style={{marginBottom: "8px"}}>Garnish:</h6>
                <p>{cocktail.garnish}</p>
                {cocktail.variants.length != 0 ? (
                    <>
                        <h6 style={{marginBottom: "8px"}}>Variants:</h6>
                        {cocktail.variants.map(item => {
                            return (
                                <Link to={`/cocktails/${item}`}>
                                    <kbd style={{
                                        backgroundColor: "#f4511e",
                                        color: "#fff",
                                        margin: "2px"
                                    }}>{item}</kbd>
                                </Link>
                            );
                        })}
                    </>
                ) : "" }                    
            </div>

            {user.isAdmin && 
                <button className="outline">
                    <Link to={`/cocktails/edit/${cocktail.name}`}>
                    Modify <i className="bi bi-pencil-fill"></i>
                    </Link>
                </button>
            }
        </div>
    )
}