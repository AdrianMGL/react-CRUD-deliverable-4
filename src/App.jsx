import { useEffect, useState } from "react";
import axios from "axios";
import "/src/assets/styles/Users.css";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";

function App() {
  /**  */
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  /** */
  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  }, []);

  /** */
  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };

  /** */
  const selectUser = (user) => {
    console.log(user);
    setUserSelected(user);
  };

  /** */
  const deselectUser = () => setUserSelected(null);

  // console.log(cars);

  return (
    <div className="container-main">
      <header className="user__header">
        <p>CRUD deliverable 4</p>
      </header>

      <div className="container">
        <main className="main">
          <UsersForm
            getUsers={getUsers}
            userSelected={userSelected}
            deselectUser={deselectUser}
          />
          <UsersList
            users={users}
            selectUser={selectUser}
            getUsers={getUsers}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
