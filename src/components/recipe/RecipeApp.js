import React, {useEffect, useState} from "react";
import Recipe from './Recipe';
import './RecipeApp.css';
import Navbar from "../navbar";
import Axios from 'axios';
import style from './recipe.module.css';
import {AiOutlinePlus} from 'react-icons/ai';
import {bounce} from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import reactCSS from "reactcss";


const RecipeApp = () => {
    const APP_ID = "4aa63c35"
    const APP_KEY = "fd775e6c1f3740a4d991b4a531137721"

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');
    const [yourRecipes, setYourRecipes] = useState([]);
    const [dontUpdate, setDontUpdate] = useState(false);

    useEffect(() => {
        getRecipes();
    }, [query]);

    useEffect(() => {
        handleRequest1();
    });

    const handleRequest1 = () => {
        Axios.post(`http://127.0.0.1:8000/recipe/show`,
            {"username": `${localStorage.getItem('username')}`})
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                const res = response.data[0];
                if (!dontUpdate) {
                    updateYourRecipe(res);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    //modify here to access recipes in mongoDB
    const getRecipes = async () => {
        Axios.post(`http://127.0.0.1:8080/recipe/search`, {"name": query})
            .then(response => {
                console.log(response)
                console.log(response.status + " " + response.statusText)
                const res = response.data;
                updateRecipe(res);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const updateRecipe = (recipes) => {
        setRecipes(recipes);
    }

    const updateYourRecipe = (recipes) => {
        setYourRecipes(recipes);
        setDontUpdate(true);
    }

    const updateSearch = e => {
        setSearch(e.target.value);
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    const getMyRecipe = (name) => {
        setSearch(name);
        setQuery(search);
        setSearch('');
    }

    const styles = reactCSS({
        'default': {
            bounce: {
                animation: 'x 10s',
                animationName: Radium.keyframes(bounce, 'bounce')
            }
        },
    })

    return (

        <div>
            <Navbar name="recipe"/>

            <div className="RecipeApp">
                <form onSubmit={getSearch} className="search-form">
                    <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                    <button className="search-button" type="submit">
                        Search
                    </button>
                </form>

                <div className={"recipes"}>
                    {yourRecipes.map((recipe, i) => (
                        <div key={i} className={style.recipe}>
                            <ol>
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>{recipe.recipe_name}</th>
                                    </tr>
                                    </tbody>
                                    <AiOutlinePlus/>
                                </table>
                            </ol>
                        </div>
                    ))}
                </div>

                <StyleRoot>
                    <div className={"recipes ani"}>
                        {recipes.map((recipe, i) => (
                            <Recipe
                                key={i}
                                title={query}
                                ingredients={recipe}

                            />
                        ))}
                    </div>
                </StyleRoot>
            </div>
        </div>
    )
}

export default RecipeApp;
