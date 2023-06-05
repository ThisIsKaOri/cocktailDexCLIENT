import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';

import User from './pages/User';
import Register from './components/Auth/Register';
import LogIn from './components/Auth/LogIn';

import Cocktails from './pages/Cocktails';
import CocktailDetails from './pages/CocktailDetails';
import CocktailEdit from './pages/CocktailEdit';
import CocktailAdd from './pages/CocktailAdd';

import Ingredients from './pages/Ingredients';
import IngredientDetails from './pages/IngredientDetails';
import IngredientEdit from './pages/IngredientEdit';
import IngredientAdd from './pages/IngredientAdd';

import { AuthProvider } from './context/AuthProvider';





function App() {

  return (
    //AuthContext é disponibile in tutta l'app tramite il suo provider
    <AuthProvider>
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/user" element={<User />} />
            <Route path="/user/login" element={<LogIn />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/home" index element={<Home />} />
            <Route path="/cocktails" element={<Cocktails />}></Route>
            <Route path="/cocktails/:cocktailName" element={<CocktailDetails />} />
            <Route path="/cocktails/edit/:cocktailName" element={<CocktailEdit />} />
            <Route path="/cocktails/add" element={<CocktailAdd />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredients/:ingredientName" element={<IngredientDetails />} />
            <Route path="/ingredients/edit/:ingredientName" element={<IngredientEdit />} />
            <Route path="/ingredients/add" element={<IngredientAdd />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
