import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';

import User from './pages/User';
import Register from './components/Auth/Register';
import LogIn from './components/Auth/LogIn';

import Favorites from './pages/Favorites';

import Cocktails from './pages/Cocktails';
import CocktailDetails from './pages/CocktailDetails';
import CocktailEdit from './pages/CocktailEdit';
import CocktailAdd from './pages/CocktailAdd';

import Ingredients from './pages/Ingredients';
import IngredientDetails from './pages/IngredientDetails';
import IngredientEdit from './pages/IngredientEdit';
import IngredientAdd from './pages/IngredientAdd';

import { AuthProvider } from './context/AuthProvider';
import EditReducer from './pages/EditReducer';





function App() {

  return (
    //AuthContext é disponibile in tutta l'app tramite il suo provider
    <AuthProvider>
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" index element={<User />} />
            <Route path="/user/login" element={<LogIn />} />
            <Route path="/user/register" element={<Register />} />
            {/* <Route path="/favorites" index element={<Favorites />} /> */}
            <Route path="/cocktails" element={<Cocktails />}></Route>
            <Route path="/cocktails/:cocktailName" element={<CocktailDetails />} />
            {/* <Route path="/cocktails/edit/:cocktailName" element={<CocktailEdit />} /> */}
            <Route path="/cocktails/edit/:cocktailName" index element={<EditReducer />} />
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
