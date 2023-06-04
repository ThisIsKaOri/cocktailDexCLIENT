import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeIgredient } from '../models/Cocktail';
import useAuth, { AuthData } from '../hooks/useAuth';

const baseUrl = 'http://localhost:3000/v1/cocktails';


const EditCocktailDetails = () => {

    const { user: { token } } = useAuth() as AuthData;

    let params = useParams();
    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [cocktail, setCocktail] = useState({

        name: " ",
        alcoholic: false,
        ibaFamily: " ",
        recipe: [{ ingredient: "", qty: "" }],
        glass: " ",
        method: " ",
        garnish: " ",
        history: " ",
        variants: ['...'],
        img: " "
    });
    //faccio uno state a parte per evitare di renderizzare tutto il componente
    const [name, setName] = useState(cocktail.name);
    const [ibaFamily, setIbaFamily] = useState(cocktail.ibaFamily);
    const [alcoholic, setAlcoholic] = useState(cocktail.alcoholic);
    const [recipe, setRecipe] = useState([...cocktail.recipe]);
    const [glass, setGlass] = useState(cocktail.glass);
    const [method, setMethod] = useState(cocktail.method);
    const [garnish, setGarnish] = useState(cocktail.garnish);
    const [history, setHistory] = useState(cocktail.history);
    const [variants, setVariants] = useState([...cocktail.variants]);
    const [img, setImg] = useState(cocktail.img);


    useEffect(() => {

        let url = `${baseUrl}?name=${params.cocktailName}`;

        axios.get(`${url}`)
            .then(({ data }) => {
                setCocktail(data[0]);
            })
            .catch(error => {

                console.error(error);
            });
    }, []);

    useEffect(() => {

        setName(cocktail.name);
        setIbaFamily(cocktail.ibaFamily);
        setAlcoholic(cocktail.alcoholic);
        setRecipe([...cocktail.recipe]);
        setGlass(cocktail.glass);
        setMethod(cocktail.method);
        setGarnish(cocktail.garnish);
        setHistory(cocktail.history);
        setVariants([...cocktail.variants]);
        setImg(cocktail.img);
    }, [cocktail]);



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

    const submitHandler = (event: React.SyntheticEvent) => {

        event.preventDefault()

        const moddedCocktail = {

            name: name.trim(),
            alcoholic: alcoholic,
            ibaFamily: ibaFamily.trim(),
            recipe: [...recipe],
            glass: glass.trim(),
            method: method.trim(),
            garnish: garnish.trim(),
            history: history.trim(),
            variants: [variants],
            img: img.trim()
        };



        axios.put(`${baseUrl}/${params.cocktailName}`, moddedCocktail, {
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
            {success ? (
                <div className="container">
                    <h1 style={{ margin: "32px 0" }}>Cocktail updated!</h1>
                    <button onClick={() => navigate(-1)}>Done</button>
                </div>
            ) : (
                <>
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
            )}
        </>
    )
}

export default EditCocktailDetails