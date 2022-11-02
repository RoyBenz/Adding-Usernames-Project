import React, { useState, useRef } from "react";
import classes from "./AddUser.module.css";
import Button from "./UI/Button";
import Card from "./UI/Card";
import ErrorModal from "./UI/ErrorModal";

const AddUser = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState();
  const [enteredUsername, setEnteredUsername] = useState("");
  const usernameRefInput = useRef();
  const ageRefInput = useRef();

  const usernameInputHandler = (event) => {
    if (enteredUsername.trim().length > 0) {
      setEnteredUsername(true);
    }
    setIsValid(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const usernameRef = usernameRefInput.current.value;
    const ageRef = ageRefInput.current.value;
    if (usernameRef.trim().length === 0) {
      setError({
        title: "ERROR",
        message: "Please enter a valid Username!",
      });
      setIsCorrect(true);
      setIsValid(false);
      return;
    }
    if (ageRef === 0) {
      setIsCorrect(true);
      setIsValid(false);
      return;
    }
    if (ageRef < 1) {
      setError({
        title: "ERROR",
        message: "Please enter a valid Age > 1",
      });
      setIsCorrect(true);
      return;
    }
    props.onAddUser(usernameRef, ageRef);
    usernameRefInput.current.value = "";
    ageRefInput.current.value = "";
  };

  const errorModalHandler = () => {
    setIsCorrect(false);
  };
  return (
    <>
      {isCorrect && (
        <ErrorModal
          title={error.title}
          message={error.message}
          hideHandler={errorModalHandler}
        />
      )}
      <form onSubmit={formSubmitHandler}>
        <Card className={`${classes.input} ${!isValid ? classes.invalid : ""}`}>
          <label>Username</label>
          <input
            onChange={usernameInputHandler}
            ref={usernameRefInput}
            type="text"
          />
          <label>Age (Years)</label>
          <input ref={ageRefInput} type="number" />
          <Button>Add User</Button>
        </Card>
      </form>
    </>
  );
};

export default AddUser;
