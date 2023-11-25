import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const NewIntership = () => {
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
  const [save, setsave] = useState(false);
  const [online, setonline] = useState(false);
  const { id } = useParams();
  var new_user;

  useEffect(() => {
    requestUser();
  }, []);
  async function requestUser() {
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
      flag_save: save === "true",
      flag_online: online === "true",
    };

    if (flag === true) {
      console.log("new user", new_user);
      console.log("save", typeof new_user.flag_save);
      console.log("save", typeof new_user.flag_online);

      const result = await fetch(
        `http://localhost:8080/api/newintership/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(new_user),
        }
      );
    }
    setflag(true);
    console.log("flag id ", flag);
    // }
  }

  return (
    <>
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
          <label htmlFor="animal">
            Save
            <select
              id="save"
              value={save}
              onChange={(e) => {
                console.log("first", e.target.value);
                setsave(e.target.value);
                console.log("second", typeof save);
              }}
              onBlur={(e) => {
                console.log(e.target.value);
                setsave(e.target.value);
                console.log("save");
              }}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </label>
          <label htmlFor="animal">
            Online
            <select
              id="online"
              value={online}
              onChange={(e) => {
                console.log("first", e.target.value);
                setonline(e.target.value);
                console.log("second", e.target.value);
              }}
              onBlur={(e) => {
                console.log(e.target.value);
                setonline(e.target.value);
                console.log("online");
              }}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </label>
          <div>
            {!flag ? (
              <button type="submit"> submit</button>
            ) : (
              <button type="submit"> Continue</button>
            )}
          </div>
        </div>
      </form>
      {flag ? (
        <>
          You create a user and you will can access in website when admin will
          authenticate your data{" "}
        </>
      ) : (
        <>Try create a user, if you see this message you do not create a user</>
      )}
    </>
  );
};

export default NewIntership;
