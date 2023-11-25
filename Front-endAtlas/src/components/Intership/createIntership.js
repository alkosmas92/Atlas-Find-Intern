import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateIntershipAndOnline from "./createIntershipAndOnline";
import CreateIntershipAndSave from "./createIntershipAndSave";
import Menu from "../Home/Menu";
import MenuCompany from "../Home/MenuCompany";

const CreateInteship = () => {
  const [titleposition, settitleposition] = useState("");
  const [employer, setemployer] = useState("");
  const [filedofintership, setfiledofintership] = useState("");
  const [fieldofstudies, setfieldofstudies] = useState("");
  const [jobposition, setjobposition] = useState("");
  const [informationcompany, setinformationcompany] = useState("");
  const [infointership, setinfointership] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [postingdate, setpostingdate] = useState("");
  const [startdate, setstartdate] = useState("");
  const [salary, setsalary] = useState("");
  const [flag, setflag] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    requestUser();
    requestOnlineUser();
    requestSaveUser();
  }, []);
  async function requestUser() {}
  async function requestOnlineUser() {
    const user = {
      company_id: id,
      title: titleposition,
      file: filedofintership,
      employer: employer,
      studies: fieldofstudies,
      posision: jobposition,
      infocomp: informationcompany,
      infointer: infointership,
      salary: parseInt(salary),
      jobtype: jobtype,
      postdate: postingdate,
      startdate: startdate,
      flag_save: false,
      flag_online: false,
    };
    if (
      user.startdate !== "" &&
      user.startdate !== "" &&
      user.title !== "" &&
      user.file !== "" &&
      user.employer !== "" &&
      user.studies !== "" &&
      user.posision !== ""
    ) {
      user.flag_online = true;
      const result = await fetch(
        `http://localhost:8080/api/newintership/${user.company_id}`,
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
  async function requestSaveUser() {
    const user = {
      company_id: id,
      title: titleposition,
      file: filedofintership,
      employer: employer,
      studies: fieldofstudies,
      posision: jobposition,
      infocomp: informationcompany,
      infointer: infointership,
      salary: parseInt(salary),
      jobtype: jobtype,
      postdate: postingdate,
      startdate: startdate,
      flag_save: false,
      flag_online: false,
    };
    console.log(user.startdate);
    if (
      user.startdate !== "" &&
      user.startdate !== "" &&
      user.title !== "" &&
      user.file !== "" &&
      user.employer !== "" &&
      user.studies !== "" &&
      user.posision !== ""
    ) {
      user.flag_save = true;
      const result = await fetch(
        `http://localhost:8080/api/newintership/${user.company_id}`,
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

  return (
    <>
      <MenuCompany id={id} />
      <div className="Create">
        <h2>Create Internship</h2>
        <div className="Auth-form-container">
          <div className="Auth-form-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                requestUser();
              }}
            >
              <div className="formStyle">
                <label className="CreateMain">
                  Titleposision
                  <input
                    id="title"
                    value={titleposition}
                    placeholder="title"
                    onChange={(e) => settitleposition(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  FiledofIntership
                  <input
                    id="file"
                    value={filedofintership}
                    placeholder="file"
                    onChange={(e) => setfiledofintership(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  Salary
                  <input
                    id="salary"
                    value={salary}
                    placeholder="salary"
                    onChange={(e) => setsalary(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  Fieldofstudies
                  <input
                    id="studies"
                    value={fieldofstudies}
                    placeholder="studies"
                    onChange={(e) => setfieldofstudies(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  Jobposition
                  <input
                    id="posision"
                    value={jobposition}
                    placeholder="posision"
                    onChange={(e) => setjobposition(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  Employer
                  <input
                    id="employer"
                    type="employer"
                    value={employer}
                    placeholder="employer"
                    onChange={(e) => setemployer(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  Informationcompany
                  <input
                    id="infocomp"
                    type="infocomp"
                    value={informationcompany}
                    placeholder="infocomp"
                    onChange={(e) => setinformationcompany(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  Infointership
                  <input
                    id="infointer"
                    value={infointership}
                    placeholder="infointer"
                    onChange={(e) => setinfointership(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  jobtype
                  <input
                    id="jobtype"
                    value={jobtype}
                    placeholder="jobtype"
                    onChange={(e) => setjobtype(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  postingdate
                  <input
                    id="postdate"
                    value={postingdate}
                    placeholder="postdate"
                    onChange={(e) => setpostingdate(e.target.value)}
                  />
                </label>
                <label className="CreateMain">
                  startdate
                  <input
                    id="startdate"
                    value={startdate}
                    placeholder="startdate"
                    onChange={(e) => setstartdate(e.target.value)}
                  />
                </label>
                <button className="button"> Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="OnlineSave">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                requestUser();
                requestOnlineUser();
              }}
            >
              <button className="button"> Online </button>
            </form>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  requestUser();
                  requestSaveUser();
                }}
              >
                <button className="button"> Save </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInteship;
