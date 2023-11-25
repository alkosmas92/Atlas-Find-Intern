import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IntershipNolink from "../Intership/IntershipNolink";
import MenuCompany from "../Home/MenuCompany";
import MenuStudent from "../Home/MenuStudent";

const Matched = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  useEffect(() => {
    getData();
  }, []);

  console.log("id is", id);
  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/student_matched_intership/${id}`,
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
      <MenuStudent id={id} />
      {!isEmptyObject(userdata) ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <div key={userdata.intership_id} className="infoadmin">
                <IntershipNolink user={userdata} />
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <MenuCompany id={id} />
          <div>
            <h1> You does not have mathed Intership </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Matched;
