import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeIgredient } from '../models/Cocktail';
import useAuth, { AuthData } from '../hooks/useAuth';

const baseUrl = 'http://localhost:3000/v1/cocktails';


const EditCocktailDetails = () => {

    const { user: { token } } = useAuth() as AuthData;

    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //faccio uno state a parte per evitare di renderizzare tutto il componente
    const [name, setName] = useState("");
    const [ibaFamily, setIbaFamily] = useState("");
    const [alcoholic, setAlcoholic] = useState(false);
    const [recipe, setRecipe] = useState([{ ingredient: '', qty: '' }]);
    const [glass, setGlass] = useState('');
    const [method, setMethod] = useState('');
    const [garnish, setGarnish] = useState('');
    const [history, setHistory] = useState('');
    const [variants, setVariants] = useState([""]);
    const [img, setImg] = useState('');



    const inputNameHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setName(event.target.value);
    };

    const inputFamilyHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setIbaFamily(event.target.value);
    };

    const changeAlcoholicHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setAlcoholic(!alcoholic);
    }

    const removeIngredientHandler = (index: number) => {

        const updatedRecipe = [...recipe];
        updatedRecipe.splice(index, 1);
        setRecipe(updatedRecipe);
    };

    const addIngredientHandler = () => {

        const updatedRecipe = [...recipe];
        updatedRecipe.push({ ingredient: '', qty: '' });
        setRecipe(updatedRecipe);
    };

    const inputIngredientHandler = (
        event: ChangeEvent<HTMLInputElement>, index: number, key: 'ingredient' | 'qty') => {

        const updatedRecipe = [...recipe];
        key === 'ingredient' ? (
            updatedRecipe[index].ingredient = event.target.value
        ) : (
            updatedRecipe[index].qty = event.target.value
        );
        setRecipe(updatedRecipe);
    }

    const inputGlassHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setGlass(event.target.value);
    };

    const inputMethodHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setMethod(event.target.value);
    };

    const inputGarnishHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setGarnish(event.target.value);
    };

    const removeVariantHandler = (index: number) => {

        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const addVariantHandler = () => {

        const updatedVariants = [...variants];
        updatedVariants.push("");
        setVariants(updatedVariants);
    };

    const inputVariantHandler = (
        event: ChangeEvent<HTMLInputElement>, index: number) => {

        const updatedVariants = [...variants];
        updatedVariants[index] = event.target.value;
        setVariants(updatedVariants);
    }

    const inputHistoryHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setHistory(event.target.value);
    };

    const inputImgHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setImg(event.target.value);
    };

    const submitHandler = async (event: React.SyntheticEvent) => {

        event.preventDefault()

        const newCocktail = {

            name: name.trim(),
            alcoholic: alcoholic,
            ibaFamily: ibaFamily.trim(),
            recipe: [...recipe],
            glass: glass.trim(),
            method: method.trim(),
            garnish: garnish.trim(),
            history: history.trim(),
            variants: [...variants],
            img: img.trim()
        };
        try {
            
            const response = await axios.post(baseUrl, newCocktail, {
                headers: {
                    authorization: token
                }
            });

            console.log(response);
            setSuccess(true);
        } catch (error: any) {

            if (error.response.status === 404) {

                setServerMsg("Something went wrong..");
            } else if (error.response.status === 403) {

                setServerMsg("User not validated..");
            } else if (error.response.status === 409) {

                setServerMsg("Cocktail already exist..");
            } else {
                console.log(error);
                setServerMsg(String(error.response.data))
            }
        }
    }


    return (
        <>
            <dialog open={success ? true : false}>
                <article style={{ width: "90%" }}>
                    <h3>Cocktail Added!</h3>
                    <p>{serverMsg}</p>
                    <footer>
                        <button className="secondary"
                            onClick={() => {
                                navigate(`/cocktails/${name}`, {replace: true});
                            }}>Ok</button>
                    </footer>
                </article>
            </dialog>
            <dialog open={serverMsg ? true : false}>
                <article style={{ width: "90%" }}>
                    <h3>Ooops!</h3>
                    <p>{serverMsg}</p>
                    <footer>
                        <button className="secondary"
                            onClick={() => {
                                setServerMsg("");
                            }}>Dismiss</button>
                    </footer>
                </article>
            </dialog>
            <div className='container' style={{ textAlign: "left" }}>

                <div className="actions"
                    style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="secondary outline"
                        onClick={() => navigate(-1)}
                        style={{
                            color: "#f4511e",
                            width: "60px",
                            aspectRatio: "1/1",
                            border: "none"
                        }}
                    ><i className="bi bi-x-lg"></i></button>
                </div>
                <h1 style={{ margin: "32px 0" }}>Edit New Cocktail</h1>

                <form onSubmit={submitHandler} style={{ marginBottom: '70px' }} >
                    <details open style={{ marginTop: '70px' }}>
                        <summary style={{ marginBottom: "8px" }}>General:</summary>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name"
                            value={name}
                            onChange={inputNameHandler}
                        />
                        <label htmlFor="ibaFamily">Iba Family:</label>
                        <input type="text" id="ibaFamily"
                            value={ibaFamily}
                            onChange={inputFamilyHandler}
                        />
                        <label htmlFor="alcholic">Alcoholic:</label>
                        <input type="checkbox" id="alcoholic" role="switch"
                            checked={alcoholic}
                            onChange={changeAlcoholicHandler} />
                    </details>
                    <details>
                        <summary style={{ marginBottom: "8px" }}>Ingredients:</summary>
                        {recipe.map((item: RecipeIgredient, index: number) => (
                            <div key={index} style={{ display: 'flex', alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        flexBasis: "20%",
                                    }}
                                >
                                    <label htmlFor={`item ${index} qty`}>Qty:</label>
                                    <input
                                        id={`item ${index} qty`}
                                        type="text"
                                        name="qty"
                                        value={recipe[index].qty}
                                        onChange={(e) => inputIngredientHandler(e, index, "qty")}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        flexBasis: "60%",
                                    }}
                                >
                                    <label htmlFor={`item ${index} name`}>Name:</label>
                                    <input
                                        id={`item ${index} name`}
                                        type="text"
                                        name="ingredient"
                                        value={recipe[index].ingredient}
                                        onChange={(e) => inputIngredientHandler(e, index, "ingredient")}
                                    />
                                </div>
                                <button type="button" style={{ flexBasis: "10%", maxHeight: "48px", aspectRatio: "1/1" }}
                                    onClick={() => removeIngredientHandler(index)}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addIngredientHandler}>Add Ingredient</button>
                    </details>
                    <details>
                        <summary style={{ marginBottom: "8px" }}>Preparation:</summary>
                        <label htmlFor="glass">Glass:</label>
                        <input type="text" id="glass"
                            value={glass}
                            onChange={inputGlassHandler}
                        />
                        <label htmlFor="method">Method:</label>
                        <input type="textarea" id="method"
                            value={method}
                            onChange={inputMethodHandler}
                        />
                        <label htmlFor="garnish">Garnish:</label>
                        <input type="text" id="garnish"
                            value={garnish}
                            onChange={inputGarnishHandler}
                        />
                    </details>
                    <details >
                        <summary style={{ marginBottom: "8px" }}>Variants:</summary>
                        {variants.map((item: string, index: number) => (
                            <div key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: "flex-end",
                                    justifyContent: "space-between"
                                }}
                            >
                                <input type="text" value={variants[index]}
                                    style={{ maxWidth: "80%" }}
                                    onChange={(e) => inputVariantHandler(e, index)} />

                                <button type="button" style={{ flexBasis: "10%", maxHeight: "48px", aspectRatio: "1/1" }}
                                    onClick={() => removeVariantHandler(index)}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>

                            </div>
                        ))}
                        <button type="button" onClick={addVariantHandler}>Add Variant</button>
                    </details>
                    <details>
                        <summary style={{ marginBottom: "8px" }}>Extra:</summary>

                        <label htmlFor="history">History:</label>
                        <input type="text" id="history"
                            value={history}
                            onChange={inputHistoryHandler}
                        />

                        <label htmlFor="imgUrl">Image Url:</label>
                        <input type="text" id="imgUrl"
                            value={img}
                            onChange={inputImgHandler}
                        />
                    </details>
                    <button type='submit'>Done</button>
                </form>
            </div>
        </>
    )
}

export default EditCocktailDetails