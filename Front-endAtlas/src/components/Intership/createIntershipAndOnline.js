import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateInteshipOnline = (props) => {
  // props.user.flag_online=true
  console.log("OK FROM ONLINE", props.user);

  useEffect(() => {
    requestUser();
  }, []);
  async function requestUser() {
    if (props.user.startdate !== "") {
      props.user.flag_online = true;
      const result = await fetch(
        `http://localhost:8080/api/newintership/${props.user.company_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(props.user),
        }
      );
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        requestUser();
      }}
    >
      <button className="button"> Online </button>
    </form>
  );
};

export default CreateInteshipOnline;
