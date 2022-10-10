import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddPost from "./components/AddDetails";
import EditDetail from "./components/EditDetails";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/add" component={() => <AddPost />} />
      <Route exact path="/edit/:id" component={() => <EditDetail />} />
    </div>
  );
};

export default App;