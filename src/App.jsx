import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/utils/_define.scss";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { persistor, store } from "./store";
import { Provider } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faStar,
  faImage,
  faAngleLeft,
  faAngleRight,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import AddRecipe from "./pages/AddRecipe";
import ListRecipe from "./pages/ListRecipe";
import Register from "./pages/Register";

library.add(
  faMagnifyingGlass,
  faStar,
  faImage,
  faAngleLeft,
  faAngleRight,
  faSliders
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="recipe" element={<ListRecipe />} />
        <Route path="detail/:any" element={<Detail />} />
        <Route path="recipe/add" element={<AddRecipe />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

function App() {
  axios.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("token")) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
