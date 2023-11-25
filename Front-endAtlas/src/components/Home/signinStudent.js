import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Menu from "./Menu";

const CheckStudent = () => {
  const [username, setUsername] = useState("");
  const [passwordSingIn, setPasswordSingIn] = useState("");
  const [flag, setflag] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    requestUser();
  }, []);

  async function requestUser() {
    const us = {
      username: username,
      password: passwordSingIn,
    };
    console.log("us", us);
    if (us.username !== "") {
      const result = await fetch(`http://localhost:8080/api/signin_student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(us),
      });

      const resultInJson = await result.json();
      setStudent(resultInJson);
      console.log("result is", student);

      if (resultInJson.username === "") {
        console.log("i am false");
        setflag(false);
      }
      if (resultInJson.username !== "") {
        setflag(true);
      }
      console.log("hello", flag);
    }
  }

  return (
    <div className>
      <Menu />
      <div className="Auth-form-container">
        <h2>Student</h2>
        <form
          className="Auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            requestUser();
          }}
        >
          <div>
            <label className="CreateMain">
              Username
              <input
                id="username"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <div>
              <label className="CreateMain">
                Password
                <input
                  id="password"
                  type="password"
                  value={passwordSingIn}
                  placeholder="password"
                  onChange={(e) => setPasswordSingIn(e.target.value)}
                />
              </label>
            </div>
            <div className="Signbutton">
              <button className="button"> Sign in </button>
              If you not user then:
              <Link to={`/newStudent`}>
                <button className="button"> Sign up </button>
              </Link>
            </div>
          </div>
        </form>
        <div>
          {!flag ? (
            <Link to={`/`}>
              <button className="button"> Continue</button>
            </Link>
          ) : (
            <Link
              to={`/${student.student_id}/GetAllInterships`}
              state={student.username}
            >
              <button className="buttonContinue"> Continue</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckStudent;
