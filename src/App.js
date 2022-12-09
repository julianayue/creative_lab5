import React, { useState } from "react";
import Axios from "axios";
import './App.css';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "d8bcf957";
const APP_KEY = "1d4e6c3c26b94f458b9e608b477945dc";

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <div className="IngredientsContainer">
      <Dialog
        onClose={() => console.log("Container Closed")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        
        <DialogContent>
        <DialogTitle>Ingredients</DialogTitle>
          <div className="RecipeName">{label}</div>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{Math.round(ingredient.weight )} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <div className="SeeNewTab" onClick={() => window.open(url)}>See Instructions</div>
          <div className="SeeMoreText" onClick={() => setShow("")}>Close</div>
        </DialogActions>
      </Dialog>
      <div className="RecipeName">{label}</div>
      <div className="ItemImage"><img src={image} alt={label}/></div> 
      <div className="IngredientsText" onClick={() => setShow(!show)}>
        INGREDIENTS
      </div>
      <div className="SeeMoreText" onClick={() => window.open(url)}>
        RECIPE
      </div>
    </div>
  );
};

function AppComponent() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="AppLogo">
        <div className="RecipeImage"><img src="./images/pineapple.svg" alt=""/></div>
          <h4>Recipes Land</h4>
        </div>
        <div className="SearchBox">
          <div className="SearchIcon"><img src='./images/search.svg' alt=""/></div>
          <textarea className="SearchInput"
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div className="RecipeItemContainer">
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <div className="Placeholder">
              <div className="item">
                <img src="./images/salad.svg" alt=""/>
                <h2>Appetizers</h2>
              </div>
              <div className="item">
                <img src="./images/bbq.svg" alt=""/>
                <h2>Meals</h2>
              </div>
              <div className="item">
                <img src="./images/cake.svg" alt=""/>
                <h2>Desserts</h2>
              </div>
          </div>
        )}
      </div>
      <div className= 'footer'>
          <a href="https://github.com/julianayue/creative_lab5">Link to Github Repository</a>
          <br/>
          <h6>Site by Juliana Yue and Claire Chen</h6>
        </div>
    </div>
  );
};

export default AppComponent;