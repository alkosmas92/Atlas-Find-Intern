import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IntershipNolink from "./IntershipNolink";
import MenuCompany from "../Home/MenuCompany";

const GetIntershipsByEmployer = () => {
  const location = useLocation();
  const { employer } = useParams();
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  useEffect(() => {
    getData();
  }, []);

  console.log("employer is", employer);
  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/all_critirio_interships/${employer}`,
      {
        //method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserdata(data);
      });
    // console.log("take", userdata)
  }

  return (
    <div className="main">
      {!isEmptyObject(userdata) ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              {userdata.map((user) => (
                <div key={user.intership_id} className="infoadmin">
                  <IntershipNolink user={user} />
                  <button type="submit">
                    {" "}
                    Information {user.intership_id}
                  </button>
                  {/*</Link>*/}
                </div>
              ))}
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1> loading... </h1>
        </div>
      )}
    </div>
  );
};

export default GetIntershipsByEmployer;
