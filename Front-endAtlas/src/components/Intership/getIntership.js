import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Internshiprequest from "../Student/IntershipRequest";
import CreateInteship from "./createIntership";
import CheckRelasionship from "../Student/CheckRelasionship";
import IntershipNolink from "./IntershipNolink";
import MenuStudent from "../Home/MenuStudent";
import intership from "./intership";

const GetIntership = () => {
  const { id, studentid } = useParams();
  const [userdata, setUserdata] = useState({});
  const [savedata, setUsersavedata] = useState({});
  const [requestdata, setUserrequestdata] = useState({});

  function isEmptyObject(obj) {
    return JSON.stringify(userdata) === "{}" || userdata == null;
  }

  useEffect(() => {
    getData();
    requestUser();
    saveUser();
    getDataRequest();
    getDataSaved();
  }, []);

  async function getData() {
    const result = await fetch(`http://localhost:8080/api/intership/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserdata(data);
      });
  }
  async function getDataRequest() {
    if (userdata != undefined) {
      const result = await fetch(
        `http://localhost:8080/api/relateintership/${id}`,
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
          setUserrequestdata(data);
        });
    }
  }
  async function requestUser() {
    console.log("hello", userdata);
    if (!isEmptyObject(userdata)) {
      const user = {
        intership_id: userdata.intership_id,
        flag_save: false,
        flag_request: true,
        flag_accept: false,
        flag_reject: false,
        flag_answer_accept: false,
        flag_answer_reject: false,
      };
      console.log("user", user);
      const result = await fetch(
        `http://localhost:8080/api/relate_student_intership/${studentid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }
      );
    }
  }
  async function updateRequestUser() {
    console.log("hello", userdata);
    if (!isEmptyObject(userdata)) {
      const user = {
        intership_id: userdata.intership_id,
        flag_save: false,
        flag_request: true,
        flag_accept: false,
        flag_reject: false,
        flag_answer_accept: false,
        flag_answer_reject: false,
      };
      console.log("user", user);
      const result = await fetch(
        `http://localhost:8080/api/stud_request_deal/${studentid}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }
      );
    }
  }
  async function saveUser() {
    if (!isEmptyObject(userdata)) {
      const user = {
        intership_id: userdata.intership_id,
        flag_save: true,
        flag_request: false,
        flag_accept: false,
        flag_reject: false,
        flag_answer_accept: false,
        flag_answer_reject: false,
      };

      const result = await fetch(
        `http://localhost:8080/api/relate_student_intership/${studentid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }
      );
    }
  }
  async function getDataSaved() {
    const result = await fetch(
      `http://localhost:8080/api/save_student_intership/${id}`,
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
        setUsersavedata(data);
      });
    // console.log("take", userdata)
  }

  return (
    <div className="main">
      <MenuStudent />
      {!isEmptyObject(userdata) ? (
        <>
          <div>
            <></>
            <div>
              {/*<div key={userdata.intership_id} className="infoadmin">*/}
              <IntershipNolink user={userdata} />
            </div>
          </div>
          {console.log("savedata", savedata)}
          {console.log("request", requestdata)}
          {requestdata.flag_save === false &&
          requestdata.flag_request === false ? (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  requestUser();
                }}
              >
                <button className="button">Request</button>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveUser();
                }}
              >
                <button className="button">Save</button>
              </form>
            </>
          ) : (
              <>
                  {requestdata.flag_save === true &&
                  requestdata.flag_request === false ? (
                      <>
                          <form
                              onSubmit={(e) => {
                                  e.preventDefault();
                                updateRequestUser();
                              }}
                          >
                              <button className="button">Request</button>
                          </form>
                      </>
                  ) : (
                      <></>
                  )}
              </>
          )}
        </>
      ) : (
      <></>
      )}
    </div>
  );
};

 export default GetIntership;
