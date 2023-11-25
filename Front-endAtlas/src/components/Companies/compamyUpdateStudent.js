import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyUpdateStudentAccept = (props) => {
  const [flag_answer_accept, setFlag_answer_accept] = useState(true);

  useEffect(() => {
    requestUser();
  }, []);

  async function requestUser() {
    const new_user = {
      flag_answer_accept: flag_answer_accept,
    };

    console.log("new_user", JSON.stringify(new_user));
    const result = await fetch(
      `http://localhost:8080/api/update_company_accept_student_intership/${props.comp_id}/${props.inter_id}/${props.student_id}`,
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        requestUser();
      }}
    >
      <div className="formStyle">
        <button type="button"> Accept </button>
      </div>
    </form>
  );
};

export default CompanyUpdateStudentAccept;
