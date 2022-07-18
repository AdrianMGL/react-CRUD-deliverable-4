import React from "react";
import axios from "axios";

const UsersList = ({ users, selectUser, getUsers }) => {
  /** */
  const deleteUser = (id) => {
    alert("Eliminando...");
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers())
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="list">
      <div className="container__table">
        <table className="table">
          <thead className="list__head">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {users.map((car) => (
              <tr key={car.id} className="table__body-tr">
                <td>
                  {car.first_name} {car.last_name}
                </td>
                <td className="email">{car.email}</td>
                <td>{car.birthday}</td>
                <td>
                  <button onClick={() => selectUser(car)} className="btn edit">
                    <i className="bx bxs-pencil"></i>
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => deleteUser(car.id)}
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
