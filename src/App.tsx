import React from "react";
import "./App.scss";
import { Header } from "./components/Header";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Main } from "./components/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
