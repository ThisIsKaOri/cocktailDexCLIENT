import axios from 'axios';
import { ChangeEvent, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CocktailType, RecipeIgredient } from '../models/Cocktail';
import useAuth, { AuthData } from '../hooks/useAuth';
import cocktailReducer from '../utils/cocktailReducer';
import { useCocktail } from '../hooks/useCocktail';


const api = {

    cocktails: 'http://localhost:3000/v1/cocktails'
}


const EditReducer = () => {

    const { user: { token } } = useAuth() as AuthData;

    let params = useParams();
    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);

    let url = `${api.cocktails}?name=${params.cocktailName}`;

    const [cocktail, dispatchCocktail] = useCocktail(url);


    const simpleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        dispatchCocktail({ type: `update_${name}` as any, payload: value })
    };

    const complexInputHandler = (event: ChangeEvent<HTMLInputElement>, index: number) => {

        const { name, value } = event.target;
        dispatchCocktail({ type: `update_${name}` as any, index: index, payload: value })
    }

    const alcoholicInputHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {

        const bool = value === 'true' ? false : true;
        dispatchCocktail({ type: 'update_alcoholic', payload: bool });
    };

    const submitHandler = (event: React.SyntheticEvent) => {

        event.preventDefault()

        const moddedCocktail = {

            name: cocktail.name.trim(),
            alcoholic: Boolean(cocktail.alcoholic),
            ibaFamily: cocktail.ibaFamily,
            recipe: [...cocktail.recipe],
            glass: cocktail.glass,
            method: cocktail.method,
            garnish: cocktail.garnish,
            history: cocktail.history,
            variants: [...cocktail.variants],
            img: cocktail.img
        };

        axios.put(`${api.cocktails}/${params.cocktailName}`, moddedCocktail, {
            headers: {
                authorization: token
            }
        })
            .then(response => {

                console.log(response);
                setSuccess(true);
            })
            .catch(error => {

                console.log(error);
                if (error.status === 404) {

                    setServerMsg("Something went wrong..");
                } else if (error.status === 401) {

                    setServerMsg("User not validated..");
                } else {
                    console.log(error);
                    setServerMsg(String(error))
                }
            });
    }


    return (
        <>
            <dialog open={success ? true : false}>
                <article style={{ width: "90%" }}>
                    <h3>Cocktail Updated!</h3>
                    <p>{serverMsg}</p>
                    <footer>
                        <button className="secondary"
                            onClick={() => {
                                navigate(-1);
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
                <h1 style={{ margin: "32px 0" }}>Edit Cocktail</h1>

                <form onSubmit={submitHandler} style={{ marginBottom: '70px' }} >
                    <details open style={{ marginTop: '70px' }}>
                        <summary style={{ marginBottom: "8px" }}>General:</summary>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name"
                            value={cocktail.name}
                            name="name"
                            onChange={(e) => simpleInputHandler(e)}
                        />
                        <label htmlFor="ibaFamily">Iba Family:</label>
                        <input type="text" id="ibaFamily"
                            value={cocktail.ibaFamily}
                            name="ibaFamily"
                            onChange={(e) => simpleInputHandler(e)}
                        />
                        <label htmlFor="alcholic">Alcoholic:</label>
                        <input type="checkbox" id="alcoholic" role="switch"
                            checked={cocktail.alcoholic}
                            value={cocktail.alcoholic}
                            name="alcoholic"
                            onChange={(e) => alcoholicInputHandler(e)}
                        />
                    </details>
                    <details>
                        <summary style={{ marginBottom: "8px" }}>Ingredients:</summary>
                        {cocktail.recipe.map((item: RecipeIgredient, index: number) => (
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
                                        value={cocktail.recipe[index].qty}
                                        onChange={(e) => complexInputHandler(e, index)}
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
                                        value={cocktail.recipe[index].ingredient}
                                        onChange={(e) => complexInputHandler(e, index)}
                                    />
                                </div>
                                <button type="button" style={{ flexBasis: "10%", maxHeight: "48px", aspectRatio: "1/1" }}
                                    onClick={() => dispatchCocktail({ type: 'remove_ingredient', index: index })}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        ))}
                        <button type="button"
                            onClick={() => dispatchCocktail({ type: 'add_ingredient' })}
                        >Add Ingredient</button>
                    </details>
                    <details>
                        <summary style={{ marginBottom: "8px" }}>Preparation:</summary>
                        <label htmlFor="glass">Glass:</label>
                        <input type="text" id="glass"
                            value={cocktail.glass}
                            name='glass'
                            onChange={(e) => simpleInputHandler(e)}
                        />
                        <label htmlFor="method">Method:</label>
                        <input type="textarea" id="method"
                            value={cocktail.method}
                            name='method'
                            onChange={(e) => simpleInputHandler(e)}
                        />
                        <label htmlFor="garnish">Garnish:</label>
                        <input type="text" id="garnish"
                            value={cocktail.garnish}
                            name='garnish'
                            onChange={(e) => simpleInputHandler(e)}
                        />
                    </details>
                    <details >
                        <summary style={{ marginBottom: "8px" }}>Variants:</summary>
                        {cocktail.variants.map((item: string, index: number) => (
                            <div key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: "flex-end",
                                    justifyContent: "space-between"
                                }}>
                                <input type="text" name='variant'style={{ maxWidth: "80%" }}
                                    value={cocktail.variants[index]}
                                    onChange={(e) => complexInputHandler(e, index)}
                                />
                                <button type="button" style={{ flexBasis: "10%", maxHeight: "48px", aspectRatio: "1/1" }}
                                    onClick={() => dispatchCocktail({ type: 'remove_variant', index: index })}
                                ><i className="bi bi-x-lg"></i></button>
                            </div>
                        ))}
                        <button type="button"
                            onClick={() => dispatchCocktail({ type: 'add_variant' })}
                        >Add Variant</button>
                    </details>
                    <details>
                        <summary style={{ marginBottom: "8px" }}>Extra:</summary>
                        <label htmlFor="history">History:</label>
                        <input type="text" id="history" name='history'
                            value={cocktail.history}
                            onChange={(e) => simpleInputHandler(e)}
                        />
                        <label htmlFor="imgUrl">Image Url:</label>
                        <input type="text" id="imgUrl" name='img' 
                            value={cocktail.img} 
                            onChange={(e) => simpleInputHandler(e)}
                        />
                    </details>
                    <button type='submit'>Done</button>
                </form>
            </div>
        </>
    )
}

export default EditReducer