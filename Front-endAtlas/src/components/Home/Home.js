import { useState, useEffect } from "react";
import SearchAndInternship from "../SearchAndInternship";
import Menu from "./Menu";
import { useParams } from "react-router-dom";

const Home = () => {
  const [userdata, setUserdata] = useState({});
  const { id } = useParams();

  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  useEffect(() => {}, []);

  return (
    <>
      <Menu />
      <div className="Mainhome">
        <SearchAndInternship />
      </div>
    </>
  );
};

export default Home;
