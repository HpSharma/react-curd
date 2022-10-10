import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditDetail = ({ companies, updateDetail }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentDetail = companies.find(
    (detail) => detail.id === parseInt(id)
  );

  useEffect(() => {
    setCompany(currentDetail.company);
    setOffice(currentDetail.office);
    setEmployees(currentDetail.employees);
    setInternational(currentDetail.international);
  }, [currentDetail]);

  const [company, setCompany] = useState("");
  const [office, setOffice] = useState("");
  const [employees, setEmployees] = useState("");
  const [international, setInternational] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkDetailCompanyExists = companies.filter((detail) =>
      detail.company === company && detail.id !== currentDetail.id
        ? detail
        : null
    );

    if (!company || !office || !employees || !international) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkDetailCompanyExists.length > 0) {
      return toast.error("This company already exists!!");
    }

    const data = {
      id: currentDetail.id,
      company,
      office,
      employees,
      international,
    };

    updateDetail(data);
    toast.success("companies updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentDetail ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-group" style={{ margin: '10px 0px' }}>
                  <input
                    className="form-control"
                    value={company}
                    placeholder={"Company Name"}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <input
                  className="form-control"
                  value={office}
                  placeholder={"Office Name"}
                  onChange={(e) => setOffice(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: '10px 0px' }}>
                <input
                  className="form-control"
                  value={employees}
                  placeholder={"Employees Number"}
                  onChange={(e) => setEmployees(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: '10px 0px' }}>
                <input
                  className="form-control"
                  value={international}
                  placeholder={"True/False"}
                  onChange={(e) => setInternational(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update companies
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Detail Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  companies: state.company,
});
const mapDispatchToProps = (dispatch) => ({
  updateDetail: (data) => {
    dispatch({ type: "UPDATE_DETAIL", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDetail);