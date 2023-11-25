import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteStudent from "./DeleteStudent";
import compamyUpdateStudent from "../Companies/compamyUpdateStudent";
import CompanyUpdateStudentAccept from "../Companies/compamyUpdateStudent";
import Student from "./student";

const GetCompanyIntershipRequestStudent = () => {
  const location = useLocation();
  const { comp_id, inter_id } = useParams();
  const [userdata, setUserdata] = useState({});
  const [flag_answer_accept, setFlag_answer_accept] = useState(true);

  // const { from } = location.state;
  function isEmptyObject(obj) {
    return JSON.stringify(userdata) === "{}" || userdata == null;
  }

  useEffect(() => {
    getData();
    Accept();
    Reject();
  }, []);

  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/request_company_intership/${comp_id}/${inter_id}`,
      {
        method: "GET",
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
    console.log("take", userdata);
  }
  console.log("paei", userdata);

  async function Accept(userdata) {
    if (userdata != undefined) {
      const new_user = {
        flag_answer_accept: flag_answer_accept,
      };

      console.log("new_user", JSON.stringify(new_user));
      const result = await fetch(
        `http://localhost:8080/api/update_company_accept_student_intership/${comp_id}/${inter_id}/${userdata.student_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(new_user),
        }
      );
    }
  }

  async function Reject(userdata) {
    if (userdata != undefined) {
      const new_user = {
        flag_answer_reject: true,
      };

      console.log("new_user", JSON.stringify(new_user));
      const result = await fetch(
        `http://localhost:8080/api/update_company_reject_student_intership/${comp_id}/${inter_id}/${userdata.student_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(new_user),
        }
      );
    }
  }

  return (
    <div className="main">
      {!isEmptyObject(userdata) ? (
        <div>
          <Student user={userdata[0]} />
          <form
            className="Auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              Accept(userdata[0]);
            }}
          >
            <div className="formStyle">
              <button className="button"> Accept </button>
            </div>
          </form>
          <form
            className="Auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              Reject(userdata[0]);
            }}
          >
            <div className="formStyle">
              <button className="button"> Reject </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1> loading... </h1>
        </div>
      )}
    </div>
  );
};

export default GetCompanyIntershipRequestStudent;
