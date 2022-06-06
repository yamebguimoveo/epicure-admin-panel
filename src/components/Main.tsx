import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getChefsThunk } from "../store/slices/chefSlice";
import { getRestaurantsThunk } from "../store/slices/restaurantSlice";
import { Items } from "./Items";
import { Login } from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { RestaurantsPage } from "./RestaurantsPage";
import { Signup } from "./Signup";

export const Main = () => {
  const restaurantsState = useAppSelector((state) => state.restaurants);
  const dispatch = useAppDispatch();
  useAppSelector((state) => state);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(getRestaurantsThunk());
      dispatch(getChefsThunk());
    }
  }, []);

  return (
    <main>
      <Routes>
        <Route path='/' element={<h1>home</h1>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/chefs' element={<Login />}></Route>
        <Route
          path='/restaurants'
          element={
            <ProtectedRoute>
              <RestaurantsPage
                items={restaurantsState.restaurants}
                status={restaurantsState.status}
              />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='/dishes' element={<Login />}></Route>
        <Route path='*' element={<Navigate to='/' replace />}></Route>
      </Routes>
    </main>
  );
};
