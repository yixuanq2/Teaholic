import React, {useEffect, useState} from "react";
import Recipe from './Recipe';
import './OnlineRecipe.css';
import Navbar from "../navbar";
import {slideInUp} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const OnlineRecipe = () => {
    const styles = {
        slideInUp: {
            animation: 'x 1.3s',
            animationName: Radium.keyframes(slideInUp, 'slideInUp')
        }
    }
    const APP_ID = "4aa63c35"
    const APP_KEY = "fd775e6c1f3740a4d991b4a531137721"

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('chicken');

    useEffect(() => {
        getRecipes();
    }, [query]);

    //modify here to access recipes in mongoDB
    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits);
    }

    const updateSearch = e => {
        setSearch(e.target.value);
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return (
        <div>
            <Navbar name="recipe online"/>
            <div className="OnlineRecipeApp">
                <form onSubmit={getSearch} className="search-form">
                    <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder={'type in keywords here, like "milk"'} />
                    <button className="search-button" type="submit">
                        Search
                    </button>
                </form>
                <StyleRoot>
                    <div className={"recipes"} style={styles.slideInUp}>
                        {recipes.map(recipe => (
                            <Recipe
                                key={recipe.recipe.label}
                                title={recipe.recipe.label}
                                calories={recipe.recipe.calories}
                                image={recipe.recipe.image}
                                ingredients={recipe.recipe.ingredients}

                            /> // modify here
                        ))}
                    </div>
                </StyleRoot>


            </div>
        </div>
    )
}

export default OnlineRecipe;
