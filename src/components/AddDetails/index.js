

import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ companies, addDetail }) => {
  

  const [company, setCompany] = useState("");
  const [office, setOffice] = useState("");
  const [employees, setEmployees] = useState("");
  const [international, setInternational] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkDetailsCompanyExists = companies.filter((detail) =>
      detail.company === company ? detail : null
    );

    if (!company || !office || !employees || !international) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkDetailsCompanyExists.length > 0) {
      return toast.error("This company already exists!!");
    }

    const data = {
      id: companies.length > 0 ? companies[companies.length - 1].id + 1 : 0,
      company,
      office,
      employees,
      international,
    };

    addDetail(data);
    toast.success("Company added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Details</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{marginTop: "10px"}}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Office Address"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                style={{marginTop: "10px"}}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="employees"
                placeholder="Employees Number"
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                style={{marginTop: "10px"}}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="International(True/False)"
                value={international}
                onChange={(e) => setInternational(e.target.value)}
                style={{marginTop: "10px"}}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Company" style={{marginTop: "10px"}}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  companies: state.company,
});
const mapDispatchToProps = (dispatch) => ({
  addDetail: (data) => {
    dispatch({ type: "ADD_DETAIL", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);