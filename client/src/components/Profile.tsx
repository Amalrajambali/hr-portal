import * as React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../context/AppContext";
import Loader from "./Loader";
import DeleteModal from "./modal/DeleteModal";


interface IUser {
  Id?: number;
  name: string;
  department: string;
  designation: string;
  city: string;
  email: string;
  phone: number;
  gender: string;
  imageUrl?: string;
}

type idData = {
  id?: string;
};

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

function Profile({ id }: idData) {
  const [isUpdate, isSetUpdated] = useState(false);
  const [image, setImage] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | any>(initialState);
  const [isEdited, setIsEdited] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const fileNamePath = encodeURI(image?.name);
  const navigate = useNavigate();
  const context = useContext(UsersContext);

  //Get current user Details
  const getSingleUser = async () => {
    context?.setIsLoading(true);
    try {
      let user: any = await axios.get(`http://localhost:8081/users/${id}`);
      context?.setIsLoading(false);
      setCurrentUser(user.data);
    } catch (e) {
      context?.setIsLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [id]);

  //Delete User
  const deleteUserHandler = async () => {
    try {
      let allUser = await axios.delete(
        `http://localhost:8081/users/delete/${id}`
      );
      context?.getAllUsers();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  //on input change
  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    const { name: key, value } = e.target;
    setCurrentUser({ ...currentUser, [key]: value });
  };

  //On Image Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const userData = new FormData();
  userData.append("userImage", image);
  userData.append("userData", JSON.stringify(currentUser));

  //Save changes
  const editUserHandler = async () => {
    try {
      let updatedUser = await axios.patch(
        `http://localhost:8081/users/update/${id}`,
        userData
      );
      context?.getAllUsers();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
    setIsEdited(true);
  };

  //Loading Spinner
  if (context?.isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      {
        <section className="vh-100">
          <div
            className="container py-5 h-100"
            style={{ position: "relative" }}
          >
            <div className="row d-flex justify-content-center h-100">
              <div className="col col-lg-6 mb-4 mb-lg-0">
                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div className="row g-0">
                    <div
                      className="col-md-3 gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                        backgroundColor: "steelblue",
                        borderRadius: "2px",
                      }}
                    >
                      <img
                        src={
                          currentUser?.imageUrl
                            ? `https://2mxff3.sharepoint.com${currentUser.imageUrl}`
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYqfZBDYOPW8hB6ZYxcx3UZ0mvR-mxH8MABg&usqp=CAU"
                        }
                        alt="Avatar"
                        className="img-fluid my-5"
                        style={{ width: "100px", borderRadius: "50%" }}
                      />
                      <h5>{currentUser?.name}</h5>
                      <p>{currentUser?.designation}</p>
                      <i className="far fa-edit mb-5"></i>
                    </div>
                    <div className="col-md-9">
                      <div className="card-body p-4">
                        {/* Edit  */}

                        {!isUpdate ? (
                          <>
                            <h6>
                              <b>Information</b>
                            </h6>
                            <hr className="mt-0 mb-4" />
                            <div className="row pt-1">
                              <div className="col-6 mb-3">
                                <h6>Department</h6>
                                <p className="text-muted">
                                  {currentUser?.department}
                                </p>
                              </div>
                              <div className="col-6 mb-3">
                                <h6>City</h6>
                                <p className="text-muted">
                                  {currentUser?.city}
                                </p>
                              </div>
                            </div>
                            <hr style={{ background: "darkblue" }}></hr>
                            <h6>
                              <b>Contact</b>
                            </h6>
                            <hr className="mt-0 mb-4" />
                            <div className="row pt-1">
                              <div className="col-6 mb-3">
                                <h6>Email</h6>
                                <p className="text-muted">
                                  {currentUser?.email}
                                </p>
                              </div>
                              <div className="col-6 mb-3">
                                <h6>Phone</h6>
                                <p className="text-muted">
                                  {currentUser?.phone}
                                </p>
                              </div>
                            </div>
                            <div className="row pt-1">
                              <div className="col-6 mb-3">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => setModalActive(true)}
                                >
                                  Delete
                                </button>
                              </div>
                              <div className="col-6 mb-3">
                                <DeleteModal
                                  deleteUserHandler={deleteUserHandler}
                                  modalActive={modalActive}
                                  setModalActive={setModalActive}
                                />
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  onClick={() => isSetUpdated(true)}
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <form>
                            <div className="form-group">
                              <label>Add Profile picture</label>
                              <input
                                type="file"
                                id="myFile"
                                name="filename"
                                onChange={handleImageChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Email address</label>
                              <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={currentUser?.email}
                                name="email"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <div className="control">
                                <label
                                  className="label"
                                  style={{ fontWeight: "450" }}
                                >
                                  District
                                </label>
                                <div className="select">
                                  <select
                                    onChange={handleInputChange}
                                    name="city"
                                  >
                                    <option>
                                      {currentUser?.city
                                        ? currentUser.city
                                        : "Select City"}
                                    </option>
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
                            </div>
                            <div className="form-group">
                              <label>Department</label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Department"
                                value={currentUser?.department}
                                name="department"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Phone</label>
                              <input
                                type="number"
                                className="form-control"
                                name="phone"
                                id="exampleInputPassword1"
                                placeholder="Phone"
                                value={currentUser?.phone}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="row pt-1">
                              <div className="col-6 mb-3">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={() => isSetUpdated(false)}
                                >
                                  Cancel
                                </button>
                              </div>

                              <div className="col-6 mb-3">
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={editUserHandler}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        )}

                        {/* Edit  */}

                        <div className="d-flex justify-content-start">
                          <a href="#!">
                            <i className="fab fa-facebook-f fa-lg me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-twitter fa-lg me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-instagram fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
}

export default Profile;
