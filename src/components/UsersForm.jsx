import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {
  /** */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  /** */
  useEffect(() => {
    if (userSelected !== null) {
      setFirstName(userSelected.first_name);
      setLastName(userSelected.last_name);
      setEmail(userSelected.email);
      setPassword(userSelected.password);
      setBirthday(userSelected.birthday);
    } else {
      reset();
    }
  }, [userSelected]);

  /** */
  const submit = (e) => {
    e.preventDefault();

    // console.log("submit");

    //
    const userForm = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      birthday: birthday,
    };

    //  console.log(carForm);

    //
    if (userSelected !== null) {
      alert("Actualizando");
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          userForm
        )
        .then(() => {
          getUsers();
          reset();
          deselectUser();
        })
        .catch((error) => console.log(error.response));
    } else {
      alert("Registrando");
      axios
        .post("https://users-crud1.herokuapp.com/users/", userForm)
        .then(() => {
          reset();
          getUsers();
        })
        .catch((error) => console.log(error.response));
    }
  };

  /** RESET */
  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setBirthday("");
  };

  /** */
  return (
    <div className="form">
      <div>
        <h2 className="form__title">
          {userSelected !== null ? "Edit" : "Add"} User
        </h2>
      </div>
      <form onSubmit={submit}>
        <div className="input">
          <label htmlFor="first_name">
            <i className="bx bx-user bx-tada-hover"></i>
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="last_name">
            <i className="bx bx-user bx-tada-hover"></i>
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="email">
            <i className="bx bx-envelope bx-tada-hover"></i>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="password">
            <i className="bx bxs-key bx-tada-hover"></i>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="birthday">
            <i className="bx bx-cake bx-tada-hover"></i>
          </label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>

        <div className="group__btn">
          <button className="btn success">
            {userSelected !== null ? "Update" : "Create"}{" "}
            <i className="bx bx-check"></i>
          </button>

          {userSelected !== null && (
            <button className="btn cancel" onClick={deselectUser} type="button">
              Cancel <i className="bx bx-trash"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
