import React, { useState } from "react";
import AddUser from "./components/AddUser";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState([]);
  const addUserHandler = (uName, uAge) => {
    setUsers((prevUsers) => {
      return [
        ...prevUsers,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };
  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
