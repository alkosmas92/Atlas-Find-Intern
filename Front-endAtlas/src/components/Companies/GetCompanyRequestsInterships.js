import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateStudent from "../Student/createnewStudent";
import CheckStudent from "../Home/signinStudent";
import CheckCompany from "../Home/signinCompany";
import MenuCompany from "../Home/MenuCompany";
import Intership from "../Intership/intership";

const GetCompanyRequestsInterships = () => {
  const [userdata, setUserdata] = useState({});
  const { comp_id } = useParams();
  function isEmptyObject(obj) {
    return JSON.stringify(userdata) === "{}" || userdata == null;
  }
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/company_requested_interships/${comp_id}`,
      {
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
  }

  return (
    <div className="main">
      {!isEmptyObject(userdata) ? (
        <>
          <MenuCompany id={comp_id} />

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              {userdata.map((user) => (
                <div key={user.intership_id} className="infoadmin">
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

export default GetCompanyRequestsInterships;
