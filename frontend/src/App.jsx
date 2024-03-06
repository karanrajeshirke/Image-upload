import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import Chart from "react-apexcharts";
function App() {
  const [userData, setUserData] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    age: "",
    photo: "",
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    age: "",
    photo: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllData = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:8080/getdata");

      // console.log(response.data.allUsers);

      setUserData(response.data.allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //! modal 2 for update
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (const key in inputData) {
      console.log(key);
      formData.append(key, inputData[key]);
    }
    try {
      await axios.post("http://localhost:8080/add", formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (event) => {
    setInputData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.files
          ? event.target.files[0]
          : event.target.value,
      };
    });
  };

  const populateUpdateData = async (id) => {
    showModal2();
    const currentUser = userData.find((item) => {
      return item._id === id;
    });

    console.log(currentUser);
    setUpdateData({
      id,
      name: currentUser.name,
      age: currentUser.age,
    });
  };

  const handleInput2 = (event) => {
    setUpdateData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.files
          ? event.target.files[0]
          : event.target.value,
      };
    });
  };

  const handleFormSubmit2 = async (event) => {
    event.preventDefault();
    console.log(updateData);
  };

  return (
    <>
      <div className="container">
        {JSON.stringify(updateData, null, 3)}
        {updateData.id}
        <div className="row">
          <button className="btn btn-primary" onClick={showModal}>
            Add data
          </button>
          <table className="table table-dark table-responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">age</th>
                <th scope="col">photo</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((item) => {
                  return (
                    <tr key={item._id}>
                      <th scope="row">1</th>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      {item && item._id && (
                        <td>
                          <img
                            src={`http://localhost:8080/photo/${item._id}`}
                            alt=""
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>
                      )}
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => populateUpdateData(item._id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <h3>new details</h3>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age :</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className="form-control"
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo :</label>
                {inputData.photo ? (
                  <img
                    src={URL.createObjectURL(inputData.photo)}
                    className="img-fluid"
                  ></img>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    id="photo"
                    className="form-control"
                    onChange={handleInput}
                  />
                )}
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Create
              </button>
            </form>
          </Modal>
          //! modal for updating
          <Modal
            title="Basic Modal"
            open={isModalOpen2}
            onOk={handleOk2}
            onCancel={handleCancel2}
            footer={null}
          >
            <h4>Update</h4>

            <form onSubmit={handleFormSubmit2}>
              <div className="form-group">
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  onChange={handleInput2}
                  value={updateData.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age :</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className="form-control"
                  onChange={handleInput2}
                  value={updateData.age}
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo :</label>
                {updateData.photo ? (
                  <img
                    src={URL.createObjectURL(updateData.photo)}
                    className="img-fluid"
                  ></img>
                ) : (
                  <img
                    src={`http://localhost:8080/photo/${updateData.id}`}
                    className="img-fluid"
                  ></img>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="photo">Photo :</label>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  className="form-control"
                  onChange={handleInput2}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Update
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
