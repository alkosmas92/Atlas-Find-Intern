import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import deleteStudent from "./DeleteStudent";
import DeleteStudent from "./DeleteStudent";
import IntershipNolink from "../Intership/IntershipNolink";

const GetStudents = () => {
  const [userdata, setUserdata] = useState({});

  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await fetch("http://localhost:8080/api/student", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserdata(data);
      });
  }

  return (
    <div className="main">
      {!isEmptyObject(userdata) ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            {userdata.map((user) => (
              <div key={user.id} className="infoadmin">
                <IntershipNolink user={user} />

                <button type="submit"> Information {user.username}</button>
                {/*</Link>*/}
              </div>
            ))}
          </div>
        </form>
      ) : (
        <div>
          <h1> loading... </h1>
        </div>
      )}
    </div>
  );
};

export default GetStudents;
