import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateStudent from "../Student/createnewStudent";
import CheckStudent from "../Home/signinStudent";
import CheckCompany from "../Home/signinCompany";
import Intership from "./intership";
import IntershipNolink from "./IntershipNolink";

const GetAllInterships = () => {
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const result = await fetch(`http://localhost:8080/api/all_interships`, {
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
              <div key={user.intership_id} className="infoadmin">
                <IntershipNolink user={user} />
                {user.active ? false : true}
                <Link to={`/Students/GetIntership/${user.intership_id}`}>
                  <button className="button">
                    {" "}
                    Information {user.titleposition}
                  </button>
                </Link>
                <Link
                  to={`/Students/GetRequestedInterships/${user.intership_id}`}
                >
                  <button className="button"> {user.titleposition}</button>
                </Link>
                <Link
                  to={`/Students/GetAcceptedInterships/${user.intership_id}`}
                >
                  <button className="button">
                    {" "}
                    Accepted {user.titleposition}
                  </button>
                </Link>
                <Link
                  to={`/Students/GetRejectedInterships/${user.intership_id}`}
                >
                  <button className="button">
                    {" "}
                    Online {user.titleposition}
                  </button>
                </Link>
                <Link to={`/Students/GetSavedInterships/${user.intership_id}`}>
                  <button className="button">
                    {" "}
                    Saved {user.titleposition}
                  </button>
                </Link>
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

export default GetAllInterships;
