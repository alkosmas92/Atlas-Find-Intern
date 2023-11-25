import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../Home/Menu";

const CreateStudent = () => {
  const [username, setusername] = useState("");
  const [passwordSingUp, setpasswordSingUp] = useState("");
  const [telephone, settelephone] = useState();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [grade, setgrade] = useState();
  const [university, setuniversity] = useState("");
  const [address, setaddress] = useState("");
  const [yearOfStudies, setyearOfStudies] = useState();

  useEffect(() => {
    requestUser();
  }, []);
  async function requestUser() {
    const new_user = {
      username: username,
      telephone: parseInt(telephone),
      email: address,
      firstname: firstname,
      lastname: lastname,
      password: passwordSingUp,
      grade: parseInt(grade),
      university: university,
      year: parseInt(yearOfStudies),
    };
    console.log("new_user", new_user);

    if (new_user.username !== "") {
      const result = await fetch("http://localhost:8080/api/newstudent", {
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
            onSubmit={(e) => {
              e.preventDefault();
              requestUser();
            }}
          >
            <div className="formStyle">
              <label className="CreateMain">
                Username
                <input
                  id="username"
                  value={username}
                  placeholder="username"
                  onChange={(e) => setusername(e.target.value)}
                />
              </label>
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
              <label className="CreateMain">
                Telephone
                <input
                  id="telephone"
                  value={telephone}
                  placeholder="telephone"
                  onChange={(e) => settelephone(e.target.value)}
                />
              </label>
              <label className="CreateMain">
                Address
                <input
                  id="email"
                  value={address}
                  placeholder="email"
                  onChange={(e) => setaddress(e.target.value)}
                />
              </label>
              <label className="CreateMain">
                Firstname
                <input
                  id="firstname"
                  value={firstname}
                  placeholder="firstname"
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </label>
              <label className="CreateMain">
                Lastname
                <input
                  id="lastname"
                  value={lastname}
                  placeholder="lastname"
                  onChange={(e) => setlastname(e.target.value)}
                />
              </label>

              <label className="CreateMain">
                Grade
                <input
                  id="grade"
                  type="grade"
                  value={grade}
                  placeholder="grade"
                  onChange={(e) => setgrade(e.target.value)}
                />
              </label>
              <label className="CreateMain">
                university
                <input
                  id="university"
                  value={university}
                  placeholder="university"
                  onChange={(e) => setuniversity(e.target.value)}
                />
              </label>
              <label className="CreateMain">
                yearOfStudies
                <input
                  id="year"
                  value={yearOfStudies}
                  placeholder="year"
                  onChange={(e) => setyearOfStudies(e.target.value)}
                />
              </label>
              <div className="Submit">
                <button className="button"> Create </button>
                <Link to={`/login/Student`}>
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

export default CreateStudent;
