import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IntershipNolink from "./IntershipNolink";
import MenuStudent from "../Home/MenuStudent";

const GetRejectedInterships = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(userdata) === "{}" || userdata == null;
  }
  useEffect(() => {
    getData();
  }, []);

  console.log("id is", id);
  async function getData() {
    if (userdata != undefined) {
      const result = await fetch(
        `http://localhost:8080/api/reject_student_intership/${id}`,
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
  }

  return (
    <div className="main">
      <MenuStudent id={id} />
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
                <button className="button">
                  {" "}
                  Information {user.intership_id}
                </button>
              </div>
            ))}
          </div>
        </form>
      ) : (
        <div>
          <h1> You does not have rejected Intership </h1>
        </div>
      )}
    </div>
  );
};

export default GetRejectedInterships;
