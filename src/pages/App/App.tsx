import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import HomePage from "../HomePage/HomePage"
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserAccountPage from '../UserAccountPage/UserAccountPage';
import MyRecipesPage from '../MyRecipesPage/MyRecipesPage';
import CreateRecipePage from '../CreateRecipePage/CreateRecipePage';
import BookmarksPage from '../BookmarksPage/BookmarksPage';
import RecipeDetailsPage from '../RecipeDetails/RecipeDetailsPage';
import { SetUserType, UserState, } from '../../utilities/type-declaration';
import SearchBar from '../../components/SearchBar/SearchBar';
import CuisinePage from '../CuisinePage/CuisinePage';
import UpdateRecipePage from '../UpdateRecipePage/UpdateRecipePage';
import MostViewsPage from '../MostViews/MostViewsPage';
import BestRatingsPage from '../BestRatings/BestRatingsPage';
import LatestRecipesPage from '../LatestRecipes/LatestRecipesPage';



const App = () => {

const [user, setUser] = useState<UserState>(getUser())

  return (
    <main>
      <NavBar user={user} setUser={setUser as SetUserType} />
      <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/users/login" element={<LoginPage setUser={setUser as SetUserType} />}></Route>
      <Route path="/users/register" element={<RegisterPage setUser={setUser as SetUserType} />}></Route>
      <Route path="/users/account" element={<UserAccountPage user={user} />}></Route>
      <Route path="/users/account/myrecipes" element={<MyRecipesPage user={user} />}></Route>
      <Route path="/users/account/createrecipe" element={<CreateRecipePage user={user} />}></Route>
      <Route path="/users/account/bookmarks" element={<BookmarksPage user={user} />}></Route>
      <Route path="/recipes/mostviews" element={<MostViewsPage/>}></Route>
      <Route path="/recipes/bestratings" element={<BestRatingsPage/>}></Route>
      <Route path="/recipes/latestrecipes" element={<LatestRecipesPage/>}></Route>
      <Route path="/recipes/:id" element={<RecipeDetailsPage user={user} />}></Route>
      <Route path="/recipes/:id/update" element={<UpdateRecipePage user={user} />}></Route>
      <Route path='/recipes/cuisines/:cuisine' element={<CuisinePage />}></Route>
      <Route path="/search" element={<SearchBar />}></Route>
      </Routes>
    </main>
  )
}

export default App
