import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth, { AuthData } from '../hooks/useAuth';

const baseUrl = 'http://localhost:3000/v1/ingredients';


const IngredientEdit = () => {

    const { user: { token } } = useAuth() as AuthData;

    let params = useParams();
    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const [ingredient, setIngredient] = useState({

        _id: " ",
        name: " ",
        strength: " ",
        replacements: [''],
        description: " ",
        cocktails: [''],
        img: " ",
    });

    

    //faccio uno state a parte per evitare di renderizzare tutto il componente
    const [name, setName] = useState(ingredient.name);
    const [strength, setStrength] = useState(ingredient.strength);
    const [replacements, setReplacements] = useState([...ingredient.replacements]);
    const [description, setDescription] = useState(ingredient.description);
    const [cocktails, setCocktails] = useState([...ingredient.cocktails]);
    const [img, setImg] = useState(ingredient.img);


    useEffect(() => {

        let url = `${baseUrl}?name=${params.ingredientName}`;

        axios.get(`${url}`)
            .then(({ data }) => {

                setIngredient(data[0]);
            })
            .catch(error => {

                console.error(error);
            });
    }, []);

    useEffect(() => {

        setName(ingredient.name);
        setStrength(ingredient.strength);
        setReplacements([...ingredient.replacements]);
        setDescription(ingredient.description);
        setCocktails([...ingredient.cocktails]);
        setImg(ingredient.img);
    }, [ingredient]);



    const inputNameHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setName(event.target.value);
    };

    const inputStrengthHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setStrength(event.target.value);
    };

    const removeReplacementHandler = (index: number) => {

        const updatedReplacements = [...replacements];
        updatedReplacements.splice(index, 1);
        setReplacements(updatedReplacements);
    };

    const addReplacementHandler = () => {

        const updatedReplacements = [...replacements];
        updatedReplacements.push('');
        setReplacements(updatedReplacements);
    };

    const inputReplacementHandler = ( event : 
        ChangeEvent<HTMLInputElement>, index: number) => {

        const updatedReplacements = [...replacements];
        updatedReplacements[index] = event.target.value;
        setReplacements(updatedReplacements);
    }

    const inputDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setDescription(event.target.value);
    };

    const removeCocktailHandler = (index: number) => {

        const updatedCocktails = [...cocktails];
        updatedCocktails.splice(index, 1);
        setCocktails(updatedCocktails);
    };

    const addCocktailHandler = () => {

        const updatedCocktails = [...cocktails];
        updatedCocktails.push('');
        setCocktails(updatedCocktails);
    };

    const inputCocktailHandler = ( event : 
        ChangeEvent<HTMLInputElement>, index: number) => {

        const updatedCocktails = [...cocktails];
        updatedCocktails[index] = event.target.value;
        setCocktails(updatedCocktails);
    }

    const inputImgHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setImg(event.target.value);
    };

    const submitHandler = (event: React.SyntheticEvent) => {

        event.preventDefault()

        const moddedIngredient = {

            name: name.trim(),
            strength: strength,
            replacements: [...replacements],
            description: description,
            cocktails: [...cocktails],
            img: img,
        };



        axios.put(`${baseUrl}/${params.ingredientName}`, moddedIngredient, {
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
                    <h3>Ingredient Updated!</h3>
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

                <h1 style={{ margin: "32px 0" }}>Edit Ingredient</h1>

                <form onSubmit={submitHandler} style={{ marginBottom: '70px' }} >
                    <details open style={{ marginTop: '70px' }}>
                        <summary style={{ marginBottom: "8px" }}>General:</summary>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name"
                            value={name}
                            onChange={inputNameHandler}
                        />
                        <label htmlFor="ibaFamily">Strength:</label>
                        <input type="text" id="ibaFamily"
                            value={strength}
                            onChange={inputStrengthHandler}
                        />
                    </details>
                    
                    <details >
                        <summary style={{ marginBottom: "8px" }}>Replacements:</summary>
                        {replacements.map((item: string, index: number) => (
                            <div key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: "flex-end",
                                    justifyContent: "space-between"
                                }}
                            >
                                <input type="text" value={replacements[index]}
                                    style={{ maxWidth: "80%" }}
                                    onChange={(e) => inputReplacementHandler(e, index)} />

                                <button type="button" style={{ flexBasis: "10%", maxHeight: "48px", aspectRatio: "1/1" }}
                                    onClick={() => removeReplacementHandler(index)}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>

                            </div>
                        ))}
                        <button type="button" onClick={addReplacementHandler}>Add Replacement</button>
                    </details>
                    <details >
                        <summary style={{ marginBottom: "8px" }}>cocktails:</summary>
                        {cocktails.map((item: string, index: number) => (
                            <div key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: "flex-end",
                                    justifyContent: "space-between"
                                }}
                            >
                                <input type="text" value={cocktails[index]}
                                    style={{ maxWidth: "80%" }}
                                    onChange={(e) => inputCocktailHandler(e, index)} />

                                <button type="button" style={{ flexBasis: "10%", maxHeight: "48px", aspectRatio: "1/1" }}
                                    onClick={() => removeCocktailHandler(index)}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>

                            </div>
                        ))}
                        <button type="button" onClick={addCocktailHandler}>Add Cocktail</button>
                    </details>
                    <details>
                        <summary style={{ marginBottom: "8px" }}>Extra:</summary>

                        <label htmlFor="history">Description:</label>
                        <input type="text" id="history"
                            value={description}
                            onChange={inputDescriptionHandler}
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

export default IngredientEdit