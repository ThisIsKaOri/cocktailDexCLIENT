import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Cocktails } from './pages/Cocktails';
import { CocktailDetails } from './pages/CocktailDetails';
import { Ingredients } from './pages/Ingredients';
import { IngredientDetails } from './pages/IngredientDetails';
import LogIn from './components/Auth/LogIn';
import Register from './components/Auth/Register';
import User from './pages/User';
import { AuthProvider } from './context/AuthProvider';
import EditCocktailDetails from './pages/EditCocktailDetails';





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
            <Route path="/cocktails/edit/:cocktailName" element={<EditCocktailDetails />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredients/:ingredientName" element={<IngredientDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
