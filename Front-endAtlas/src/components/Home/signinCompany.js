import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const CheckCompany = () => {
  const [username, setUsername] = useState("");
  const [passwordSingIn, setPasswordSingIn] = useState("");
  const [flag, setflag] = useState(false);
  const [company, setCompany] = useState({});

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
      const result = await fetch(`http://localhost:8080/api/signin_company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(us),
      });

      const resultInJson = await result.json();
      setCompany(resultInJson);
      console.log("result is", company);

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
    <div>
      <Menu />
      <div className="Auth-form-container">
        <h2>Company</h2>
        <form
          className="Auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            requestUser();
          }}
        >
          <div className="Auth-form-content">
            <label className="CreateMain">
              Username
              <input
                id="username"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <div className="Auth-form-content">
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
              <Link to={`/newCompany`}>
                <button className="button"> Sign up </button>
              </Link>
            </div>
          </div>
        </form>
        <div className="Auth-form-content">
          {!flag ? (
            <Link to={`/`}>
              <button className="button"> Continue</button>
            </Link>
          ) : (
            <Link
              to={`/company/${company.company_id}`}
              state={company.username}
            >
              <button className="button"> Continue</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckCompany;
