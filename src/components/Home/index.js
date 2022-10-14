import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Home = ({ companies, searchData, deleteDetail }) => {

  const dispatch = useDispatch();

  const [detail, setdetail] = useState(companies);
  const [order, setorder] = useState("ASC");

  useEffect(() => {
    if (searchData.length > 0) {
      setdetail(searchData);
    }
  }, [searchData]);

  useEffect(() => {
    setdetail(companies);
  }, [companies]);

  const sorting = (col) => {
    if (order === "ASC") {
      dispatch({ type: "SORT_ASC", payload: col });
      setorder("DSC")
    } else {
      dispatch({ type: "SORT_DESC", payload: col });
      setorder("ASC")
    }
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th onClick={() => sorting("id")}>Id</th>
                <th onClick={() => sorting("company")}>Company</th>
                <th onClick={() => sorting("office")}>Office</th>
                <th onClick={() => sorting("employees")}>Employees</th>
                <th onClick={() => sorting("international")}>International</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {detail.length > 0 ? (
                detail.map((element) => (
                  <tr key={element.company}>
                    <td>{element.id}</td>
                    <td>{element.company}</td>
                    <td>{element.office}</td>
                    <td>{element.employees}</td>
                    <td>{element.international}</td>
                    <td>
                      <Link
                        to={`/edit/${element.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteDetail(element.id)}
                        className="btn btn-sm btn-danger" style={{ marginLeft: "10px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No companies found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto">
          Add Detail
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  companies: state.company,
  searchData: state.filters.search
});

const mapDispatchToProps = (dispatch) => ({
  deleteDetail: (id) => {
    dispatch({ type: "DELETE_DETAIL", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)