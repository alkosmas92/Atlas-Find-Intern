import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IntershipNolink from "../Intership/IntershipNolink";
import Student from "../Student/student";

const CompanyWaited = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}" || obj == null;
  }
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    if (userdata != undefined) {
      console.log("EIMAI");
      const result = await fetch(
        `http://localhost:8080/api/company_waiting_interships/${id}`,
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
      {console.log("userdata", isEmptyObject(userdata))}
      {!isEmptyObject(userdata) ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getData();
          }}
        >
          <div>
            {userdata.map((user) => (
              <div key={user.intership_id} className="infoadmin">
                <h2>Intership</h2>
                <IntershipNolink user={user} />
                <h2>Company</h2>
                <Student user={user} />
              </div>
            ))}
          </div>
        </form>
      ) : (
        <div>
          <h1> You have not mathed internships </h1>
        </div>
      )}
    </div>
  );
};

export default CompanyWaited;
