import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../Home/Menu";

const CreateCompany = () => {
  const [username, setusername] = useState("");
  const [passwordSingUp, setpasswordSingUp] = useState("");
  const [afm, setafm] = useState();
  const [namecompany, setNamecompany] = useState("");
  const [address, setaddress] = useState("");

  useEffect(() => {
    requestUser();
  }, []);
  async function requestUser() {
    const new_user = {
      username: username,
      password: passwordSingUp,
      afm: parseInt(afm),
      namecompany: namecompany,
      email: address,
    };
    console.log("new_user", new_user);

    if (new_user.username !== "") {
      const result = await fetch("http://localhost:8080/api/newcompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(new_user),
      });
    }
  }

  return (
    <>
      <Menu />
      <div className="Create">
        <h2>Create Company</h2>
        <div className="Auth-form-container">
          <form
            className="Auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              requestUser();
            }}
          >
            <div>
              <div className="Auth-form-content-create">
                <label className="CreateMain">
                  <div>Username</div>
                  <div>
                    <input
                      id="username"
                      value={username}
                      placeholder="username"
                      onChange={(e) => setusername(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              <div className="Auth-form-content-create">
                <label className="CreateMain">
                  Password
                  <input
                    id="password"
                    type="password"
                    value={passwordSingUp}
                    placeholder="password"
                    onChange={(e) => setpasswordSingUp(e.target.value)}
                  />
                </label>
              </div>
              <div className="Auth-form-content-create">
                <label className="CreateMain">
                  Name company
                  <input
                    id="name company"
                    value={namecompany}
                    placeholder="namecompany"
                    onChange={(e) => setNamecompany(e.target.value)}
                  />
                </label>
              </div>
              <div className="Auth-form-content-create">
                <label className="CreateMain">
                  Email
                  <input
                    id="email"
                    value={address}
                    placeholder="email"
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </label>
              </div>
              <div className="Auth-form-content-create">
                <label className="CreateMain">
                  A.F.M
                  <input
                    id="afm"
                    value={afm}
                    placeholder="afm"
                    onChange={(e) => setafm(e.target.value)}
                  />
                </label>
              </div>
              <div className="Submit">
                <button className="button"> Create </button>
                <Link to={`/login/Company`}>
                  <button className="button"> Sign in</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCompany;
