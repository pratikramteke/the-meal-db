import { useState } from "react";
import {} from "./app.css";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [recipieData, setRecipieData] = useState({});
  let i = 1;
  async function searchRecipie(value) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    // let response = await fetch(
    //   `https://www.themealdb.com/api/json/v1/1/random.php`
    // );
    // let response = await fetch(
    //   `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`
    // );
    let data = await response.json();
    setRecipieData(data.meals[0]);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Recipie"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => searchRecipie(inputValue)}>Search</button>
      <br />
      <img src={recipieData.strMealThumb} width="200px" alt="" />
      <h1>{recipieData.strMeal}</h1>
      <h3>{recipieData.strCategory}</h3>
      <h3>{recipieData.strArea}</h3>
      {Object.entries(recipieData).map(([key, value]) => {
        if (key.includes("Ingredient"))
          return <>{value === "" ? "" : <li>{value}</li>}</>;
        if (key.includes("Measure"))
          return <>{value === "" || value === " " ? "" : <li>{value}</li>}</>;
      })}
      <p>{recipieData.strInstructions}</p>
    </div>
  );
}

export default App;
