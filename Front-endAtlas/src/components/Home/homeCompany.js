import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuCompany from "./MenuCompany";
import SearchAndInternship from "../SearchAndInternship";

const HomeCompany = () => {
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
    console.log("he", username);
  }

  return (
    <div className="main">
      {!isEmptyObject(userdata) ? (
        <>
          <MenuCompany id={id} username={username} />
          <div className="Mainhome">
            <SearchAndInternship />
          </div>
        </>
      ) : (
        <div>
          <h1> loading... </h1>
        </div>
      )}
    </div>
  );
};

export default HomeCompany;
