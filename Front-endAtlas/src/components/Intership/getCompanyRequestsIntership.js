import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuCompany from "../Home/MenuCompany";
import Intership from "./intership";
import IntershipNolink from "./IntershipNolink";

const GetCompanyRequestsIntership = () => {
  const location = useLocation();
  const { comp_id, inter_id } = useParams();
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  useEffect(() => {
    getData();
  }, []);

  console.log("comp_id is", comp_id);
  console.log("inter_id is", inter_id);
  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/request_company_intership/${comp_id}/${inter_id}`,
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
          <MenuCompany />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              {userdata.map((user) => (
                <div key={user.student_id} className="infoadmin">
                  <Intership
                    user={user}
                    url={`/api/request_company_intership/${comp_id}/`}
                  />
                  <Link
                    to={`/api/request_company_intership/${comp_id}/${user.intership_id}`}
                  ></Link>
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

export default GetCompanyRequestsIntership;
