import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import CreateIntershipAndOnline from "./createIntershipAndOnline";
import CreateIntershipAndSave from "./createIntershipAndSave";

const CreateInteshipv2 = () => {
  const [titleposition, settitleposition] = useState("");
  const [employer, setemployer] = useState("");
  const [filedofintership, setfiledofintership] = useState();
  const [fielofstudies, setfielofstudies] = useState("");
  const [jobposition, setjobposition] = useState("");
  const [informationcompany, setinformationcompany] = useState();
  const [infointership, setinfointership] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [postingdate, setpostingdate] = useState("");
  const [startdate, setstartdate] = useState("");
  const [salary, setsalary] = useState("");
  const [mynew_user, setmynew_user] = useState({});
  const [count, setCount] = useState(0);
  const [flag, setflag] = useState(false);
  const { id } = useParams();

  // const { from } = location.state;
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    requestUser();
    console.log("componentDidUpdateFunction");
  });
  async function requestUser() {
    console.log("flag id ");
    new_user = {
      company_id: id,
      titleposition: titleposition,
      filedofintership: filedofintership,
      employer: employer,
      fielofstudies: fielofstudies,
      jobposition: jobposition,
      informationcompany: informationcompany,
      infointership: infointership,
      salary: parseInt(salary),
      jobtype: jobtype,
      postingdate: postingdate,
      startdate: startdate,
      flag_save: false,
      flag_online: false,
    };
    console.log("new user", new_user);
  }

  return (
    <div>
      {!flag ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestUser();
          }}
        >
          <div className="formStyle">
            <label htmlFor="titleposition">
              Username
              <input
                id="titleposition"
                value={titleposition}
                placeholder="titleposition"
                onChange={(e) => settitleposition(e.target.value)}
              />
            </label>
            <label htmlFor="filedofintership">
              Telephone
              <input
                id="filedofintership"
                value={filedofintership}
                placeholder="filedofintership"
                onChange={(e) => setfiledofintership(e.target.value)}
              />
            </label>
            <label htmlFor="salary">
              Salary
              <input
                id="email"
                value={salary}
                placeholder="email"
                onChange={(e) => setsalary(e.target.value)}
              />
            </label>
            <label htmlFor="fielofstudies">
              Fielofstudies
              <input
                id="fielofstudies"
                value={fielofstudies}
                placeholder="fielofstudies"
                onChange={(e) => setfielofstudies(e.target.value)}
              />
            </label>
            <label htmlFor="jobposition">
              Jobposition
              <input
                id="jobposition"
                value={jobposition}
                placeholder="jobposition"
                onChange={(e) => setjobposition(e.target.value)}
              />
            </label>
            <label htmlFor="employer">
              Employer
              <input
                id="employer"
                type="employer"
                value={employer}
                placeholder="employer"
                onChange={(e) => setemployer(e.target.value)}
              />
            </label>
            <label htmlFor="informationcompany">
              Informationcompany
              <input
                id="informationcompany"
                type="informationcompany"
                value={informationcompany}
                placeholder="informationcompany"
                onChange={(e) => setinformationcompany(e.target.value)}
              />
            </label>
            <label htmlFor="infointership">
              Infointership
              <input
                id="infointership"
                value={infointership}
                placeholder="infointership"
                onChange={(e) => setinfointership(e.target.value)}
              />
            </label>
            <label htmlFor="jobtype">
              jobtype
              <input
                id="jobtype"
                value={jobtype}
                placeholder="jobtype"
                onChange={(e) => setjobtype(e.target.value)}
              />
            </label>
            <label htmlFor="postingdate">
              postingdate
              <input
                id="postingdate"
                value={postingdate}
                placeholder="postingdate"
                onChange={(e) => setpostingdate(e.target.value)}
              />
            </label>
            <label htmlFor="startdate">
              startdate
              <input
                id="startdate"
                value={startdate}
                placeholder="startdate"
                onChange={(e) => setstartdate(e.target.value)}
              />
            </label>
            <button type="online"> Submit</button>
          </div>
        </form>
      ) : (
        <div>
          hello
          <CreateIntershipAndOnline user={new_user} />
          <CreateIntershipAndSave user={new_user} />
        </div>
      )}
    </div>
  );
};

export default CreateInteshipv2;
