import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateStudent = () => {
  const [username, setusername] = useState("");
  const [passwordSingUp, setpasswordSingUp] = useState("");
  const [telephone, settelephone] = useState();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [emailSignUp, setemailSignUp] = useState("");
  const [grade, setgrade] = useState();
  const [university, setuniversity] = useState("");
  const [yearOfStudies, setyearOfStudies] = useState();
  const [address, setaddress] = useState("");
  const { id } = useParams();
  console.log("id", id);

  useEffect(() => {
    requestUser();
  }, []);
  async function requestUser() {
    const new_user = {
      username: username,
      telephone: telephone,
      address: address,
      firstname: firstname,
      lastname: lastname,
      passwordSingUp: passwordSingUp,
      grade: grade,
      university: university,
      yearOfStudies: yearOfStudies,
    };

    if (new_user.username !== "") {
      console.log("new_user", JSON.stringify(new_user));
      const result = await fetch(`http://localhost:8080/api/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(new_user),
      });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        requestUser();
      }}
    >
      <div className="formStyle">
        <label htmlFor="username">
          Username
          <input
            id="username"
            value={username}
            placeholder="username"
            onChange={(e) => setusername(e.target.value)}
          />
        </label>
        <label htmlFor="emailSignUp">
          Email
          <input
            id="email"
            value={emailSignUp}
            placeholder="email"
            onChange={(e) => setemailSignUp(e.target.value)}
          />
        </label>
        <label htmlFor="telephone">
          Telephone
          <input
            id="telephone"
            value={telephone}
            placeholder="telephone"
            onChange={(e) => settelephone(e.target.value)}
          />
        </label>
        <label htmlFor="address">
          Address
          <input
            id="address"
            value={address}
            placeholder="address"
            onChange={(e) => setaddress(e.target.value)}
          />
        </label>
        <label htmlFor="firstname">
          Firstname
          <input
            id="firstname"
            value={firstname}
            placeholder="firstname"
            onChange={(e) => setfirstname(e.target.value)}
          />
        </label>
        <label htmlFor="lastname">
          Lastname
          <input
            id="lastname"
            value={lastname}
            placeholder="lastname"
            onChange={(e) => setlastname(e.target.value)}
          />
        </label>
        <label htmlFor="passwordSingUp">
          Password
          <input
            id="passwordSingUp"
            type="password"
            value={passwordSingUp}
            placeholder="password"
            onChange={(e) => setpasswordSingUp(e.target.value)}
          />
        </label>
        <label htmlFor="grade">
          Grade
          <input
            id="grade"
            type="grade"
            value={grade}
            placeholder="password"
            onChange={(e) => setgrade(e.target.value)}
          />
        </label>
        <label htmlFor="university">
          university
          <input
            id="university"
            value={university}
            placeholder="Username"
            onChange={(e) => setuniversity(e.target.value)}
          />
        </label>
        <label htmlFor="yearOfStudies">
          yearOfStudies
          <input
            id="yearOfStudies"
            value={yearOfStudies}
            placeholder="yearOfStudies"
            onChange={(e) => setyearOfStudies(e.target.value)}
          />
        </label>
        <button type="submit"> Submit </button>
      </div>
    </form>
  );
};

export default UpdateStudent;
