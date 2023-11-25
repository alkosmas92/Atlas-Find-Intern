import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateInteshipSave = (props) => {
  // props.user.flag_save=true
  console.log("OK FROM SAVE", props.user);
  useEffect(() => {
    requestUser();
  }, []);
  async function requestUser() {
    console.log(props.user.startdate);
    if (props.user.startdate !== "") {
      props.user.flag_save = true;
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
      <button className="button"> Save </button>
    </form>
  );
};

export default CreateInteshipSave;
