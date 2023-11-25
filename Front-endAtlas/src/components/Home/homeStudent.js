import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateStudent from "../Student/createnewStudent";
import CheckStudent from "./signinStudent";
import CheckCompany from "./signinCompany";
import Intership from "../Intership/intership";
import intership from "../Intership/intership";
import MenuStudent from "./MenuStudent";
import SearchAndInternship from "../SearchAndInternship";

const HomeStudent = () => {
  const [userdata, setUserdata] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const username = location.state;
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
        <div>
          <MenuStudent id={id} username={username} />
          <div className="Mainhome">
            <SearchAndInternship />
          </div>
        </div>
      ) : (
        <div>
          <h1> loading... </h1>
        </div>
      )}
    </div>
  );
};

export default HomeStudent;
