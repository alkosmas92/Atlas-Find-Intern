import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Internshiprequest from "./IntershipRequest";
import InternshipSave from "./IntershipSave";

const CheckRelasionship = (props) => {
  // /const { id, studentid } = useParams();
  const [check, setCheck] = useState("");
  const [pop, setPop] = useState(0);

  const firstUpdate = useRef(true);

  useEffect(() => {
    console.log("firstupadate", firstUpdate);
    requestUser();
  }, []);

  async function requestUser() {
    const user = {
      // intership_id:props.intership_id,
      intership_id: props.id,
    };

    const result = await fetch(
      `http://localhost:8080/api/check_student_intership/${props.studentid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        setCheck(data);
      });
  }

  function allou() {
    if (props.count !== 0) {
      props.setFlag(1);
    }
  }
  function alliws() {
    if (props.count1 !== 0) {
      props.setFlag1(1);
    }
  }

  return (
    <>
      {check === false ? (
        <>
          <div className="Create">
            <div className="Auth-form-container">
              <div className="Auth-form-container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    allou();
                  }}
                >
                  <button className="button"> Request</button>
                </form>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alliws();
                  }}
                >
                  <button className="button"> Save</button>
                </form>

                <Internshiprequest
                  flag1={props.flag1}
                  setFlag1={props.setFlag1}
                  count1={props.count1}
                  setCount1={props.setCount1}
                  flag={props.flag}
                  setFlag={props.setFlag}
                  count={props.count}
                  setCount={props.setCount}
                  intership_id={props.id}
                  studentid={props.studentid}
                />
                <InternshipSave
                  flag={props.flag}
                  setFlag={props.setFlag}
                  count={props.count}
                  setCount={props.setCount}
                  flag1={props.flag1}
                  setFlag1={props.setFlag1}
                  count1={props.count1}
                  setCount1={props.setCount1}
                  intership_id={props.id}
                  studentid={props.studentid}
                />
              </div>
            </div>
          </div>
          {/*<InternshipSave check={check} intership_id={props.id} studentid={props.studentid}/>*/}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CheckRelasionship;
