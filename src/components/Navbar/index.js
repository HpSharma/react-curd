import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import './navbar.css';
import { useSelector, useDispatch } from "react-redux";


const Navbar = () => {
  const companies = useSelector(state => state.company);
  const filters = useSelector(state => state.filters.search);

  console.log(filters);
  const dispatch = useDispatch();

  const [term, setTerm] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({type: "COMPANY_FILTER", payload: companies.filter((element) => {
      return element.company.toLowerCase().includes(term.toLowerCase());
    })});
    return;
  }
  return (
    <div className="col-md-12 bg-dark py-2">
      <nav className="navbar bg-dark navbar-dark">
        <Link to={"/"} className="navbar-brand ml-5">
          React Redux Task
        </Link>
        <div className="search-bar">
          <form onSubmit={submitHandler}>
            <input type="text" value={term} placeholder="Search here.." onChange={(e) => setTerm(e.target.value)} />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;