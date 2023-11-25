import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IntershipNolink from "./IntershipNolink";
import MenuCompany from "../Home/MenuCompany";

const GetCompanySaveInterships = () => {
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
      `http://localhost:8080/api/saved_company_intership/${id}`,
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
          <MenuCompany id={id} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              {userdata.map((user) => (
                <div key={user.intership_id} className="infoadmin">
                  <div>
                    <IntershipNolink user={user} />
                  </div>
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

export default GetCompanySaveInterships;
