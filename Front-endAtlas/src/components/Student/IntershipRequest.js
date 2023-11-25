import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CheckRelasionship from "./CheckRelasionship";

const Internshiprequest = (props) => {
  // props.user.flag_online=true

  console.log("check", props.count);

  // const { from } = location.state;
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  useEffect(() => {
    requestUser();
  }, [props.flag]);

  async function requestUser() {
    const user = {
      intership_id: props.intership_id,
      flag_save: false,
      flag_request: true,
      flag_accept: false,
      flag_reject: false,
      flag_answer_accept: false,
      flag_answer_reject: false,
    };
    console.log("mpikaAAAAAA");
    props.setCount(1);
    if (props.flag === 1) {
      const result = await fetch(
        `http://localhost:8080/api/relate_student_intership/${props.studentid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      props.setFlag1(0);
      props.setCount1(0);
      props.setFlag(0);
      props.setCount(0);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        requestUser();
      }}
    ></form>
  );
};

export default Internshiprequest;
