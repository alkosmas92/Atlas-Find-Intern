import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentUpdateIntership = () => {
  const location = useLocation();
  const { stud_id } = useParams();
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    getData();
  }, []);

  console.log("id is ", stud_id);
  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/update_student_intership/${stud_id}`,
      {
        method: "PUT",
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

  return 0;
};

export default StudentUpdateIntership;
