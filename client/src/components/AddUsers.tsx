import React, { ChangeEvent, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../context/AppContext";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let initialState = {
  name: "",
  email: "",
  department: "",
  designation: "",
  gender: "",
  city: "",
  Title: "",
  phone: 0,
};

function AddUsers() {
  const [form, setForm] = useState(initialState);
  const context = useContext(UsersContext);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<any>): void => {
    const { name: key, value } = e.target;
    setForm({ ...form, [key]: value, Title: "user" });
  };

  //Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name) {
      context?.setIsLoading(true);
      try {
        let addedUser = await axios.post(
          `http://localhost:8081/users/adduser`,
          form
        );
        context?.getAllUsers();
        toast.success("User added successfully!", {
          autoClose: 1000,
          onClose: () => {
            navigate(`/user/${addedUser.data.data.Id}`);
            context?.setIsLoading(false);
          },
        });
      } catch (e) {
        context?.setIsLoading(false);
        console.log(e);
      }
    }
  };

  const test = () => {
    toast("hello");
  };

  // Loading spinner
  if (context?.isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="newuser">
      <section
        className="vh-100"
        style={{ backgroundColor: "ghostwhite", width: "100%" }}
      >
        <ToastContainer />
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body md-5 p-2 pl-3">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        User Registration
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="label">Name</label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                placeholder="Text input"
                                name="name"
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                              <input
                                className="input "
                                type="email"
                                placeholder="Email input"
                                name="email"
                                onChange={handleChange}
                                required
                              />
                              <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                              </span>
                              <span className="icon is-small is-right">
                                <i className="fas fa-exclamation-triangle"></i>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="label">Department</label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                placeholder="Department"
                                name="department"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="label">Designation</label>
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                placeholder="Designation"
                                name="designation"
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <div
                              className="field"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <label className="label">District</label>
                              <label className="label">Gender</label>
                            </div>
                            <div className="field" style={{ display: "flex" }}>
                              <div className="control">
                                <div className="select">
                                  <select onChange={handleChange} name="city">
                                    <option>Select City</option>
                                    <option value="Kozhikode">Kozhikode</option>
                                    <option value="Malappuram">
                                      Malappuram
                                    </option>
                                    <option value="Thrissur"> Thrissur</option>
                                    <option value="Ernakulam">Ernakulam</option>
                                    <option value="Kannur">Kannur</option>
                                    <option value="Kollam">Kollam</option>
                                    <option value="Trivandrum">
                                      Trivandrum
                                    </option>
                                  </select>
                                </div>
                              </div>

                              <div
                                className="control"
                                style={{ marginLeft: "31%" }}
                              >
                                <label className="radio">
                                  <input
                                    type="radio"
                                    name="gender"
                                    onChange={handleChange}
                                    value="Male"
                                  />
                                  Male
                                </label>
                                <label className="radio">
                                  <input
                                    type="radio"
                                    name="gender"
                                    onChange={handleChange}
                                    value="Female"
                                  />
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="label">Phone</label>
                            <div className="control">
                              <input
                                className="input"
                                type="number"
                                placeholder="Phone Number"
                                name="phone"
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            onClick={test}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-18636.jpg?size=626&ext=jpg&ga=GA1.1.446136658.1683779267&semt=ais"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddUsers;
