import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IntershipNolink from "./IntershipNolink";

const GetAcceptedInterships = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(userdata) === "{}" || userdata == null;
  }
  useEffect(() => {
    getData();
    Accept();
    Reject();
  }, []);

  console.log("id is", id);
  async function getData() {
    const result = await fetch(
      `http://localhost:8080/api/accept_student_intership/${id}`,
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
        console.log("take", data);
        setUserdata(data);
      });
  }

  async function Accept(userdata) {
    if (userdata != undefined) {
      const new_user = {
        flag_accept: true,
      };

      console.log("new_user", JSON.stringify(new_user));
      const result = await fetch(
        `http://localhost:8080/api/stud_accept_deal/${id}/${userdata.intership_id}`,
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
        flag_reject: true,
        flag_request: false,
        flag_answer_accept: false,
      };

      console.log("new_user", JSON.stringify(new_user));
      const result = await fetch(
        `http://localhost:8080/api/stud_reject_deal/${id}/${userdata.intership_id}`,
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

  console.log("take", userdata, "is", JSON.stringify(userdata) === "{}");
  console.log("take", userdata, "is", userdata == null);
  return (
    <div className="main">
      {!isEmptyObject(userdata) ? (
        <>
          <div>
            {userdata.map((user) => (
              <div>
                <IntershipNolink user={user} />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    Accept(user);
                  }}
                >
                  <div className="formStyle">
                    <button className="button"> Accept </button>
                  </div>
                </form>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    Reject(user);
                  }}
                >
                  <div className="formStyle">
                    <button className="button"> Reject </button>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1> We does not have accept intership... </h1>
        </div>
      )}
    </div>
  );
};

export default GetAcceptedInterships;
