import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentDeleteIntership = () => {
  const location = useLocation();
  const { stud_id, inter_id } = useParams();
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    getData();
  }, []);

  console.log("id is ", stud_id, inter_id);
  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/student_delete_intership/${stud_id}/${inter_id}`,
      {
        method: "DELETE",
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

export default StudentDeleteIntership;
