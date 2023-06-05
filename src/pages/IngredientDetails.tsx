import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import useAuth, { AuthData } from "../hooks/useAuth";
import DeleteWarning from "../components/UI/DeleteWarning";

const baseUrl = 'http://localhost:3000/v1/ingredients';
const clearUrl = () => window.location.href = "";

const IngredientDetails = () => {

    const { user } = useAuth() as AuthData

    let params = useParams();
    let navigate = useNavigate();

    const [onDelete, setOnDelete] = useState(false);


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
        <>
        {onDelete && <DeleteWarning endpoint={baseUrl} name={params.ingredientName!} />}
        <div className="container" style={{ marginBottom: "100px" }}>
            <div className="actions"
                style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                    style={{ color: "#f4511e", width: "60px", aspectRatio: "1/1", border: "none" }}
                    className="secondary outline"
                    onClick={() => navigate('/ingredients')}
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <img src={ingredient.img} style={{ width: "60%", height: "auto" }} />
            <hgroup style={{ textAlign: "left" }}>
                <h1>{`${ingredient.name[0].toUpperCase()}${ingredient.name.slice(1)}`}</h1>
                {ingredient.strength ? <h5>{`Strength: ${ingredient.strength}`}</h5> : <h5></h5>}
            </hgroup>
            <div style={{ textAlign: "left", marginBottom: "70px" }}>
                <p>{ingredient.description}</p>
                <h6 style={{marginBottom: "8px"}}>Used in:</h6>
                {ingredient.cocktails.map((item, index) => {
                    return (
                        <div key={`cocktail${index}`}>
                        <Link to={`/cocktails/${item}`}>
                            <kbd style={{
                                backgroundColor: "#f4511e",
                                color: "#fff",
                                margin: "2px"
                            }}>{item}</kbd>
                        </Link>
                        </div>
                    );
                })}
                {ingredient.replacements[0] != '-' ? (
                    <>
                    <h6 style={{marginBottom: "8px"}}>Replacements:</h6>
                    {ingredient.replacements.map((item, index) => {
                        return (
                            <span key={`replacement${index}`}>
                            <Link to={`/ingredients/${item}`}>
                                <kbd style={{
                                    backgroundColor: "#f4511e",
                                    color: "#fff",
                                    margin: "2px"
                                }}
                            >{item}</kbd>
                            </Link>
                            </span>
                        );
                    })}
                    </>
                ) : " "}
            </div>

            {user.isAdmin &&
                    <>
                        <button className="outline">
                            <Link to={`/ingredients/edit/${ingredient.name}`}>
                                Modify <i className="bi bi-pencil-fill"></i>
                            </Link>
                        </button>
                        <button className="outline"
                            onClick={() => setOnDelete(!onDelete)}
                        >Delete</button>
                    </>
            }

        </div>
        </>
    )
}

export default IngredientDetails