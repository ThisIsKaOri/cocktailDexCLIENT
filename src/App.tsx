import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Cocktails } from './pages/Cocktails';
import { CocktailDetails } from './components/Cocktails/CocktailDetails';
import { Ingredients } from './pages/Ingredients';
import { IngredientDetails } from './components/Ingredients/IngredientDetails';





function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/home" index element={<Home/>}/>
            <Route path="/cocktails" element={<Cocktails/>}/>
            <Route path="/cocktails/:cocktailName" element={<CocktailDetails/>}/>
            <Route path="/ingredients" element={<Ingredients/>}/>
            <Route path="/ingredients/:ingredientName" element={<IngredientDetails/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
