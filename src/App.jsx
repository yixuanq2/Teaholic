import React from 'react';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/profile/Profile';
import Edit from './components/Edit';
import Ingredient from './components/Ingredient';
import Calculator from './components/Calculator';
import Menu from './components/menu/Menu';
import RecipeApp from './components/recipe/RecipeApp';
import AddRecipe from './components/addRecipe';
import OnlineRecipe from './components/onlineRecipe/OnlineRecipe';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/edit" component={Edit}/>
                <Route path="/ingredient" component={Ingredient}/>
                <Route path="/calculator" component={Calculator}/>
                <Route path="/menu" component={Menu}/>
                <Route path="/recipe" component={RecipeApp}/>
                <Route path="/add" component={AddRecipe}/>
                <Route path="/search" component={OnlineRecipe}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;